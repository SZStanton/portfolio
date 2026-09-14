import { lazy, Suspense } from 'react';
import { LuGithub, LuLinkedin, LuMail, LuMapPin } from 'react-icons/lu';
import { useNearViewport } from '../../hooks/useNearViewport';
import { CopyButton } from '../ui/CopyButton';
import { SectionHeader } from '../ui/SectionHeader';
import { ContactFormSkeleton } from './ContactFormSkeleton';

const ContactForm = lazy(() =>
  import('./ContactForm').then(m => ({ default: m.ContactForm })),
);

const EMAIL = 'szstantondev@gmail.com';

// Someone landing straight on #contact needs the form immediately, not on scroll.
const DEEP_LINKED =
  typeof window !== 'undefined' && window.location.hash === '#contact';

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
    href: 'https://www.linkedin.com/in/szstanton',
    label: 'LinkedIn',
    value: 'szstanton',
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
  // Pulls the form chunk in while the reader is still a section or two above it.
  const [ref, near] = useNearViewport<HTMLElement>('600px');

  return (
    <section
      ref={ref}
      id="contact"
      aria-labelledby="contact-heading"
      className="container-page scroll-mt-20 pb-32 pt-24"
    >
      <SectionHeader
        number="05"
        eyebrow="Contact"
        title="Let's build something useful."
        headingId="contact-heading"
      />

      <p className="mt-6 max-w-2xl text-xl leading-relaxed">
        Open to junior and graduate developer roles, and happy to hear about
        anything else. Fill in the form and it comes straight to my inbox.
      </p>

      <div className="mt-12 grid gap-12 md:grid-cols-5">
        {near || DEEP_LINKED ? (
          <Suspense fallback={<ContactFormSkeleton />}>
            <ContactForm />
          </Suspense>
        ) : (
          <ContactFormSkeleton />
        )}

        <div className="md:col-span-2">
          <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-heading">
            Elsewhere
          </h3>

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
