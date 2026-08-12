import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { LuGithub, LuLinkedin, LuMail } from 'react-icons/lu';
import { contactSchema, type ContactFormValues } from '../lib/schemas';

const EMAIL = 'ssebastianbusiness@gmail.com';

// Tracks what the form is doing, so the button and messages can respond.
type Status = 'idle' | 'sending' | 'sent' | 'error';

export function Contact() {
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
        // Logged rather than shown, so the real reason is available in
        // the browser console without putting it in front of a visitor.
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

  const fieldStyles =
    'mt-2 w-full rounded-lg border border-line bg-surface-raised px-4 py-3 transition-colors focus:border-accent';

  return (
    <section className="py-24">
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
        Contact
      </p>

      <h1 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight text-heading sm:text-4xl">
        Get in touch
      </h1>

      <p className="mt-6 max-w-2xl text-lg leading-relaxed">
        Open to junior and graduate developer roles, and happy to hear about
        anything else. Fill in the form and it comes straight to my inbox.
      </p>

      <div className="mt-12 grid gap-12 md:grid-cols-3">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 md:col-span-2"
          noValidate
        >
          <div>
            <label htmlFor="name" className="text-sm font-medium text-heading">
              Name
            </label>
            {/* register wires the input to the form and its validation. */}
            <input id="name" {...register('name')} className={fieldStyles} />
            {errors.name && (
              <p className="mt-2 text-sm text-accent">{errors.name.message}</p>
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
              className={fieldStyles}
            />
            {errors.email && (
              <p className="mt-2 text-sm text-accent">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="message"
              className="text-sm font-medium text-heading"
            >
              Message
            </label>
            <textarea
              id="message"
              rows={6}
              {...register('message')}
              className={fieldStyles}
            />
            {errors.message && (
              <p className="mt-2 text-sm text-accent">
                {errors.message.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={status === 'sending'}
            className="inline-flex items-center rounded-full bg-heading px-6 py-3 font-medium text-surface transition-opacity hover:opacity-85 disabled:opacity-50"
          >
            {status === 'sending' ? 'Sending...' : 'Send message'}
          </button>

          {/* aria-live tells screen readers to announce these when they appear. */}
          <p aria-live="polite" className="text-sm">
            {status === 'sent' &&
              'Thanks, your message is on its way. I will reply soon.'}
            {status === 'error' &&
              `Something went wrong sending that. Please email me directly at ${EMAIL}.`}
          </p>
        </form>

        <div className="space-y-4 text-sm">
          <p className="font-medium text-heading">Elsewhere</p>
          <a
            href={`mailto:${EMAIL}`}
            className="flex items-center gap-3 transition-colors hover:text-accent"
          >
            <LuMail className="size-4" />
            Email
          </a>
          <a
            href="https://www.linkedin.com/in/sebastian-stanton-5464b0139"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 transition-colors hover:text-accent"
          >
            <LuLinkedin className="size-4" />
            LinkedIn
          </a>
          <a
            href="https://github.com/SZStanton"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 transition-colors hover:text-accent"
          >
            <LuGithub className="size-4" />
            GitHub
          </a>
        </div>
      </div>
    </section>
  );
}

