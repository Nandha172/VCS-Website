# Vedavalli Catering Services — Website Requirements (v1)

**Project:** First website for Vedavalli Catering Services (VCS)
**Domain (to be connected at launch):** www.vedavallicateringservices.com
**Version:** v1 — foundational build
**Last updated:** 13 October 2026

---

## 1. Business overview

| Item | Detail |
|---|---|
| Business name | Vedavalli Catering Services (VCS) |
| Type | Family-run, 100% vegetarian catering and event services |
| Heritage | Family has been catering since 1971. The business name has changed over the years; "Vedavalli Catering Services" is the current name. |
| Location | Korattur, Chennai, Tamil Nadu |
| Address | No 12/A, Gandhi Nagar, Srinivasapuram, Korattur, Chennai – 600076 |
| Kitchen | Own home-based kitchen (not a restaurant or walk-in storefront) |
| Service area | Korattur and across Chennai (specific areas to be added) |
| Taglines | "Celebrations Made Complete" · "We Plan. We Serve. You Celebrate." |

### Positioning
- 100% vegetarian, in **any cuisine**. Menus are built around what the client wants to serve.
- Not a fixed buffet or restaurant menu, and not limited to South Indian food.
- Clients can choose the **template menu as-is**, **customise it**, or use it as a base for a **fully custom menu**.
- Service style: traditional-style service for weddings; buffet with live counters for receptions.
- Also arranges **event photography** and **mangala vaathiyam**.

### Important wording rules
- Use "A Catering Tradition Since 1971" or "a family catering tradition since 1971".
- **Never** use "Est. 1971" or "Established 1971" next to the business name (the current name is newer).
- **Never** show prices or rates anywhere. Pricing is quote-only.
- Don't describe the business as South Indian-only or community-specific.

---

## 2. Goals of the website

1. Make it easy for a visitor to send an enquiry on WhatsApp within a few seconds, on any device.
2. Build trust: family heritage since 1971, 100% vegetarian, custom menus, real events.
3. Look premium and modern on both mobile phones and desktop browsers.
4. Be easy to update: all text and placeholders in one content file.
5. Be ready to split into separate pages later for SEO.

---

## 3. Scope

### In scope (v1)
- Single scrolling page with section navigation
- WhatsApp-based enquiries (no form)
- Placeholders for content not yet available
- Social links with "coming soon" behaviour for accounts not yet created
- Basic SEO and local business structured data

### Out of scope (v1)
- Contact or enquiry form, backend, database
- Online booking or payments
- Published prices
- Tamil language version (English only for now)
- Blog
- Map embed
- Instagram feed embed

---

## 4. Contact details and links

| Channel | Value | Status |
|---|---|---|
| WhatsApp (primary enquiry) | +91 99405 41996 → `https://wa.me/919940541996` | Live |
| Phone (primary) | 99405 41996 → `tel:+919940541996` | Live |
| Phone (secondary) | 94442 88727 → `tel:+919444288727` | Live |
| Email | vedavallicateringservices@gmail.com → `mailto:` | Live |
| Instagram | `https://instagram.com/vedavalli_catering_services` | Live |
| Facebook | — | Coming soon |
| X | — | Coming soon |
| LinkedIn | — | Coming soon |

### WhatsApp "Get a Quote" pre-filled message (URL-encode it)
```
Hi Vedavalli Catering, I'd like a quote for my event.
Event type:
Date:
Venue/area:
Approx. guest count:
Menu preference:
```

### "Coming soon" social behaviour
- Each social link is stored in the content file with `status: "live" | "coming_soon"`.
- Clicking a `coming_soon` icon does **not** navigate. It shows a toast:
  > "Our [Facebook / X / LinkedIn] page is launching soon. Follow us on Instagram for updates."
  The word "Instagram" links to the Instagram profile.
