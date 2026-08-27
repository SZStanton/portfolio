import { resolveMx } from 'node:dns/promises';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { z } from 'zod';

// Mirrors src/lib/schemas.ts by hand; this file can't import from outside api/.
const contactSchema = z.object({
  name: z.string().trim().min(2),
  email: z.email(),
  message: z.string().trim().min(10).max(2000),
  website: z.string().optional(), // honeypot, checked below
});

const RESEND_ENDPOINT = 'https://api.resend.com/emails';

// Crude in-memory rate limit; resets on a cold start and stops a flood, not a determined attacker.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 3;
const seen = new Map<string, number[]>();

// Checks the domain can receive mail; can't confirm the mailbox itself exists.
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

// Works via Resend's shared address until a verified domain exists to send from instead.
const DEFAULT_FROM = 'Portfolio <onboarding@resend.dev>';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // The browser already checked this, but anything can POST here, so it re-validates.
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

  // Vercel puts the caller's IP here; falls back to email if the header's missing.
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
    // Logged for the dashboard only; a visitor doesn't need to see config errors.
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
        // The warning is deliberate: Reply-To is only as good as what the sender typed.
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
