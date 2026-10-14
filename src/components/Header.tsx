import { useEffect, useRef, useState } from "react";
import logo from "../assets/logo-192.png";
import { contact, cta, nav, site } from "../content";
import { useActiveSection } from "../hooks/useActiveSection";
import { useScrollLock } from "../hooks/useScrollLock";
import { useScrolled } from "../hooks/useScrolled";
import { whatsappLink } from "../lib/whatsapp";
import Button from "./Button";
import Container from "./Container";
import { CloseIcon, MenuIcon, PhoneIcon, WhatsAppIcon } from "./icons";

const MENU_ID = "mobile-menu";
const DESKTOP_QUERY = "(min-width: 64rem)";
const SECTION_IDS = nav.links.map((link) => link.href.slice(1));

export default function Header() {
  const scrolled = useScrolled();
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const activeSection = useActiveSection(SECTION_IDS);
  useScrollLock(open);

  useEffect(() => {
    if (!open) return;
    const close = () => setOpen(false);
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      close();
      // The panel is about to be hidden, so hand focus back to the button that opened it.
      toggleRef.current?.focus();
    };
    // Keep keyboard and screen-reader focus out of the page behind the panel.
    const main = document.querySelector("main");
    const desktop = window.matchMedia(DESKTOP_QUERY);

    main?.setAttribute("inert", "");
    window.addEventListener("keydown", onKey);
    desktop.addEventListener("change", close);
    return () => {
      main?.removeAttribute("inert");
      window.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", close);
    };
  }, [open]);

  // --bar-h drives both the bar height and the height of the mobile panel below it.
  const barHeight = scrolled ? "[--bar-h:3.75rem] lg:[--bar-h:4.25rem]" : "[--bar-h:4.25rem] lg:[--bar-h:5.25rem]";

  return (
    <header
      className={`sticky top-0 z-40 bg-ivory/95 backdrop-blur transition-shadow duration-300 ${barHeight} ${
        scrolled || open ? "shadow-card" : ""
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-2 focus:z-50 focus:rounded-control focus:bg-wine focus:px-4 focus:py-2 focus:text-ivory"
      >
        {nav.skipLabel}
      </a>

      <Container className="flex h-(--bar-h) items-center justify-between gap-3 transition-[height] duration-300">
        <a href="#home" onClick={() => setOpen(false)} className="flex min-w-0 items-center gap-2.5 sm:gap-3">
          <img
            src={logo}
            alt={site.logoAlt}
            width={48}
            height={48}
            className={`shrink-0 transition-[width,height] duration-300 ${scrolled ? "h-9 w-9 lg:h-11 lg:w-11" : "h-10 w-10 lg:h-12 lg:w-12"}`}
          />
          <span className="min-w-0">
            <span className="block whitespace-nowrap font-display text-[clamp(1rem,4.6vw,1.375rem)] font-semibold leading-none text-ink lg:text-xl xl:text-2xl">
              {site.name}
            </span>
            <span className="mt-1 block whitespace-nowrap text-[0.625rem] font-semibold uppercase leading-none tracking-[0.18em] text-wine sm:text-[0.6875rem]">
              {site.traditionLine}
            </span>
          </span>
        </a>

        <nav aria-label={nav.label} className="hidden lg:block">
          <ul className="flex items-center gap-5 xl:gap-8">
            {nav.links.map((link) => {
              const current = `#${activeSection}` === link.href;
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    aria-current={current ? "location" : undefined}
                    className={`relative block py-2 text-sm font-medium transition-colors after:absolute after:inset-x-0 after:bottom-0.5 after:h-px after:origin-left after:bg-gold-deep after:transition-transform after:duration-300 hover:text-wine hover:after:scale-x-100 active:text-wine ${
                      current ? "text-wine after:scale-x-100" : "text-ink after:scale-x-0"
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
          {/* Hidden on phones: the floating WhatsApp button covers it there. */}
          <div className="hidden sm:block">
            <Button size="sm" href={whatsappLink()} newTab>
              {cta.quote}
            </Button>
          </div>
          <button
            ref={toggleRef}
            type="button"
            aria-expanded={open}
            aria-controls={MENU_ID}
            aria-label={open ? nav.closeMenuLabel : nav.openMenuLabel}
            onClick={() => setOpen((value) => !value)}
            className="-mr-2 flex h-11 w-11 items-center justify-center rounded-control text-ink transition-colors active:bg-sand lg:hidden"
          >
            {open ? <CloseIcon className="h-7 w-7" /> : <MenuIcon className="h-7 w-7" />}
          </button>
        </div>
      </Container>

      <div
        id={MENU_ID}
        hidden={!open}
        className="absolute inset-x-0 top-full h-[calc(100dvh-var(--bar-h))] overflow-y-auto overscroll-contain border-t border-ink/10 bg-ivory lg:hidden"
      >
        <Container className="flex min-h-full flex-col pb-[calc(1.5rem+env(safe-area-inset-bottom))] pt-2">
          <nav aria-label={nav.mobileLabel}>
            <ul>
              {nav.links.map((link) => {
                const current = `#${activeSection}` === link.href;
                return (
                  <li key={link.href} className="border-b border-ink/10">
                    <a
                      href={link.href}
                      onClick={() => setOpen(false)}
                      aria-current={current ? "location" : undefined}
                      className={`flex min-h-14 items-center justify-between gap-4 font-display text-2xl transition-colors active:text-wine ${
                        current ? "text-wine" : "text-ink"
                      }`}
                    >
                      {link.label}
                      {current && <span aria-hidden="true" className="h-2 w-2 rotate-45 bg-gold" />}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
          <div className="mt-auto flex flex-col gap-3 pt-8">
            <Button href={whatsappLink()} newTab onClick={() => setOpen(false)}>
              <WhatsAppIcon className="h-5 w-5" />
              {cta.quote}
            </Button>
            <Button variant="outline" href={contact.phones[0].href} onClick={() => setOpen(false)}>
              <PhoneIcon className="h-5 w-5" />
              {cta.call}
            </Button>
          </div>
        </Container>
      </div>
    </header>
  );
}
