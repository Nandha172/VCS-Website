type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  /** Use on wine backgrounds. */
  onDark?: boolean;
  as?: "h1" | "h2" | "h3";
};

export default function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "center",
  onDark = false,
  as: Heading = "h2",
}: SectionHeadingProps) {
  const centred = align === "center";

  return (
    <div className={`max-w-2xl ${centred ? "mx-auto text-center" : ""}`}>
      {eyebrow && (
        <p className={`text-eyebrow font-semibold uppercase ${onDark ? "text-gold-light" : "text-wine"}`}>{eyebrow}</p>
      )}
      <Heading className={`mt-4 text-h2 ${onDark ? "text-ivory" : "text-ink"}`}>{title}</Heading>
      <span aria-hidden="true" className={`mt-6 flex items-center gap-2 ${centred ? "justify-center" : ""}`}>
        <span className="h-px w-10 bg-gold" />
        <span className="h-1.5 w-1.5 rotate-45 border border-gold" />
        <span className="h-px w-10 bg-gold" />
      </span>
      {intro && <p className={`mt-7 text-lead ${onDark ? "text-ivory/85" : "text-ink-muted"}`}>{intro}</p>}
    </div>
  );
}
