import { services } from "../content";
import { whatsappLink } from "../lib/whatsapp";
import Button from "./Button";
import { WhatsAppIcon } from "./icons";
import Placeholder from "./Placeholder";
import Section from "./Section";
import SectionHeading from "./SectionHeading";

export default function Services() {
  const { items, alsoArranged, serviceOptions } = services;

  return (
    <Section id="services">
      <SectionHeading eyebrow={services.eyebrow} title={services.title} />

      <ul className="mt-10 grid grid-cols-1 gap-3 sm:mt-12 sm:grid-cols-2 sm:gap-5 lg:mt-16 lg:grid-cols-3 lg:gap-7">
        {items.map((item, index) =>
          item.cta ? (
            <li
              key={item.title}
              className="focus-on-dark flex flex-col gap-6 rounded-card bg-wine p-6 text-ivory shadow-card sm:col-span-2 sm:flex-row sm:items-center sm:justify-between lg:col-span-3 lg:px-9 lg:py-8"
            >
              <h3 className="text-h3">{item.title}</h3>
              {item.description && (
                <Button href={whatsappLink()} newTab>
                  <WhatsAppIcon className="h-5 w-5" />
                  {item.description}
                </Button>
              )}
            </li>
          ) : (
            <li
              key={item.title}
              className="flex items-baseline gap-4 rounded-card border-t-2 border-gold bg-white px-5 py-4 shadow-card transition duration-300 ease-out hover:-translate-y-1 hover:shadow-lift sm:block sm:p-6 lg:p-9"
            >
              <span aria-hidden="true" className="shrink-0 font-display text-xl lining-nums tracking-wide text-gold-deep sm:text-2xl">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="min-w-0">
                <h3 className="text-[1.375rem] leading-snug sm:mt-3 sm:text-h3">{item.title}</h3>
                {item.description && <p className="mt-1 text-sm text-ink-muted sm:mt-2 sm:text-base">{item.description}</p>}
              </div>
            </li>
          ),
        )}
      </ul>

      <div className="mt-12 grid gap-8 border-t border-gold/50 pt-10 md:grid-cols-2 md:gap-10 lg:mt-20 lg:pt-12">
        <div>
          <h3 className="font-sans text-eyebrow font-semibold uppercase text-wine">{alsoArranged.label}</h3>
          <ul className="mt-4 space-y-2">
            {alsoArranged.items.map((name) => (
              <li key={name} className="flex items-center gap-4 font-display text-h3">
                <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rotate-45 bg-gold" />
                {name}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-sans text-eyebrow font-semibold uppercase text-wine">{serviceOptions.label}</h3>
          <div className="mt-4">
            {serviceOptions.items.length > 0 ? (
              <ul className="flex flex-wrap gap-2">
                {serviceOptions.items.map((option) => (
                  <li key={option} className="rounded-full border border-ink/15 bg-white px-4 py-1.5 text-sm">
                    {option}
                  </li>
                ))}
              </ul>
            ) : (
              <Placeholder variant="text" label={serviceOptions.placeholder} />
            )}
          </div>
        </div>
      </div>
    </Section>
  );
}
