import type { ReactNode } from "react";
import { contact, contactSection, cta } from "../content";
import { whatsappLink } from "../lib/whatsapp";
import Button from "./Button";
import { MailIcon, PhoneIcon, PinIcon, WhatsAppIcon } from "./icons";
import Section from "./Section";
import SectionHeading from "./SectionHeading";

const linkStyle = "inline-flex min-h-11 items-center font-medium text-ink underline-offset-4 transition-colors hover:text-wine hover:underline active:text-wine";

function Detail({ icon, label, children }: { icon: ReactNode; label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col items-center px-2 py-6 text-center lg:py-2">
      <span className="text-gold-deep">{icon}</span>
      <h3 className="mt-3 font-sans text-eyebrow font-semibold uppercase text-wine">{label}</h3>
      <div className="mt-1 flex flex-col items-center">{children}</div>
    </div>
  );
}

export default function Contact() {
  return (
    <Section id="contact" className="bg-sand">
      <SectionHeading eyebrow={contactSection.eyebrow} title={contactSection.title} intro={contactSection.text} />

      <div className="mx-auto mt-10 max-w-4xl rounded-card bg-white p-6 shadow-card lg:mt-16 lg:p-12">
        <div className="flex flex-col items-center">
          <Button href={whatsappLink()} newTab className="min-h-14 w-full px-8 text-base sm:w-auto">
            <WhatsAppIcon className="h-6 w-6" />
            {cta.whatsapp}
          </Button>
          <p className="mt-3 text-sm text-ink-muted">{contact.whatsapp.display}</p>
        </div>

        <div className="mt-8 grid grid-cols-1 divide-y divide-ink/10 border-t border-ink/10 lg:grid-cols-[1fr_1.5fr_1fr] lg:divide-x lg:divide-y-0 lg:pt-8">
          <Detail icon={<PhoneIcon className="h-7 w-7" />} label={contactSection.phoneLabel}>
            {contact.phones.map((phone) => (
              <a key={phone.href} href={phone.href} className={linkStyle}>
                {phone.display}
              </a>
            ))}
          </Detail>
          <Detail icon={<MailIcon className="h-7 w-7" />} label={contactSection.emailLabel}>
            <a href={contact.email.href} className={`${linkStyle} text-[0.8125rem] [overflow-wrap:anywhere] min-[400px]:text-base`}>
              {contact.email.display}
            </a>
          </Detail>
          <Detail icon={<PinIcon className="h-7 w-7" />} label={contactSection.areaLabel}>
            <p className="flex min-h-11 items-center font-medium">{contact.address.area}</p>
          </Detail>
        </div>
      </div>
    </Section>
  );
}
