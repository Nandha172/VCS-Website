import { useEffect, useId, useRef, type ReactNode } from "react";
import { useScrollLock } from "../hooks/useScrollLock";
import { CloseIcon } from "./icons";

type ModalProps = {
  title: string;
  closeLabel: string;
  onClose: () => void;
  children: ReactNode;
};

export default function Modal({ title, closeLabel, onClose, children }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  useScrollLock(true);

  // A native modal dialog gives us the focus trap, Escape to close and focus return for free.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) dialog.showModal();
  }, []);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === dialogRef.current) onClose();
      }}
      className="focus-on-light m-auto max-h-[85dvh] w-[min(92vw,40rem)] rounded-card bg-ivory p-0 text-ink shadow-lift backdrop:bg-ink/70"
    >
      <div className="flex items-center justify-between gap-4 border-b border-ink/10 py-3 pl-6 pr-3">
        <h2 id={titleId} className="text-h3">
          {title}
        </h2>
        <button
          type="button"
          onClick={onClose}
          aria-label={closeLabel}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-ink transition-colors hover:bg-sand"
        >
          <CloseIcon />
        </button>
      </div>
      <div className="p-6">{children}</div>
    </dialog>
  );
}
