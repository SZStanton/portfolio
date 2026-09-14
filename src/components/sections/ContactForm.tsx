import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { LuCircleAlert, LuCircleCheck } from 'react-icons/lu';
import { contactSchema, type ContactFormValues } from '../../lib/schemas';
import { Button } from '../ui/Button';

// Everything form-shaped lives here, so React Hook Form and Zod stay out of the
// initial bundle and only load once someone scrolls near the bottom of the page.

const EMAIL = 'szstantondev@gmail.com';

// Tracks what the form is doing, so the button and messages can respond.
type Status = 'idle' | 'sending' | 'sent' | 'error';

const fieldStyles =
  'mt-2 w-full rounded-lg border border-line bg-surface-raised px-4 py-3 transition-colors focus:border-accent';

export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    // Hands validation to the Zod schema instead of writing rules twice.
    resolver: zodResolver(contactSchema),
  });

  // Only runs once the schema is satisfied, so values are already valid here.
  const onSubmit = async (values: ContactFormValues) => {
    setStatus('sending');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        // Logged, not shown, so the real reason stays in the console, off the visitor's screen.
        console.error(
          'Contact form failed',
          response.status,
          await response.text(),
        );
        throw new Error('Request failed');
      }

      setStatus('sent');
      reset();
    } catch (error) {
      console.error('Contact form error', error);
      setStatus('error');
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 md:col-span-3"
      noValidate
    >
      <div>
        <label htmlFor="name" className="text-sm font-medium text-heading">
          Name
        </label>
        {/* register wires the input to the form and its validation.
            aria-describedby ties the error below to the field, so a
            screen reader reads the reason and not just the label. */}
        <input
          id="name"
          {...register('name')}
          aria-invalid={errors.name ? true : undefined}
          aria-describedby={errors.name ? 'name-error' : undefined}
          className={fieldStyles}
        />
        {errors.name && (
          <p id="name-error" className="mt-2 text-sm text-danger">
            {errors.name.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="text-sm font-medium text-heading">
          Email
        </label>
        <input
          id="email"
          type="email"
          {...register('email')}
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={errors.email ? 'email-error' : undefined}
          className={fieldStyles}
        />
        {errors.email && (
          <p id="email-error" className="mt-2 text-sm text-danger">
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="text-sm font-medium text-heading">
          Message
        </label>
        <textarea
          id="message"
          rows={6}
          {...register('message')}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? 'message-error' : undefined}
          className={fieldStyles}
        />
        {errors.message && (
          <p id="message-error" className="mt-2 text-sm text-danger">
            {errors.message.message}
          </p>
        )}
      </div>

      {/* Honeypot, off-screen not display:none, which bots skip; hidden from real users too. */}
      <input
        {...register('website')}
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] size-0"
      />

      <Button type="submit" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending...' : 'Send message'}
      </Button>

      {/* aria-live tells screen readers to announce these when they appear. */}
      <div aria-live="polite">
        {status === 'sent' && (
          <p className="flex items-start gap-3 rounded-lg border border-success/40 p-4 text-sm text-success">
            <LuCircleCheck className="mt-0.5 size-4 shrink-0" />
            Thanks, your message is on its way. I will reply soon.
          </p>
        )}
        {status === 'error' && (
          <p className="flex items-start gap-3 rounded-lg border border-danger/40 p-4 text-sm text-danger">
            <LuCircleAlert className="mt-0.5 size-4 shrink-0" />
            Something went wrong sending that. Please email me directly at{' '}
            {EMAIL}.
          </p>
        )}
      </div>
    </form>
  );
}
