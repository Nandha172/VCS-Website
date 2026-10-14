# VCS website — decisions needed

Everything below is waiting on you. Each item says what the site does today, so nothing is blocked: if you don't answer, the current behaviour stays.

Last updated: 13 October 2026

---

## A. Decisions to make

### Brand and content

| # | Decision | What the site does today | Options |
|---|---|---|---|
| A1 | **Deity image and invocations from the business card** ("Sri Ramajayam", "Om Sri Periyanayagi Thunai") | Left out. Only the proprietor name was added. | Keep out · Add the invocation lines (e.g. in the footer) · Add the image too |
| A2 | **Where the proprietor name appears** | "Run by T. Jagannathan Iyengar & Sons" in About, and the name alone in the footer. | Keep · Change the "Run by" label · Show it in more or fewer places |
| A3 | **Section headings I wrote** (the requirements gave none) | Services: "Catering for Every Occasion" · Menus: "Built Around Your Event" · How it works: "From First Message to Final Course" · Gallery: "From Our Events" · FAQ: "Questions, Answered" | Approve, or give your own wording for each |
| A4 | **Contact heading** | Changed from "Planning an Event?" to "Get in Touch", because the required text right below it already starts "Planning an event?". | Keep "Get in Touch" · Restore the original · Other wording |
| A5 | **Menu option descriptions** | Template Menu: "Choose our template menu as-is." · Customise It: "Start from the template and change what you like." · Fully Custom: "Something entirely your own, in any cuisine." | Approve or reword |
| A6 | **Gallery placeholder captions and categories** | I invented 8 captions (wedding hall setup, wedding banana-leaf service, reception buffet, live counter, banana-leaf meal, sweets close-up, tiffin close-up, team at an event) and spread them over the 5 filter tabs. | Approve, or tell me which photos you actually expect to have |
| A7 | **Footer column headings** | "Explore", "Contact", "Address", "Follow". | Approve or reword |
| A7b | **"Still have a question?" prompt under the FAQ** | My wording: "Still have a question?" with an "Ask us on WhatsApp" button, added so visitors never hit a dead end. | Approve or reword |
| A8 | **Meta description (shown in Google results)** | Draft: "Family-run, 100% vegetarian catering in Chennai for weddings, receptions, upanayanams, family functions and corporate events. Any cuisine, menus built to your request. Enquire on WhatsApp." Now live in the page head. | Approve or reword |

### Placeholders and launch

| # | Decision | What the site does today | Options |
|---|---|---|---|
| A9 | **Go live with visible placeholders?** | Every missing item shows a dashed "to be added / coming soon" marker. | Launch as-is · Treat this as a preview and launch only once the items in section B are filled |
| A10 | **Unanswered FAQs** | All 10 questions show; 5 display "Answer to be added". | Keep showing · Hide the unanswered ones until you supply answers (one switch in `content.ts`) |
| A11 | **Full home address in public** | Full street address in the footer; Contact shows only "Korattur, Chennai – 600076". You said "fine for now". | Keep · Show area only everywhere |

### Design

| # | Decision | What the site does today | Options |
|---|---|---|---|
| A12 | **Floating WhatsApp button colour** | Champagne gold with a dark icon, to stay inside the palette. | Keep gold · Use WhatsApp green (more recognisable, but outside the palette) |
| A13 | **Empty space at the bottom of the footer** | About 130px on phones and 110px on larger screens is left empty so the floating button and the "launching soon" message never cover footer links. | Keep · Shrink it and accept that the message briefly overlaps the copyright line |
| A14 | **Header "Get a Quote" button on phones** | Hidden under 640px wide; the floating WhatsApp button does the job. You said "ok for now". | Keep · Drop the tradition line on phones to make room for the button |
| A15 | **Floating WhatsApp button on tablets** | Phones only (under 768px). Tablets use the header button. | Keep · Show on tablets too |
| A16 | **Gallery photo order** | Photos fill down each column, not across rows. | Keep · Switch to left-to-right order (rows become even height, losing the staggered look) |
| A17 | **FAQ behaviour** | Several questions can be open at once. | Keep · Only one open at a time |
| A18 | **Social preview image** (shown when the link is shared on WhatsApp etc.) | Built: the logo centred on ivory (`public/og-image.png`), until a hero photo exists. | Approve · Supply an image |

### Project

| # | Decision | What the site does today | Options |
|---|---|---|---|
| A19 | **Hosting** | None chosen. The build produces static files that work on any host. | Tell me where it will be hosted (Netlify, Vercel, Hostinger, GoDaddy, etc.) so I can add the right config |
| A20 | **Git commit** | Nothing is committed yet. | Say when you want a first commit |

---

## B. Content you need to supply

These are the placeholders on the site. Each is marked `// TODO` in `src/content.ts`.

| # | Item | Notes |
|---|---|---|
| B1 | Hero photo | A free Unsplash banana-leaf meal photo is in place as a stand-in (`public/images/hero.jpg`). Replace it with your own: wide landscape, subject on the right |
| B2 | Gallery photos (8 or more) | With a caption and category for each |
| B3 | Team photo | Portrait (4:5) |
| B4 | Service options | The list under "Service options" in Services |
| B5 | Template menu items | For Breakfast & Tiffin, Lunch / Meals, Snacks, Sweets & Desserts, Live Counters |
| B6 | Menu PDF | Enables the "Download Menu" button |
| B7 | Specific service areas | Shown in About |
| B8 | FAQ answer: How far in advance should I book? | |
| B9 | FAQ answer: Is there a minimum guest count? | |
| B10 | FAQ answer: Can you handle dietary requests? | |
| B11 | FAQ answer: What's included in the service? | |
| B12 | FAQ answer: What are your payment and cancellation terms? | No prices in the answer |
| B13 | FSSAI licence number | |
| B14 | Privacy policy text | The site collects no data itself, so this can be short |
| B15 | Facebook, X and LinkedIn URLs | Each icon becomes a normal link once its URL is added |
| B16 | Google reviews link | Optional |
| B17 | Client reviews | Real ones only: name, event type, text. The section stays hidden until there is at least one |

---

## C. Already decided (for reference)

- "A Tradition Since 1971" is the only 1971 wording, everywhere.
- The primary maroon is `#7C2B2C`: the logo's disc colour (`#8B3031`) made slightly darker. (The exact logo colour looked a little red across large areas; a much deeper `#6B1D24` was too dark.)
- Proprietor name "T. Jagannathan Iyengar & Sons" is shown on the site.
- "Banana-Leaf Service", Upanayanam and Mangala Vaathiyam stay as service names.
- Fonts load from Google Fonts.
