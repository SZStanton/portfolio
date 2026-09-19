import { lazy, Suspense } from 'react';
import { useLocation } from 'react-router';
import { LuGithub, LuLinkedin, LuMail, LuMapPin } from 'react-icons/lu';
import { useNearViewport } from '../../hooks/useNearViewport';
import { EMAIL, GITHUB_URL, LINKEDIN_URL } from '../../data/contact';
import { Reveal, RevealGroup, RevealItem } from '../motion/Reveal';
import { CopyButton } from '../ui/CopyButton';
import { CornerFrame } from '../ui/CornerFrame';
import { SectionHeader } from '../ui/SectionHeader';
import { ContactFormSkeleton } from './ContactFormSkeleton';

const ContactForm = lazy(() =>
  import('./ContactForm').then(m => ({ default: m.ContactForm })),
);

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
    href: LINKEDIN_URL,
    label: 'LinkedIn',
    value: 'szstanton',
    Icon: LuLinkedin,
  },
  {
    href: GITHUB_URL,
    label: 'GitHub',
    value: 'SZStanton',
    Icon: LuGithub,
  },
];

export function Contact() {
  // Pulls the form chunk in while the reader is still a section or two above it.
  const [ref, near] = useNearViewport<HTMLElement>();
  // Landing straight on #contact needs the form now, not once it scrolls into view.
  const deepLinked = useLocation().hash === '#contact';

  return (
    <section
      ref={ref}
      id="contact"
      aria-labelledby="contact-heading"
      data-land-offset="28"
      className="container-page pb-24 pt-32"
    >
      <SectionHeader
        number="05"
        eyebrow="Contact"
        title="Let's Build Something Useful"
        headingId="contact-heading"
      />

      <Reveal className="mt-6">
        <p className="measure-text text-xl leading-relaxed">
          Open to junior developer roles, and happy to hear about anything else.
          <br />
          Fill in the form and it comes straight to my inbox.
        </p>
      </Reveal>

      {/* Padding keeps the brackets off the form; they mark the corners, not the fields. */}
      <div className="relative mt-8 px-5 py-7 sm:p-6">
        <CornerFrame />

        <div className="grid gap-12 md:grid-cols-5">
          {near || deepLinked ? (
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

            <RevealGroup className="mt-5 space-y-3" gap={0.07} as="ul">
              {elsewhere.map(({ href, label, value, Icon, copyable }) => (
                // Copy button sits beside the link, since nesting a button in it is invalid.
                <RevealItem
                  as="li"
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
                </RevealItem>
              ))}
            </RevealGroup>

            <p className="mt-5 flex items-center gap-3 text-sm">
              <LuMapPin className="size-4 shrink-0 text-accent" />
              Cape Town, South Africa
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
