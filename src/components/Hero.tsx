import { contact, cta, hero } from "../content";
import { whatsappLink } from "../lib/whatsapp";
import Button from "./Button";
import Container from "./Container";
import { PhoneIcon, WhatsAppIcon } from "./icons";
import Placeholder from "./Placeholder";

export default function Hero() {
  const { image } = hero;

  return (
    <section
      id="home"
      className="focus-on-dark relative isolate flex min-h-[36rem] items-center overflow-hidden bg-wine lg:min-h-[44rem]"
    >
      {image.src ? (
        <img
          src={image.src}
          alt={image.alt}
          fetchPriority="high"
          style={{ objectPosition: image.position }}
          className="absolute inset-0 -z-20 h-full w-full object-cover"
        />
      ) : (
        <Placeholder
          variant="image"
          tone="dark"
          fill
          caption={image.placeholderCaption}
          className="absolute inset-2 -z-20 lg:inset-4"
        />
      )}
      {/* The dark overlay keeps text readable over a photo; the maroon placeholder needs none */}
      {image.src && (
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-linear-to-t from-ink/80 via-ink/60 to-ink/50 lg:bg-linear-to-r lg:from-ink/85 lg:via-ink/55 lg:to-ink/10"
        />
      )}

      <Container className="py-20 lg:py-28">
        <div className="max-w-2xl">
          <p className="flex items-center gap-3 text-eyebrow font-semibold uppercase text-gold-light">
            <span aria-hidden="true" className="h-px w-8 bg-gold" />
            {hero.eyebrow}
          </p>
          <h1 className="mt-6 text-display text-ivory">{hero.headline}</h1>
          <p className="mt-7 max-w-xl text-lead text-ivory/90">{hero.subtext}</p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <Button href={whatsappLink()} newTab>
              <WhatsAppIcon className="h-5 w-5" />
              {cta.quote}
            </Button>
            <Button variant="outline" onDark href={contact.phones[0].href}>
              <PhoneIcon className="h-5 w-5" />
              {cta.call}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
