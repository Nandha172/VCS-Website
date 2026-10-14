import { cta, howItWorks } from "../content";
import { whatsappLink } from "../lib/whatsapp";
import Button from "./Button";
import { WhatsAppIcon } from "./icons";
import Section from "./Section";
import SectionHeading from "./SectionHeading";

export default function HowItWorks() {
  const { steps } = howItWorks;

  return (
    <Section className="focus-on-dark bg-wine">
      <SectionHeading onDark eyebrow={howItWorks.eyebrow} title={howItWorks.title} />

      {/* Vertical on phones, 2×2 on tablet, one horizontal row on desktop */}
      <ol className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:mt-16 lg:grid-cols-4">
        {steps.map((step, index) => {
          const last = index === steps.length - 1;
          return (
            <li key={step} className="relative flex gap-5 lg:flex-col">
              {!last && (
                <>
                  <span aria-hidden="true" className="absolute -bottom-8 left-6 top-12 w-px bg-gold/50 md:hidden" />
                  <span aria-hidden="true" className="absolute -right-8 left-12 top-6 hidden h-px bg-gold/50 lg:block" />
                </>
              )}
              <span
                aria-hidden="true"
                className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-gold bg-wine font-display text-2xl lining-nums text-gold-light"
              >
                {index + 1}
              </span>
              <p className="pt-2.5 text-ivory lg:max-w-[24ch] lg:pt-1">{step}</p>
            </li>
          );
        })}
      </ol>

      <div className="mt-12 flex justify-center lg:mt-16">
        <Button href={whatsappLink()} newTab className="w-full sm:w-auto">
          <WhatsAppIcon className="h-5 w-5" />
          {cta.quote}
        </Button>
      </div>
    </Section>
  );
}