- Toast style: deep wine background, ivory text, champagne-gold accent line, auto-dismiss after 4 seconds, closable, accessible to screen readers.
- Changing a link to `live` and adding its URL turns it into a normal link with no other code changes.

---

## 5. Design direction

### Overall feel
Modern and premium, like a high-end wedding caterer or boutique hotel brand: calm, confident, spacious and elegant, with a hint of South Indian tradition. Not a busy restaurant site.

- Generous white space, large typography, clean grids
- Soft rounded corners (8–12px), subtle shadows
- Gentle fade/slide-in animations on scroll (respect `prefers-reduced-motion`)
- Tradition shown only through small details: thin, fine-line kolam or temple-border motifs as dividers or corner accents, used sparingly

### Reference files
- **Logo:** use exactly as provided. Do not redraw or recolour it.
- **Business card:** reference for name, taglines and feel only. **Do not copy its colour scheme.**

### Colour palette
Shades may be fine-tuned for contrast and harmony. All text must meet WCAG AA contrast.

| Name | Hex | Use |
|---|---|---|
| Ivory | `#FAF7F2` | Main background |
| Warm Sand | `#F1E9DD` | Alternate section background, image placeholders |
| Charcoal Ink | `#1F1B18` | Body text |
| Deep Wine | `#5A1A2A` | Primary: footer, key sections, header accents |
| Champagne Gold | `#C2A36B` | Buttons, icons, dividers, accents |
| Banana-Leaf Green | `#3E5B3A` | Very sparing: "100% Vegetarian" badge |
| White | `#FFFFFF` | Cards |

The logo must look good on both ivory and deep wine backgrounds.

### Typography
- **Headings:** Cormorant Garamond (elegant serif), large and airy
- **Body and buttons:** Manrope or Inter (clean sans-serif)
- **Eyebrow labels:** small, uppercase, letter-spaced, above section headings (e.g. "OUR SERVICES")

---

## 6. Page structure and content

Single page. Each section is its own component. Nav links smooth-scroll to section IDs.

### 6.1 Header (sticky)
- Logo + "Vedavalli Catering Services"
- Nav: Home · Services · Menus · Gallery · About · FAQ · Contact
- Champagne-gold "Get a Quote" button (WhatsApp)
- Hamburger menu on mobile and tablet
- Becomes slightly more compact with a soft shadow on scroll

### 6.2 Hero (`#home`)
- Full-width image with soft dark gradient overlay — **placeholder** ("Hero photo coming soon")
- Eyebrow: "A Catering Tradition Since 1971"
- Headline: "Pure Vegetarian Catering for Memorable Occasions"
- Subtext: "Weddings, receptions, upanayanams, family functions and corporate events across Chennai — with menus built around what you want to serve."
- Buttons: "Get a Quote" (gold, WhatsApp) · "Call Us" (outline, tel:)

### 6.3 Trust strip
Four items with fine-line icons:
1. 100% Vegetarian (banana-leaf green badge)
2. A family catering tradition since 1971
3. Any cuisine, menus built to your request
4. Serving Chennai and nearby areas

### 6.4 Services (`#services`)
Card grid:
- Weddings & Muhurtham — traditional-style service
- Receptions — buffet with live counters
- Engagements & family functions
- Upanayanam & religious ceremonies
- Birthdays & celebrations
- Corporate events
- Any other function — "Tell us about your event"

"Also arranged by us": Event Photography · Mangala Vaathiyam
"Service options": **placeholder** — "Service options — to be confirmed"

### 6.5 Menus (`#menus`)
- Intro: "Every menu is built around your event. Choose our template menu as-is, customise it, or use it as a starting point for something entirely your own, in any cuisine, always 100% vegetarian."
- Three cards: **Template Menu** / **Customise It** / **Fully Custom**
- Template menu categories, each a **placeholder** ("Menu items coming soon"):
  - Breakfast & Tiffin
  - Lunch / Meals
  - Snacks
  - Sweets & Desserts
  - Live Counters
