import { useState } from 'react';
import { Accent, Display, Section } from '../ui/Primitives';
import { Reveal } from '../ui/Reveal';
import { SocialButton, MailIcon, InstagramIcon, DocumentIcon } from '../ui/SocialButton';
import { contact, profile } from '../../data/profile';

/**
 * Closing section: a centred invitation, the email itself, and a row of
 * circular profile links.
 *
 * There is no contact form. A form on a static site needs a third-party
 * service behind it, and without one it either silently fails or sends the
 * visitor to their mail client anyway — so the email is simply presented
 * directly, with one click to write and one to copy it.
 */
export function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contact.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked (insecure context, or permission denied) — the
      // address is on screen and selectable, so there is nothing to recover.
    }
  };

  return (
    <Section id="contact">
      <Reveal>
        <div className="mx-auto max-w-[680px] text-center">
          <Display as="h2" size="lg">
            Let&rsquo;s build
            <br />
            <Accent>something great.</Accent>
          </Display>

          <p className="mx-auto mt-5 max-w-[46ch] text-[1.02rem] text-ink-2">
            {profile.availability ?? 'In touch'} &mdash; {profile.role} based in {profile.location}.
          </p>

          {/* the address, presented as the main thing on offer */}
          <div className="glass-card mt-9 px-5 py-8 sm:px-10 sm:py-10">
            <span className="block text-[0.72rem] uppercase tracking-[0.2em] text-accent">
              Write to me
            </span>

            <a
              href={`mailto:${contact.email}`}
              className="mt-3 inline-block break-words border-b border-rule pb-1.5 font-display text-[clamp(1.35rem,3.4vw,2.5rem)] font-light leading-tight transition-colors duration-300 hover:border-accent hover:text-accent"
            >
              {contact.email}
            </a>

            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <a
                href={`mailto:${contact.email}`}
                className="rounded-md border border-accent bg-accent px-7 py-3.5 text-[0.9rem] uppercase tracking-[0.1em] text-ink transition-[background-color,box-shadow] duration-200 hover:bg-accent/90 hover:shadow-[0_6px_16px_-6px_rgb(var(--accent)/0.65)]"
              >
                Send an email
              </a>

              <button
                type="button"
                onClick={copyEmail}
                className="rounded-md border border-rule px-7 py-3.5 text-[0.9rem] uppercase tracking-[0.1em] text-ink transition-colors duration-200 hover:border-ink hover:bg-paper-2/60"
              >
                {copied ? 'Copied' : 'Copy address'}
              </button>

              <a
                href={contact.resume}
                download
                className="rounded-md border border-rule px-7 py-3.5 text-[0.9rem] uppercase tracking-[0.1em] text-ink transition-colors duration-200 hover:border-ink hover:bg-paper-2/60"
              >
                Download CV
              </a>
            </div>

            <p className="mt-6 text-[0.88rem] text-ink-3">
              {contact.phone.display} · {profile.location}
            </p>
          </div>

          {/* profile links */}
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3.5">
            <SocialButton
              href={`mailto:${contact.email}`}
              label="Email Shaksita"
              icon={MailIcon}
              external={false}
            />
            <SocialButton href={contact.social.linkedin} label="LinkedIn" glyph="in" />
            <SocialButton href={contact.social.behance} label="Behance" glyph="Bē" />
            <SocialButton href={contact.social.instagram} label="Instagram" icon={InstagramIcon} />
            <SocialButton
              href={contact.resume}
              label="Download CV"
              icon={DocumentIcon}
              external={false}
              download
            />
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
