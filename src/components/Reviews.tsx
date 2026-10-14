import { reviews } from "../content";
import Section from "./Section";
import SectionHeading from "./SectionHeading";

export default function Reviews() {
  const { items, googleReviews } = reviews;

  // Genuine reviews only: the whole section stays hidden until some exist.
  if (items.length === 0) return null;

  return (
    <Section className="bg-sand">
      <SectionHeading eyebrow={reviews.eyebrow} title={reviews.title} />

      <ul className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-6">
        {items.map((review) => (
          <li key={`${review.name}-${review.eventType}`}>
            <figure className="flex h-full flex-col rounded-card bg-white p-6 shadow-card lg:p-8">
              <span aria-hidden="true" className="font-display text-5xl leading-none text-gold">
                &ldquo;
              </span>
              <blockquote className="mt-2 flex-1 text-ink">{review.text}</blockquote>
              <figcaption className="mt-6 border-t border-ink/10 pt-4">
                <span className="block font-display text-xl text-ink">{review.name}</span>
                <span className="block text-sm text-ink-muted">{review.eventType}</span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>

      {googleReviews.url && (
        <p className="mt-10 text-center">
          <a
            href={googleReviews.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-wine underline underline-offset-4"
          >
            {googleReviews.label}
          </a>
        </p>
      )}
    </Section>
  );
}
