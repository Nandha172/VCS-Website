import { CameraIcon } from "./icons";

type TextPlaceholderProps = {
  variant: "text";
  label: string;
  className?: string;
};

type ImagePlaceholderProps = {
  variant: "image";
  caption: string;
  /** CSS aspect-ratio, e.g. "4 / 3". Must match the real image so nothing shifts later. */
  aspectRatio?: string;
  /** Fills its positioned parent instead of reserving an aspect ratio; the caption sits along the top edge. */
  fill?: boolean;
  /** "ivory" is for sand-coloured sections; "dark" sits under light text, e.g. the hero. */
  tone?: "light" | "ivory" | "dark";
  className?: string;
};

type PlaceholderProps = TextPlaceholderProps | ImagePlaceholderProps;

export default function Placeholder(props: PlaceholderProps) {
  if (props.variant === "text") {
    return (
      <span
        className={`inline-block rounded-full border border-dashed border-gold bg-ivory px-3 py-1 text-sm italic text-ink-muted ${props.className ?? ""}`}
      >
        {props.label}
      </span>
    );
  }

  const { caption, aspectRatio = "4 / 3", fill = false, tone = "light", className = "" } = props;
  const dark = tone === "dark";

  const surface = dark
    ? "border-gold/60 bg-wine text-ivory/85"
    : `border-gold text-ink-muted ${tone === "ivory" ? "bg-ivory" : "bg-sand"}`;
  const layout = fill
    ? "items-start justify-center gap-2 p-3 lg:justify-end lg:p-5"
    : "w-full flex-col items-center justify-center gap-2 p-3 text-center sm:gap-3 sm:p-4";

  return (
    <div
      role="img"
      aria-label={caption}
      style={fill ? undefined : { aspectRatio }}
      className={`flex rounded-card border border-dashed ${surface} ${layout} ${className}`}
    >
      <CameraIcon className={`shrink-0 ${fill ? "h-5 w-5" : "h-6 w-6 sm:h-8 sm:w-8"} ${dark ? "text-gold-light" : "text-gold-deep"}`} />
      <span className={`italic ${fill ? "text-sm" : "max-w-[28ch] text-xs sm:text-sm"}`}>{caption}</span>
    </div>
  );
}
