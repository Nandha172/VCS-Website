# Vedavalli Catering Services (VCS) — website

First website for a family-run, 100% vegetarian catering business in Korattur, Chennai.
Single scrolling page, v1. Full spec: [docs/VCS-Website-Requirements.md](docs/VCS-Website-Requirements.md) — read it before changing content or layout.

Stack: React + Vite + TypeScript + Tailwind CSS. No backend, no router, no form library.

## Non-negotiable rules

### 1. No prices, anywhere
- No prices, rates, per-plate costs, "starting from", price ranges, discounts or currency symbols — in copy, meta tags, JSON-LD (`priceRange` must not be set), alt text or placeholders.
- Pricing is quote-only. The only route to a price is a WhatsApp enquiry.

### 2. "A Tradition Since 1971" next to the business name
- Wherever the business name appears as a lockup (header, footer), show **"A Tradition Since 1971"** beside/under it.
- This exact wording is used everywhere (hero eyebrow, trust strip too) — not "A Catering Tradition Since 1971". It overrides the requirements doc.
- **Never** write "Est. 1971", "Established 1971" or "Since 1971" on its own next to the name. The family has catered since 1971; the name "Vedavalli Catering Services" is newer.

### 3. WhatsApp-only enquiries — no forms
- No contact form, enquiry form, input fields, backend, database, booking or payments.
- Every "Get a Quote" / WhatsApp CTA opens `https://wa.me/919940541996` with the URL-encoded pre-filled message from `content.ts`.
- Other contact routes are plain links only: `tel:+919940541996`, `tel:+919444288727`, `mailto:vedavallicateringservices@gmail.com`.
- No map embed, no Instagram feed embed.

### 4. Positioning: 100% vegetarian, any cuisine
- Always "100% vegetarian". Menus are built around what the client wants, in **any cuisine**.
- Never describe the business as South Indian-only, a fixed buffet/restaurant menu, or community-specific.
- Menu model: template menu as-is → customise it → fully custom.
- Never invent reviews, testimonials, menu items, statistics or claims. The reviews array stays empty until real ones are supplied, and the Reviews section is hidden while it is empty.

### 5. All content lives in `src/content.ts`
- Every piece of text, link, phone number, menu item, FAQ, gallery item, review, social link, SEO string and the site URL is defined in `src/content.ts`.
- Components contain no hard-coded copy; they only render what they are given.
- Social links carry `status: "live" | "coming_soon"`. Flipping to `live` and adding a URL must be the only change needed to activate one.
- English only in v1.

### 6. Colour palette and fonts
Defined once as Tailwind theme tokens; never use raw hex values in components.

| Token | Hex | Use |
|---|---|---|
| Ivory | `#FAF7F2` | Main background |
| Warm Sand | `#F1E9DD` | Alternate section background, image placeholders |
| Charcoal Ink | `#1F1B18` | Body text |
| Wine (maroon) | `#7C2B2C` | Primary: footer, key sections, header accents. The logo disc's maroon (`#8B3031`) taken slightly darker so large areas don't read as red — replaces the doc's `#5A1A2A` |
| Wine Deep | `#5E1D21` | Depth only: toast, gradients, hover |
| Champagne Gold | `#C2A36B` | Buttons, icons, dividers, accents |
| Gold Light / Gold Deep | `#E8D8AE` / `#A88850` | Small gold text on wine / button hover |
| Banana-Leaf Green | `#3E5B3A` | Very sparing — "100% Vegetarian" badge only |
| White | `#FFFFFF` | Cards |

- The theme follows the logo (wine + gold) on ivory/off-white. Ivory stays the dominant surface; wine is used in blocks, not everywhere.
- All text must meet WCAG AA. Champagne Gold is **not** legible as text on ivory/white, and white text is not legible on gold: gold buttons use Charcoal Ink text. On wine, Champagne Gold is for large text, icons and lines only; small text uses Ivory or Gold Light.
- Headings: **Cormorant Garamond**. Body and buttons: **Manrope**. Both loaded from Google Fonts. Eyebrow labels: small, uppercase, letter-spaced.
- Type scales with `clamp()`. Corners 8–12px, subtle shadows, generous white space.
- Logo (`docs/LOGOS.png`) is used exactly as provided — never redrawn, recoloured or cropped. Resizing/optimising copies is fine.
- The business card is a reference for name, taglines and feel only. Do not copy its layout or deity imagery.
- The proprietor name **"T. Jagannathan Iyengar & Sons"** is shown on the site (About and footer) so visitors know who runs the business.
- Motion: gentle fade/slide on scroll, disabled under `prefers-reduced-motion`.

### 7. Placeholder system
- One reusable `<Placeholder>` component, two variants:
  - **Text:** small pill, dashed Champagne Gold border, italic muted text (e.g. "FSSAI number — to be added").
  - **Image:** Warm Sand box, dashed Champagne Gold border, camera icon, caption. Reserves the final aspect ratio so nothing shifts when the real image arrives.
- Every placeholder value in `content.ts` has a `// TODO` comment on it.
- Never replace a placeholder with invented content. Image placeholders are not clickable (no lightbox).
- Current placeholders: 8 gallery photos, team photo, service options, template menu items (5 categories), menu PDF, specific service areas, 5 FAQ answers, FSSAI number, privacy policy text, Facebook/X/LinkedIn URLs, Google reviews link and reviews.
- The hero uses a stand-in Unsplash photo (`public/images/hero.jpg`) that the owner approved until their own event photo is taken. Replace it, not the layout, when the real photo arrives.

### 8. Responsive widths to test
Mobile and desktop are equally important. Check every change at:

**360, 375, 414** (phones) · **768** (tablet) · **1024, 1280, 1440, 1920** (desktop)

At every width: no overlap, no cut-off or overflowing elements, no horizontal scroll.

- Hamburger nav on phone and tablet; full nav bar on desktop.
- Card grids 1 / 2 / 3–4 columns; gallery 2 / 3 / 4 columns.
- Container max ~1200px, centred; side padding ≥16px phones, ≥32px desktop.
- Touch targets ≥44px. Hover effects on desktop only.
- Floating WhatsApp button (mobile only) and toast must never cover buttons or footer links; respect `env(safe-area-inset-*)`.
- `scroll-margin-top` matches the sticky header height.
- Browsers: Chrome, Safari (incl. iPhone), Edge, Firefox.

## Accessibility and SEO
- Semantic HTML, alt text on every image, keyboard- and screen-reader-accessible menu, accordion, modal and toast.
- Title: "Vedavalli Catering Services | Pure Vegetarian Catering in Chennai". Canonical: `https://www.vedavallicateringservices.com`.
- Open Graph tags, favicon from the logo, LocalBusiness/FoodEstablishment JSON-LD (`servesCuisine: "Vegetarian"`, no price fields).

## Before calling anything done
Run through the acceptance checklist in section 10 of the requirements doc.
