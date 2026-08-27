import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  LuCircleAlert,
  LuCircleCheck,
  LuGithub,
  LuLinkedin,
  LuMail,
  LuMapPin,
} from 'react-icons/lu';
import { Button } from '../components/ui/Button';
import { CopyButton } from '../components/ui/CopyButton';
import { SectionLabel } from '../components/ui/SectionLabel';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { contactSchema, type ContactFormValues } from '../lib/schemas';

const EMAIL = 'ssebastianbusiness@gmail.com';

// Tracks what the form is doing, so the button and messages can respond.
type Status = 'idle' | 'sending' | 'sent' | 'error';

const elsewhere = [
  // Only the email gets a copy button; the others are for clicking.
  {
    href: `mailto:${EMAIL}`,
    label: 'Email',
    value: EMAIL,
    Icon: LuMail,
    copyable: true,
  },
  {
    href: 'https://www.linkedin.com/in/sebastian-stanton-5464b0139',
    label: 'LinkedIn',
    value: 'sebastian-stanton',
    Icon: LuLinkedin,
  },
  {
    href: 'https://github.com/SZStanton',
    label: 'GitHub',
    value: 'SZStanton',
    Icon: LuGithub,
  },
];

export function Contact() {
  useDocumentTitle('Contact');
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

  const fieldStyles =
    'mt-2 w-full rounded-lg border border-line bg-surface-raised px-4 py-3 transition-colors focus:border-accent';

  return (
    <section className="pb-24 pt-16">
      <SectionLabel>Contact</SectionLabel>

      <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-heading sm:text-5xl">
        Get in Touch
      </h1>

      <p className="mt-6 max-w-2xl text-xl leading-relaxed">
        Open to junior and graduate developer roles, and happy to hear about
        anything else. Fill in the form and it comes straight to my inbox.
      </p>

      <div className="mt-12 grid gap-12 md:grid-cols-5">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 md:col-span-3"
          noValidate
        >
          <div>
            <label htmlFor="name" className="text-sm font-medium text-heading">
              Name
            </label>
            {/* register wires the input to the form and its validation. */}
            <input id="name" {...register('name')} className={fieldStyles} />
            {errors.name && (
              <p className="mt-2 text-sm text-danger">{errors.name.message}</p>
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
              <p className="mt-2 text-sm text-danger">{errors.email.message}</p>
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
              <p className="mt-2 text-sm text-danger">
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

        <div className="md:col-span-2">
          <h2 className="text-sm font-semibold uppercase tracking-[0.15em] text-heading">
            Elsewhere
          </h2>

          <ul className="mt-5 space-y-3">
            {elsewhere.map(({ href, label, value, Icon, copyable }) => (
              // Copy button sits beside the link, since nesting a button in it is invalid.
              <li
                key={label}
                className="flex items-center gap-1 rounded-lg border border-line bg-surface-raised pr-2 shadow-card transition-colors hover:border-accent-soft active:border-accent"
              >
                <a
                  href={href}
                  // mailto should not open a tab, the others should.
                  target={href.startsWith('mailto:') ? undefined : '_blank'}
                  rel="noreferrer"
                  className="flex min-w-0 flex-1 items-center gap-3 p-3"
                >
                  <Icon className="size-4 shrink-0 text-accent" />
                  <span className="min-w-0">
                    <span className="block text-xs uppercase tracking-wider">
                      {label}
                    </span>
                    <span className="block truncate text-sm text-heading">
                      {value}
                    </span>
                  </span>
                </a>
                {copyable && <CopyButton value={value} label={label} />}
              </li>
            ))}
          </ul>

          <p className="mt-5 flex items-center gap-3 text-sm">
            <LuMapPin className="size-4 shrink-0 text-accent" />
            Cape Town, South Africa
          </p>
        </div>
      </div>
    </section>
  );
}
