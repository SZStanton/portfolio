import type { VercelRequest, VercelResponse } from '@vercel/node'
import { contactSchema } from '../src/lib/schemas'

const RESEND_ENDPOINT = 'https://api.resend.com/emails'

// Resend lets you send from this shared address without owning a domain,
// as long as the recipient is your own account email. Swap it for an
// address on a verified domain if one is ever set up.
const DEFAULT_FROM = 'Portfolio <onboarding@resend.dev>'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // The browser already checked this, but anything can post here,
  // so the same schema runs again on the server.
  const parsed = contactSchema.safeParse(req.body)
  if (!parsed.success) {
    return res.status(400).json({ error: 'Please check the form and try again' })
  }

  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.CONTACT_TO_EMAIL

  if (!apiKey || !to) {
    // Logged for the Vercel dashboard, but never sent back to the
    // visitor, since config problems are not their business.
    console.error('Missing RESEND_API_KEY or CONTACT_TO_EMAIL')
    return res.status(500).json({ error: 'Email is not set up correctly' })
  }

  const { name, email, message } = parsed.data

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
        text: `From: ${name} <${email}>\n\n${message}`,
      }),
    })

    if (!response.ok) {
      console.error('Resend rejected the request', response.status, await response.text())
      return res.status(502).json({ error: 'Could not send the message' })
    }

    return res.status(200).json({ ok: true })
  } catch (error) {
    console.error('Could not reach Resend', error)
    return res.status(502).json({ error: 'Could not send the message' })
  }
}
