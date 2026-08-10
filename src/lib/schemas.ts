import { z } from 'zod'

// What a valid message looks like, used by the contact form in the browser.
// api/contact.ts repeats these rules and re-checks them on the server,
// because anything sent from a browser can be faked. It cannot import this
// file: Vercel builds functions in isolation and will not reach outside api/.
// If the rules change here, change them there too.
export const contactSchema = z.object({
  name: z.string().trim().min(2, 'Please enter your name'),
  email: z.email('Please enter a valid email address'),
  message: z
    .string()
    .trim()
    .min(10, 'Please write a little more so I know what this is about')
    .max(2000, 'That is a bit long, please keep it under 2000 characters'),
})

// Derives the TypeScript type from the schema, so the rules and the
// type can never disagree.
export type ContactFormValues = z.infer<typeof contactSchema>
