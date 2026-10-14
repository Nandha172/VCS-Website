import { useEffect, useRef } from "react";
import { gallery, type GalleryItem } from "../content";
import { useScrollLock } from "../hooks/useScrollLock";
import { ChevronLeftIcon, ChevronRightIcon, CloseIcon } from "./icons";

type LightboxProps = {
  /** Real images only — placeholders never reach the lightbox. */
  items: GalleryItem[];
  index: number;
  onNavigate: (index: number) => void;
  onClose: () => void;
};

const controlStyle =
  "flex h-11 w-11 items-center justify-center rounded-full bg-ink/60 text-ivory transition-colors hover:bg-ink focus-visible:outline-gold-light";

export default function Lightbox({ items, index, onNavigate, onClose }: LightboxProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const item = items[index];
  const many = items.length > 1;
  useScrollLock(true);

  // A native modal dialog gives us the focus trap, Escape to close and focus return for free.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) dialog.showModal();
  }, []);

  const step = (delta: number) => onNavigate((index + delta + items.length) % items.length);

  return (
    <dialog
      ref={dialogRef}
      aria-label={item.alt || item.caption}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === dialogRef.current) onClose();
      }}
      onKeyDown={(event) => {
        if (!many) return;
        if (event.key === "ArrowLeft") step(-1);
        if (event.key === "ArrowRight") step(1);
      }}
      className="focus-on-dark m-auto max-h-none max-w-none bg-transparent p-4 backdrop:bg-ink/90"
    >
      <figure className="relative">
        <img
          src={item.src ?? undefined}
          alt={item.alt || item.caption}
          className="max-h-[80dvh] max-w-[min(92vw,1100px)] rounded-card object-contain"
        />
        <figcaption className="mt-3 text-center text-sm text-ivory">{item.caption}</figcaption>

        <button type="button" onClick={onClose} aria-label={gallery.lightbox.closeLabel} className={`absolute right-2 top-2 ${controlStyle}`}>
          <CloseIcon />
        </button>
        {many && (
          <>
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label={gallery.lightbox.previousLabel}
              className={`absolute left-2 top-1/2 -translate-y-1/2 ${controlStyle}`}
            >
              <ChevronLeftIcon />
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label={gallery.lightbox.nextLabel}
              className={`absolute right-2 top-1/2 -translate-y-1/2 ${controlStyle}`}
            >
              <ChevronRightIcon />
            </button>
          </>
        )}
      </figure>
    </dialog>
  );
}
