import { useState } from "react";
import logo from "../assets/logo-192.png";
import { contact, footer, nav, site } from "../content";
import { whatsappLink } from "../lib/whatsapp";
import Container from "./Container";
import KolamDivider from "./KolamDivider";
import { MailIcon, PhoneIcon, WhatsAppIcon } from "./icons";
import Modal from "./Modal";
import Placeholder from "./Placeholder";
import SocialLinks from "./SocialLinks";

const headingStyle = "font-sans text-eyebrow font-semibold uppercase text-gold-light";
const linkStyle =
  "inline-flex min-h-11 items-center gap-2.5 text-ivory/90 underline-offset-4 transition-colors hover:text-gold-light hover:underline active:text-gold-light focus-visible:outline-gold-light";

type FooterProps = {
  onComingSoon: (platform: string) => void;
};

export default function Footer({ onComingSoon }: FooterProps) {
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const { fssai, privacy } = footer;

  return (
    // The extra bottom padding is reserved space: the floating WhatsApp button and the toast sit in it,
    // so neither ever covers a footer link.
    <footer className="focus-on-dark bg-wine pb-[calc(8rem+env(safe-area-inset-bottom))] pt-16 text-ivory md:pb-28 lg:pt-24">
      <Container>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[0.6fr_1.5fr_1.1fr] lg:gap-8 xl:grid-cols-[1.3fr_0.6fr_1.5fr_1.1fr]">
          <div className="sm:col-span-2 lg:col-span-3 xl:col-span-1">
            <div className="flex items-center gap-3">
              <img src={logo} alt={site.logoAlt} width={56} height={56} loading="lazy" decoding="async" className="h-14 w-14 shrink-0" />
              <div>
                <p className="font-display text-2xl font-semibold leading-tight">{site.name}</p>
                <p className="mt-1 text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-gold-light">
                  {site.traditionLine}
                </p>
              </div>
            </div>
            <p className="mt-5 max-w-sm text-ivory/90">{footer.blurb}</p>
            <p className="mt-4 font-display text-xl text-gold-light">{site.proprietor}</p>
          </div>

          <nav aria-label={footer.linksTitle}>
            <h2 className={headingStyle}>{footer.linksTitle}</h2>
            <ul className="mt-3 grid grid-cols-2 gap-x-6 sm:grid-cols-1">
              {nav.links.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className={linkStyle}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className={headingStyle}>{footer.contactTitle}</h2>
            <ul className="mt-3">
              {contact.phones.map((phone) => (
                <li key={phone.href}>
                  <a href={phone.href} className={linkStyle}>
                    <PhoneIcon className="h-5 w-5 shrink-0 text-gold" />
                    {phone.display}
                  </a>
                </li>
              ))}
              <li>
                <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className={linkStyle}>
                  <WhatsAppIcon className="h-5 w-5 shrink-0 text-gold" />
                  {contact.whatsapp.label}: {contact.whatsapp.display}
                </a>
              </li>
              <li>
                <a href={contact.email.href} className={`${linkStyle} text-[0.9375rem] [overflow-wrap:anywhere]`}>
                  <MailIcon className="h-5 w-5 shrink-0 text-gold" />
                  {contact.email.display}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className={headingStyle}>{footer.addressTitle}</h2>
            <address className="mt-4 text-balance not-italic text-ivory/90">{contact.address.full}</address>
            <p className="mt-4 flex flex-wrap items-center gap-2 text-sm text-ivory/90">
              {fssai.label}
              {fssai.number ? <span>{fssai.number}</span> : <Placeholder variant="text" label={fssai.placeholder} />}
            </p>

            <h2 className={`mt-8 ${headingStyle}`}>{footer.followTitle}</h2>
            <div className="mt-4">
              <SocialLinks onComingSoon={onComingSoon} />
            </div>
          </div>
        </div>

        <KolamDivider className="mt-12 text-gold lg:mt-16" />
        <div className="mt-6 flex flex-col gap-2 text-sm text-ivory/90 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {footer.copyrightName}
          </p>
          <p>{site.domainLabel}</p>
          <button type="button" onClick={() => setPrivacyOpen(true)} className={`${linkStyle} self-start underline`}>
            {privacy.label}
          </button>
        </div>
      </Container>

      {privacyOpen && (
        <Modal title={privacy.title} closeLabel={privacy.closeLabel} onClose={() => setPrivacyOpen(false)}>
          {privacy.body ? (
            <p className="whitespace-pre-line text-ink-muted">{privacy.body}</p>
          ) : (
            <Placeholder variant="text" label={privacy.placeholder} />
          )}
        </Modal>
      )}
    </footer>
  );
}
