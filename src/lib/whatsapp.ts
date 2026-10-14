import { contact, whatsappMessage } from "../content";

/** Builds the wa.me link with a URL-encoded pre-filled message (defaults to the "Get a Quote" message). */
export function whatsappLink(message: string = whatsappMessage): string {
  return `https://wa.me/${contact.whatsapp.number}?text=${encodeURIComponent(message)}`;
}
