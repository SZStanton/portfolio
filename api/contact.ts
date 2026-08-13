import { resolveMx } from 'node:dns/promises';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { z } from 'zod';

// Mirrors src/lib/schemas.ts. Vercel compiles this file on its own and
// cannot import from outside api/, so keep the two in step by hand.
const contactSchema = z.object({
  name: z.string().trim().min(2),
  email: z.email(),
  message: z.string().trim().min(10).max(2000),
  website: z.string().optional(), // honeypot, checked below
});

const RESEND_ENDPOINT = 'https://api.resend.com/emails';

// Crude rate limit: a few messages per address per window. Held in memory,
// so it resets on a cold start and is not shared between instances. It stops
// a simple flood, not a determined one. See the note in vercel.json.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 3;
const seen = new Map<string, number[]>();

// Checks the domain can receive mail at all. Catches typos and made-up
// domains. It cannot tell whether the mailbox exists or who owns it.
async function domainAcceptsMail(email: string) {
  const domain = email.split('@')[1];
  if (!domain) return false;
  try {
    const records = await resolveMx(domain);
    return records.length > 0;
  } catch {
    return false;
  }
}

function tooMany(key: string) {
  const now = Date.now();
  const recent = (seen.get(key) ?? []).filter(time => now - time < WINDOW_MS);
  recent.push(now);
  seen.set(key, recent);
  return recent.length > MAX_PER_WINDOW;
}

// Resend lets you send from this shared address without owning a domain,
// as long as the recipient is your own account email. Swap it for an
// address on a verified domain if one is ever set up.
const DEFAULT_FROM = 'Portfolio <onboarding@resend.dev>';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // The browser already checked this, but anything can post here,
  // so the same schema runs again on the server.
  const parsed = contactSchema.safeParse(req.body);
  if (!parsed.success) {
    return res
      .status(400)
      .json({ error: 'Please check the form and try again' });
  }

  // Only a bot fills the honeypot. Report success so it does not retry.
  if (parsed.data.website) {
    return res.status(200).json({ ok: true });
  }

  // Vercel puts the caller's address here. Fall back to the email so a
  // missing header does not switch the limit off entirely.
  const caller =
    (req.headers['x-forwarded-for'] as string | undefined)
      ?.split(',')[0]
      ?.trim() ?? parsed.data.email;

  if (tooMany(caller)) {
    return res
      .status(429)
      .json({ error: 'Too many messages. Please try again later.' });
  }

  if (!(await domainAcceptsMail(parsed.data.email))) {
    return res
      .status(400)
      .json({ error: 'That email address does not look reachable.' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;

  if (!apiKey || !to) {
    // Logged for the Vercel dashboard, but never sent back to the
    // visitor, since config problems are not their business.
    console.error('Missing RESEND_API_KEY or CONTACT_TO_EMAIL');
    return res.status(500).json({ error: 'Email is not set up correctly' });
  }

  const { name, email, message } = parsed.data;

  try {
    const response = await fetch(RESEND_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL ?? DEFAULT_FROM,
        to: [to],
        // Makes Reply in the mail client answer the sender, not Resend.
        reply_to: email,
        subject: `Portfolio message from ${name}`,
        // The warning is deliberate: anyone can type any address into a
        // form, so Reply-To is only ever as good as what they entered.
        text: [
          `From: ${name} <${email}>`,
          '',
          message,
          '',
          '---',
          'Sent from the portfolio contact form.',
          'This address was typed by the sender and has not been verified.',
          'Check the message reads genuinely before replying.',
        ].join('\n'),
      }),
    });

    if (!response.ok) {
      console.error(
        'Resend rejected the request',
        response.status,
        await response.text(),
      );
      return res.status(502).json({ error: 'Could not send the message' });
    }

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error('Could not reach Resend', error);
    return res.status(502).json({ error: 'Could not send the message' });
  }
}
