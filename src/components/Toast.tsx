import { useEffect, useState, type ReactNode } from "react";
import { CloseIcon } from "./icons";

type ToastProps = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  closeLabel: string;
  /** Auto-dismiss delay in ms. */
  duration?: number;
  /** Change this to restart the timer when the message changes while the toast is open. */
  resetKey?: string | null;
};

type ToastBodyProps = Pick<ToastProps, "onClose" | "children" | "closeLabel"> & { duration: number };

function ToastBody({ onClose, children, closeLabel, duration }: ToastBodyProps) {
  // Hovering or focusing the toast pauses the countdown so there is time to read it and reach the link.
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = window.setTimeout(onClose, duration);
    return () => window.clearTimeout(timer);
  }, [paused, onClose, duration]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      className="focus-on-dark pointer-events-auto flex w-full max-w-md items-start gap-3 overflow-hidden rounded-card border-t-2 border-gold bg-wine-deep py-3 pl-5 pr-2 text-ivory shadow-lift"
    >
      <p className="flex-1 py-1.5 text-sm leading-relaxed">{children}</p>
      <button
        type="button"
        onClick={onClose}
        aria-label={closeLabel}
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-gold-light transition-colors hover:bg-ivory/10"
      >
        <CloseIcon className="h-5 w-5" />
      </button>
    </div>
  );
}

export default function Toast({ open, onClose, children, closeLabel, duration = 4000, resetKey }: ToastProps) {
  return (
    // The live region stays mounted so screen readers announce the message when it appears.
    <div
      role="status"
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex justify-center px-4 pb-[calc(1rem+env(safe-area-inset-bottom))]"
    >
      {open && (
        <ToastBody key={resetKey} onClose={onClose} closeLabel={closeLabel} duration={duration}>
          {children}
        </ToastBody>
      )}
    </div>
  );
}
