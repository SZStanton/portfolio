import { z } from 'zod'

// One definition of what a valid message looks like. The form checks
// against it in the browser, and the API will check the same schema on
// the server, since anything sent from a browser can be faked.
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