- Note: "Menus may vary by event, season and availability."
- Buttons: "Discuss Your Menu" (WhatsApp) · "Download Menu" (disabled, labelled "Coming soon")

### 6.6 How it works
1. Message us on WhatsApp with your event date, venue and guest count.
2. We discuss your menu and service requirements.
3. You receive a quote and confirm the booking.
4. Our team cooks fresh and serves your event as agreed.

### 6.7 Gallery (`#gallery`)
- Masonry grid with filter tabs: All · Weddings · Banana-Leaf Service · Buffet & Live Counters · Food Close-ups · Team
- 8 image **placeholders** with captions, from a data array
- Lightbox on click (real images only; placeholders not clickable)
- Line below: "More photos from our recent events coming soon. Follow us on Instagram." (Instagram linked)

### 6.8 Reviews
- Driven by an **empty** array. If empty, hide the whole section.
- Each review: name, event type, text
- Optional "See our Google reviews" link (empty for now)
- Only genuine reviews will ever be added. Never generate sample reviews.

### 6.9 About (`#about`)
- Heading: "A Family Tradition of Serving"
- Text: "Our family has been catering celebrations since 1971. The name has changed over the years, but the care hasn't: fresh, 100% vegetarian food, cooked in our own kitchen and served the way your family wants it. Today, as Vedavalli Catering Services, we plan, cook and serve every event ourselves, from intimate family functions to full weddings."
- Values: Freshly cooked · Hygienic preparation · On-time service · Warm hospitality
- Team photo **placeholder**
- Service areas: "Korattur and across Chennai" + **placeholder** "Specific areas — to be added"

### 6.10 FAQ (`#faq`) — accordion
| Question | Answer |
|---|---|
| What types of events do you cater? | Weddings, receptions, engagements, upanayanams, birthdays, corporate events and any other family function. |
| Do you only serve South Indian food? | No. We're 100% vegetarian and cook any cuisine, built to your request. |
| What areas do you serve? | Chennai and nearby areas. Message us with your venue to confirm. |
| How far in advance should I book? | **Placeholder** |
| Is there a minimum guest count? | **Placeholder** |
| Can menus be customised? | Yes. Use our template menu as-is, customise it, or build a fully custom menu. |
| Can you handle dietary requests? | **Placeholder** |
| What's included in the service? | **Placeholder** |
| How do I get a quote? | Message us on WhatsApp with your event date, venue, guest count and menu idea. We'll reply with a quote. |
| What are your payment and cancellation terms? | **Placeholder** |

Placeholder answers show "Answer to be added".

### 6.11 Contact (`#contact`)
- "Planning an event? Tell us about it — we'll get back with availability and a quote."
- Large WhatsApp button, both phone numbers, email
- Area: Korattur, Chennai – 600076
- No map, no form

### 6.12 Footer
Deep wine background, ivory text, champagne-gold accents.
- Logo + "100% vegetarian catering and event services in Chennai. We Plan. We Serve. You Celebrate."
- Section links
- Phones, WhatsApp, email
- Social icons: Instagram, Facebook, X, LinkedIn, Email (live / coming-soon behaviour)
- Address: No 12/A, Gandhi Nagar, Srinivasapuram, Korattur, Chennai – 600076
- "FSSAI Lic. No:" + **placeholder**
- Privacy Policy (simple modal, placeholder text)
- "© {current year} Vedavalli Catering Services"
- "www.vedavallicateringservices.com"

### 6.13 Floating WhatsApp button
- Mobile only, fixed bottom-right, visible at all scroll positions
- Opens WhatsApp with the "Get a Quote" message

---

## 7. Placeholder system

One reusable `<Placeholder>` component:
- **Text placeholder:** label (e.g. "FSSAI number — to be added") in a small pill with a dashed champagne-gold border, italic, muted text.
- **Image placeholder:** warm sand box, dashed champagne-gold border, simple camera icon, caption (e.g. "Photo coming soon — Wedding banana-leaf service"). Keeps the correct aspect ratio so nothing shifts when real images arrive.
- Every placeholder value in `content.ts` has a `// TODO` comment.

