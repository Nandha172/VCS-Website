import { about, site } from "../content";
import Placeholder from "./Placeholder";
import Section from "./Section";
import SectionHeading from "./SectionHeading";

export default function About() {
  const { teamPhoto, serviceAreas } = about;

  return (
    <Section id="about" className="bg-sand" divider>
      <div className="grid items-center gap-10 lg:grid-cols-[5fr_7fr] lg:gap-20">
        {/* On phones and tablets the text comes first, so the About link lands on the heading rather than the photo */}
        <div className="order-last mx-auto w-full max-w-md lg:order-none lg:max-w-none">
          {teamPhoto.src ? (
            <img
              src={teamPhoto.src}
              alt={teamPhoto.alt}
              loading="lazy"
              decoding="async"
              style={{ aspectRatio: teamPhoto.aspectRatio }}
              className="w-full rounded-card object-cover shadow-card"
            />
          ) : (
            <Placeholder
              variant="image"
              caption={teamPhoto.placeholderCaption}
              aspectRatio={teamPhoto.aspectRatio}
              tone="ivory"
            />
          )}
        </div>

        <div>
          <SectionHeading align="left" eyebrow={about.eyebrow} title={about.title} />
          <p className="mt-7 text-lead text-ink-muted">{about.text}</p>
          <p className="mt-6 font-display text-h3 text-wine">
            <span className="mb-1 block font-sans text-eyebrow font-semibold uppercase text-ink-muted sm:mb-0 sm:mr-2 sm:inline">
              {about.proprietorLabel}
            </span>
            {site.proprietor}
          </p>

          <ul className="mt-8 grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
            {about.values.map((value) => (
              <li key={value} className="flex items-center gap-3 font-medium">
                <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rotate-45 bg-gold-deep" />
                {value}
              </li>
            ))}
          </ul>

          <div className="mt-9 border-t border-gold/50 pt-7">
            <h3 className="font-sans text-eyebrow font-semibold uppercase text-wine">{serviceAreas.label}</h3>
            <p className="mt-2 font-display text-h3">{serviceAreas.summary}</p>
            <div className="mt-3">
              {serviceAreas.areas.length > 0 ? (
                <ul className="flex flex-wrap gap-2">
                  {serviceAreas.areas.map((area) => (
                    <li key={area} className="rounded-full border border-ink/15 bg-white px-4 py-1.5 text-sm">
                      {area}
                    </li>
                  ))}
                </ul>
              ) : (
                <Placeholder variant="text" label={serviceAreas.placeholder} />
              )}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
