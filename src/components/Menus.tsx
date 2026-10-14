import { menus } from "../content";
import { whatsappLink } from "../lib/whatsapp";
import Button from "./Button";
import { WhatsAppIcon } from "./icons";
import Placeholder from "./Placeholder";
import Section from "./Section";
import SectionHeading from "./SectionHeading";

export default function Menus() {
  const { approaches, categories, download } = menus;
  // Until real items arrive, five near-empty cards only add scrolling; a single list says the same thing.
  const allEmpty = categories.every((category) => category.items.length === 0);

  return (
    <Section id="menus" className="bg-sand" divider>
      <SectionHeading eyebrow={menus.eyebrow} title={menus.title} intro={menus.intro} />

      <ul className="mt-10 grid grid-cols-1 gap-3 sm:mt-12 sm:gap-5 md:grid-cols-3 lg:mt-16 lg:gap-7">
        {approaches.map((approach) => (
          <li key={approach.title} className="rounded-card bg-white px-5 py-5 text-center shadow-card transition duration-300 ease-out hover:-translate-y-1 hover:shadow-lift sm:p-6 lg:p-9">
            <span aria-hidden="true" className="mx-auto block h-2 w-2 rotate-45 bg-gold" />
            <h3 className="mt-4 text-h3">{approach.title}</h3>
            <p className="mt-2 text-balance text-ink-muted">{approach.description}</p>
          </li>
        ))}
      </ul>

      <div className="mt-12 sm:mt-16 lg:mt-24">
        <h3 className="text-center font-sans text-eyebrow font-semibold uppercase text-wine">{menus.templateTitle}</h3>
        {allEmpty ? (
          <ul className="mx-auto mt-6 max-w-3xl divide-y divide-ink/10 rounded-card border border-ink/10 bg-ivory">
            {categories.map((category) => (
              <li
                key={category.title}
                className="flex flex-col gap-2 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-7 sm:py-5"
              >
                <h4 className="text-[1.375rem] leading-snug sm:text-h3">{category.title}</h4>
                <Placeholder variant="text" label={menus.itemsPlaceholder} className="self-start sm:self-auto" />
              </li>
            ))}
          </ul>
        ) : (
          // Flex rather than grid so the last row of the five cards stays centred
          <ul className="mt-6 flex flex-wrap justify-center gap-5">
            {categories.map((category) => (
              <li
                key={category.title}
                className="w-full rounded-card border border-ink/10 bg-ivory p-6 transition-colors duration-300 hover:border-gold sm:w-[calc(50%-0.625rem)] lg:w-[calc(33.333%-0.84rem)] lg:p-7"
              >
                <h4 className="text-h3">{category.title}</h4>
                <span aria-hidden="true" className="mt-3 block h-px w-10 bg-gold" />
                <div className="mt-4">
                  {category.items.length > 0 ? (
                    <ul className="space-y-1.5 text-ink-muted">
                      {category.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  ) : (
                    <Placeholder variant="text" label={menus.itemsPlaceholder} />
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
        <p className="mt-6 text-center text-sm italic text-ink-muted">{menus.note}</p>
      </div>

      <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row sm:gap-4 lg:mt-12">
        <Button href={whatsappLink()} newTab>
          <WhatsAppIcon className="h-5 w-5" />
          {menus.discussLabel}
        </Button>
        {download.url ? (
          <Button variant="outline" href={download.url} newTab>
            {download.label}
          </Button>
        ) : (
          <Button disabled>
            {download.label}
            <span className="rounded-full border border-dashed border-gold px-2 py-0.5 text-xs font-medium italic">
              {download.comingSoonLabel}
            </span>
          </Button>
        )}
      </div>
    </Section>
  );
}
