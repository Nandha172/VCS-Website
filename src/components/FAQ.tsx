import { useState } from "react";
import { faq } from "../content";
import { whatsappLink } from "../lib/whatsapp";
import Button from "./Button";
import { WhatsAppIcon } from "./icons";
import { PlusIcon } from "./icons";
import Placeholder from "./Placeholder";
import Section from "./Section";
import SectionHeading from "./SectionHeading";

export default function FAQ() {
  const [openItems, setOpenItems] = useState<Set<number>>(() => new Set());
  const items = faq.hideUnanswered ? faq.items.filter((item) => item.answer !== null) : faq.items;

  const toggle = (index: number) =>
    setOpenItems((current) => {
      const next = new Set(current);
      if (!next.delete(index)) next.add(index);
      return next;
    });

  return (
    <Section id="faq">
      <SectionHeading eyebrow={faq.eyebrow} title={faq.title} />

      <div className="mx-auto mt-10 max-w-3xl border-t border-ink/15 lg:mt-14">
        {items.map((item, index) => {
          const open = openItems.has(index);
          const buttonId = `faq-question-${index}`;
          const panelId = `faq-answer-${index}`;
          return (
            <div key={item.question} className="border-b border-ink/15">
              <h3 className="font-sans text-base font-semibold tracking-normal text-pretty sm:text-[1.0625rem]">
                <button
                  type="button"
                  id={buttonId}
                  aria-expanded={open}
                  aria-controls={panelId}
                  onClick={() => toggle(index)}
                  className="group flex min-h-16 w-full items-center justify-between gap-4 py-4 text-left text-ink transition-colors hover:text-wine active:text-wine"
                >
                  {item.question}
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition duration-300 group-hover:border-gold ${
                      open ? "rotate-45 border-gold bg-gold/15" : "border-ink/15"
                    }`}
                  >
                    <PlusIcon className="h-4 w-4 text-gold-deep" />
                  </span>
                </button>
              </h3>
              <div id={panelId} role="region" aria-labelledby={buttonId} hidden={!open} className="pb-6 pr-12">
                {item.answer ? (
                  <p className="text-ink-muted">{item.answer}</p>
                ) : (
                  <Placeholder variant="text" label={faq.placeholderAnswer} />
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-10 flex flex-col items-center gap-4 text-center lg:mt-12">
        <p className="font-display text-h3">{faq.stillAsking.text}</p>
        <Button variant="outline" href={whatsappLink()} newTab className="w-full sm:w-auto">
          <WhatsAppIcon className="h-5 w-5" />
          {faq.stillAsking.button}
        </Button>
      </div>
    </Section>
  );
}
