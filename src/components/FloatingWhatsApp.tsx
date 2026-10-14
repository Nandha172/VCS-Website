import { cta } from "../content";
import { whatsappLink } from "../lib/whatsapp";
import { WhatsAppIcon } from "./icons";

type FloatingWhatsAppProps = {
  /** Steps aside while the toast is showing so the two never overlap. */
  hidden?: boolean;
};

/** Mobile only. z-30 keeps it under the header and the open mobile menu. */
export default function FloatingWhatsApp({ hidden = false }: FloatingWhatsAppProps) {
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={cta.floatingWhatsappLabel}
      aria-hidden={hidden}
      tabIndex={hidden ? -1 : undefined}
      className={`fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] right-[calc(1rem+env(safe-area-inset-right))] z-30 flex h-14 w-14 items-center justify-center rounded-full border-2 border-ivory bg-gold text-ink shadow-lift transition-opacity duration-200 active:scale-95 md:hidden ${
        hidden ? "pointer-events-none opacity-0" : ""
      }`}
    >
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  );
}
