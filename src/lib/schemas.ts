import { z } from 'zod';

// Browser-side rules, mirrored in api/contact.ts since it can't import this file.
export const contactSchema = z.object({
  name: z.string().trim().min(2, 'Please enter your name'),
  email: z.email('Please enter a valid email address'),
  message: z
    .string()
    .trim()
    .min(10, 'Please write a little more so I know what this is about')
    .max(2000, 'That is a bit long, please keep it under 2000 characters'),
  // Honeypot. Hidden from people, so anything in it came from a bot.
  website: z.string().max(0).optional(),
});

// Derives the TypeScript type from the schema, so the two can't disagree.
export type ContactFormValues = z.infer<typeof contactSchema>;