### Current placeholders
- Hero photo
- Gallery photos (8)
- Team photo
- Service options
- Template menu items (5 categories)
- Downloadable menu PDF
- Specific service areas
- FAQ answers (5)
- FSSAI licence number
- Privacy policy text
- Facebook, X, LinkedIn URLs
- Google reviews link and reviews

---

## 8. Responsive design (mobile and desktop equally important)

### Widths to test
360px, 375px, 414px (phones) · 768px (tablet) · 1024px, 1280px, 1440px, 1920px (desktop)

At every width: no overlapping, cut-off or overflowing elements, and no horizontal scrolling.

### Layout by screen size
| Element | Phone | Tablet | Desktop |
|---|---|---|---|
| Navigation | Hamburger | Hamburger | Full nav bar |
| Card grids | 1 column | 2 columns | 3–4 columns |
| Gallery | 2 columns | 3 columns | 4 columns |
| How it works | Vertical | Vertical/2×2 | Horizontal |
| Hero buttons | Full-width, stacked | Side by side | Side by side |

### Rules
- Content container max width ~1200px, centred. Side padding at least 16px on phones, 32px on desktop.
- Text sizes scale with `clamp()` and never overflow on small phones.
- Touch targets at least 44px tall on mobile, well spaced.
- Floating WhatsApp button and toast never cover buttons or footer links. Bottom padding on mobile so content scrolls clear. Respect iPhone safe areas (`env(safe-area-inset-*)`).
- `scroll-margin-top` equal to the sticky header height so headings aren't hidden after a nav click.
- Mobile menu: full-width panel, locks background scroll, closes when a link is tapped.
- Images use `object-fit: cover`; never stretched. Placeholders reserve the same space.
- Hover effects on desktop only; tap states on touch devices.
- Browsers: Chrome, Safari (including iPhone), Edge, Firefox.

---

## 9. Technical requirements

- **Stack:** React + Tailwind
- **Content:** all text, links, menu items, FAQs, gallery items, reviews and site URL in `src/content.ts`
- **Components:** Header, Hero, TrustStrip, Services, Menus, HowItWorks, Gallery, Reviews, About, FAQ, Contact, Footer, Placeholder, Toast, FloatingWhatsApp
- **Performance:** lazy-loaded images, optimised assets
- **Accessibility:** semantic HTML, alt text on all images, keyboard- and screen-reader-accessible menu, accordion and toast, WCAG AA contrast
- **SEO:**
  - Title: "Vedavalli Catering Services | Pure Vegetarian Catering in Chennai"
  - Meta description
  - Open Graph tags
  - Favicon from the logo
  - Canonical URL: `https://www.vedavallicateringservices.com`
  - LocalBusiness / FoodEstablishment JSON-LD: name, address, phone, email, url, `servesCuisine: "Vegetarian"`

---

## 10. Acceptance checklist

- [ ] Every "Get a Quote" / WhatsApp button opens WhatsApp with the pre-filled message
- [ ] Phone numbers dial on mobile; email opens the mail app
- [ ] Instagram opens in a new tab
- [ ] Facebook, X and LinkedIn show the "launching soon" toast and don't navigate
- [ ] No prices anywhere on the site
- [ ] No "Est. 1971" wording next to the business name
- [ ] Reviews section is hidden while empty
- [ ] All placeholders are clearly styled and marked with TODO in `content.ts`
- [ ] No overlap or horizontal scroll at any of the listed widths
- [ ] Nav links land with the section heading visible below the sticky header
- [ ] Floating WhatsApp button never covers content
- [ ] Logo is unchanged and looks good on ivory and deep wine backgrounds
- [ ] Page title, meta tags, canonical URL and JSON-LD are present
