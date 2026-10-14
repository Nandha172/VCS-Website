import { useState } from "react";
import { gallery, socials } from "../content";
import Lightbox from "./Lightbox";
import Placeholder from "./Placeholder";
import Section from "./Section";
import SectionHeading from "./SectionHeading";

type FilterId = (typeof gallery.filters)[number]["id"];

const instagramUrl = socials.find((social) => social.id === "instagram")?.url ?? undefined;

export default function Gallery() {
  const [filter, setFilter] = useState<FilterId>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const visible = gallery.items.filter((item) => filter === "all" || item.category === filter);
  // Only real photos open in the lightbox; placeholders are not clickable.
  const photos = visible.filter((item) => item.src !== null);
  // Filtering a wall of placeholders is a dead end, so the tabs appear once real photos exist.
  const hasPhotos = gallery.items.some((item) => item.src !== null);

  return (
    <Section id="gallery">
      <SectionHeading eyebrow={gallery.eyebrow} title={gallery.title} />

      {hasPhotos && (
        <ul className="mt-10 flex flex-wrap justify-center gap-2 lg:mt-12">
          {gallery.filters.map((option) => {
            const active = option.id === filter;
            return (
              <li key={option.id}>
                <button
                  type="button"
                  aria-pressed={active}
                  onClick={() => {
                    setFilter(option.id);
                    setLightboxIndex(null);
                  }}
                  className={`min-h-11 rounded-full border px-4 text-sm font-medium transition duration-200 active:scale-95 ${
                    active ? "border-wine bg-wine text-ivory shadow-card" : "border-ink/15 bg-white text-ink hover:border-wine hover:text-wine active:border-wine active:text-wine"
                  }`}
                >
                  {option.label}
                </button>
              </li>
            );
          })}
        </ul>
      )}

      {/* CSS columns give the masonry flow: 2 / 3 / 4 columns */}
      <ul className={`columns-2 gap-3 sm:gap-4 md:columns-3 lg:columns-4 ${hasPhotos ? "mt-8 lg:mt-10" : "mt-10 lg:mt-14"}`}>
        {visible.map((item) => (
          <li key={item.caption} className="mb-3 break-inside-avoid sm:mb-4">
            {item.src ? (
              <figure>
                <button
                  type="button"
                  onClick={() => setLightboxIndex(photos.indexOf(item))}
                  className="block w-full overflow-hidden rounded-card shadow-card transition-shadow duration-300 hover:shadow-lift active:opacity-90"
                >
                  <img
                    src={item.src}
                    alt={item.alt || item.caption}
                    loading="lazy"
                    decoding="async"
                    style={{ aspectRatio: item.aspectRatio }}
                    className="w-full object-cover transition-transform duration-500 hover:scale-[1.03]"
                  />
                </button>
                <figcaption className="mt-2 text-sm text-ink-muted">{item.caption}</figcaption>
              </figure>
            ) : (
              <Placeholder variant="image" caption={item.caption} aspectRatio={item.aspectRatio} />
            )}
          </li>
        ))}
      </ul>

      <p className="mt-8 text-center text-ink-muted">
        {gallery.moreLine.before}
        <a
          href={instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-wine underline underline-offset-4"
        >
          {gallery.moreLine.linkLabel}
        </a>
        {gallery.moreLine.after}
      </p>

      {lightboxIndex !== null && photos[lightboxIndex] && (
        <Lightbox
          items={photos}
          index={lightboxIndex}
          onNavigate={setLightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </Section>
  );
}
