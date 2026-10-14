// ALL site content lives in this file. Components contain no copy of their own.
// Anything not yet supplied by the business is `null` (or an empty list) and marked // TODO.
// Rules: no prices anywhere · never "Est. 1971" · 100% vegetarian, any cuisine · WhatsApp-only enquiries.

export type SocialLink = {
  id: "instagram" | "facebook" | "x" | "linkedin" | "email";
  label: string;
  status: "live" | "coming_soon";
  url: string | null;
};

export type GalleryCategory = "weddings" | "banana-leaf" | "buffet" | "food" | "team";

export type GalleryItem = {
  /** Image path once a real photo exists; null renders a placeholder. */
  src: string | null;
  alt: string;
  caption: string;
  category: GalleryCategory;
  aspectRatio: string;
};

export type Review = {
  name: string;
  eventType: string;
  text: string;
};

export type ServiceItem = {
  title: string;
  description: string | null;
  /** Renders as the wide call-to-action card; its description becomes the WhatsApp button label. */
  cta?: boolean;
};

export type FaqItem = {
  question: string;
  answer: string | null;
};

// ---------------------------------------------------------------------------
// Business
// ---------------------------------------------------------------------------

export const site = {
  name: "Vedavalli Catering Services",
  shortName: "VCS",
  /** Shown next to the business name everywhere. Never "Est." / "Established". */
  traditionLine: "A Tradition Since 1971",
  proprietor: "T. Jagannathan Iyengar & Sons",
  taglines: {
    primary: "Celebrations Made Complete",
    secondary: "We Plan. We Serve. You Celebrate.",
  },
  url: "https://www.vedavallicateringservices.com",
  domainLabel: "www.vedavallicateringservices.com",
  logoAlt: "Vedavalli Catering Services logo",
};

export const contact = {
  whatsapp: {
    /** Digits only, with country code — used in the wa.me link. */
    number: "919940541996",
    display: "+91 99405 41996",
    label: "WhatsApp",
  },
  phones: [
    { label: "Primary", display: "99405 41996", href: "tel:+919940541996" },
    { label: "Secondary", display: "94442 88727", href: "tel:+919444288727" },
  ],
  email: {
    display: "vedavallicateringservices@gmail.com",
    href: "mailto:vedavallicateringservices@gmail.com",
  },
  address: {
    street: "No 12/A, Gandhi Nagar, Srinivasapuram",
    locality: "Korattur",
    city: "Chennai",
    region: "Tamil Nadu",
    postalCode: "600076",
    country: "IN",
    full: "No 12/A, Gandhi Nagar, Srinivasapuram, Korattur, Chennai – 600076",
    area: "Korattur, Chennai – 600076",
  },
};

/** Pre-filled "Get a Quote" WhatsApp message. URL-encoded by whatsappLink(). */
export const whatsappMessage = `Hi Vedavalli Catering, I'd like a quote for my event.
Event type:
Date:
Venue/area:
Approx. guest count:
Menu preference:`;

export const socials: SocialLink[] = [
  {
    id: "instagram",
    label: "Instagram",
    status: "live",
    url: "https://instagram.com/vedavalli_catering_services",
  },
  { id: "facebook", label: "Facebook", status: "coming_soon", url: null }, // TODO: Facebook page URL
  { id: "x", label: "X", status: "coming_soon", url: null }, // TODO: X profile URL
  { id: "linkedin", label: "LinkedIn", status: "coming_soon", url: null }, // TODO: LinkedIn page URL
  { id: "email", label: "Email", status: "live", url: "mailto:vedavallicateringservices@gmail.com" },
];

/** "Coming soon" toast: `${before}${platform}${middle}<Instagram link>${after}` */
export const comingSoonToast = {
  before: "Our ",
  middle: " page is launching soon. Follow us on ",
  linkLabel: "Instagram",
  after: " for updates.",
  closeLabel: "Dismiss message",
};

// ---------------------------------------------------------------------------
// Shared labels
// ---------------------------------------------------------------------------

export const cta = {
  quote: "Get a Quote",
  call: "Call Us",
  whatsapp: "Message us on WhatsApp",
  floatingWhatsappLabel: "Get a quote on WhatsApp",
};

export const nav = {
  links: [
    { label: "Home", href: "#home" },
    { label: "Services", href: "#services" },
    { label: "Menus", href: "#menus" },
    { label: "Gallery", href: "#gallery" },
    { label: "About", href: "#about" },
    { label: "FAQ", href: "#faq" },
    { label: "Contact", href: "#contact" },
  ],
  label: "Main navigation",
  mobileLabel: "Mobile navigation",
  skipLabel: "Skip to content",
  openMenuLabel: "Open menu",
  closeMenuLabel: "Close menu",
};

// ---------------------------------------------------------------------------
// Sections
// ---------------------------------------------------------------------------

export const hero = {
  eyebrow: site.traditionLine,
  headline: "Pure Vegetarian Catering for Memorable Occasions",
  subtext:
    "Weddings, receptions, upanayanams, family functions and corporate events across Chennai — with menus built around what you want to serve.",
  image: {
    // Stand-in until our own event photo is taken: a free Unsplash photo (Unsplash Licence, no credit required),
    // https://unsplash.com/photos/traditional-south-indian-meal-on-leaf-yCIcDyKm440
    // TODO: replace public/images/hero.jpg with our own photo, then update alt and position to match it.
    src: "/images/hero.jpg" as string | null,
    alt: "A vegetarian meal served on a banana leaf",
    /** Which part of the photo stays in view when it is cropped (CSS object-position). */
    position: "50% 55%",
    placeholderCaption: "Hero photo coming soon",
  },
};

export const trustStripLabel = "Highlights";

export const trustStrip = [
  { icon: "leaf", label: "100% Vegetarian", badge: true },
  { icon: "heritage", label: "A Tradition Since 1971", badge: false },
  { icon: "menu", label: "Any cuisine, menus built to your request", badge: false },
  { icon: "location", label: "Serving Chennai and nearby areas", badge: false },
] as const;

export const services = {
  eyebrow: "Our Services",
  title: "Catering for Every Occasion",
  items: [
    { title: "Weddings & Muhurtham", description: "Traditional-style service" },
    { title: "Receptions", description: "Buffet with live counters" },
    { title: "Engagements & family functions", description: null },
    { title: "Upanayanam & religious ceremonies", description: null },
    { title: "Birthdays & celebrations", description: null },
    { title: "Corporate events", description: null },
    { title: "Any other function", description: "Tell us about your event", cta: true },
  ] as ServiceItem[],
  alsoArranged: {
    label: "Also arranged by us",
    items: ["Event Photography", "Mangala Vaathiyam"],
  },
  serviceOptions: {
    label: "Service options",
    items: [] as string[], // TODO: service options
    placeholder: "Service options — to be confirmed",
  },
};

export const menus = {
  eyebrow: "Menus",
  title: "Built Around Your Event",
  intro:
    "Every menu is built around your event. Choose our template menu as-is, customise it, or use it as a starting point for something entirely your own, in any cuisine, always 100% vegetarian.",
  approaches: [
    { title: "Template Menu", description: "Choose our template menu as‑is." },
    { title: "Customise It", description: "Start from the template and change what you like." },
    { title: "Fully Custom", description: "Something entirely your own, in any cuisine." },
  ],
  templateTitle: "Template menu",
  categories: [
    { title: "Breakfast & Tiffin", items: [] as string[] }, // TODO: menu items
    { title: "Lunch / Meals", items: [] as string[] }, // TODO: menu items
    { title: "Snacks", items: [] as string[] }, // TODO: menu items
    { title: "Sweets & Desserts", items: [] as string[] }, // TODO: menu items
    { title: "Live Counters", items: [] as string[] }, // TODO: menu items
  ],
  itemsPlaceholder: "Menu items coming soon",
  note: "Menus may vary by event, season and availability.",
  discussLabel: "Discuss Your Menu",
  download: {
    label: "Download Menu",
    url: null as string | null, // TODO: menu PDF
    comingSoonLabel: "Coming soon",
  },
};

export const howItWorks = {
  eyebrow: "How It Works",
  title: "From First Message to Final Course",
  steps: [
    "Message us on WhatsApp with your event date, venue and guest count.",
    "We discuss your menu and service requirements.",
    "You receive a quote and confirm the booking.",
    "Our team cooks fresh and serves your event as agreed.",
  ],
};

export const gallery = {
  eyebrow: "Gallery",
  title: "From Our Events",
  filters: [
    { id: "all", label: "All" },
    { id: "weddings", label: "Weddings" },
    { id: "banana-leaf", label: "Banana-Leaf Service" },
    { id: "buffet", label: "Buffet & Live Counters" },
    { id: "food", label: "Food Close-ups" },
    { id: "team", label: "Team" },
  ] as const,
  items: [
    // TODO: replace every `src: null` with a real photo (8 placeholders) and write its `alt` text.
    // If `alt` is left empty the caption is used instead.
    { src: null, alt: "", caption: "Photo coming soon — Wedding hall setup", category: "weddings", aspectRatio: "4 / 5" }, // TODO
    { src: null, alt: "", caption: "Photo coming soon — Wedding banana-leaf service", category: "banana-leaf", aspectRatio: "4 / 3" }, // TODO
    { src: null, alt: "", caption: "Photo coming soon — Reception buffet", category: "buffet", aspectRatio: "1 / 1" }, // TODO
    { src: null, alt: "", caption: "Photo coming soon — Live counter", category: "buffet", aspectRatio: "4 / 5" }, // TODO
    { src: null, alt: "", caption: "Photo coming soon — Banana-leaf meal", category: "banana-leaf", aspectRatio: "1 / 1" }, // TODO
    { src: null, alt: "", caption: "Photo coming soon — Sweets close-up", category: "food", aspectRatio: "4 / 3" }, // TODO
    { src: null, alt: "", caption: "Photo coming soon — Tiffin close-up", category: "food", aspectRatio: "4 / 5" }, // TODO
    { src: null, alt: "", caption: "Photo coming soon — Our team at an event", category: "team", aspectRatio: "4 / 3" }, // TODO
  ] as GalleryItem[],
  /** `${before}<Instagram link>${after}` */
  moreLine: {
    before: "More photos from our recent events coming soon. Follow us on ",
    linkLabel: "Instagram",
    after: ".",
  },
  lightbox: { closeLabel: "Close photo", previousLabel: "Previous photo", nextLabel: "Next photo" },
};

export const reviews = {
  eyebrow: "Reviews",
  title: "What Our Clients Say",
  /** Genuine reviews only. The section is hidden while this is empty. */
  items: [] as Review[], // TODO: real client reviews
  googleReviews: {
    label: "See our Google reviews",
    url: null as string | null, // TODO: Google reviews link
  },
};

export const about = {
  eyebrow: "About Us",
  title: "A Family Tradition of Serving",
  text: "Our family has been catering celebrations since 1971. The name has changed over the years, but the care hasn't: fresh, 100% vegetarian food, cooked in our own kitchen and served the way your family wants it. Today, as Vedavalli Catering Services, we plan, cook and serve every event ourselves, from intimate family functions to full weddings.",
  proprietorLabel: "Run by",
  values: ["Freshly cooked", "Hygienic preparation", "On-time service", "Warm hospitality"],
  teamPhoto: {
    src: null as string | null, // TODO: team photo
    alt: "", // TODO: describe the team photo when it is added
    placeholderCaption: "Photo coming soon — Our team",
    aspectRatio: "4 / 5",
  },
  serviceAreas: {
    label: "Service areas",
    summary: "Korattur and across Chennai",
    areas: [] as string[], // TODO: specific service areas
    placeholder: "Specific areas — to be added",
  },
};

export const faq = {
  eyebrow: "FAQ",
  title: "Questions, Answered",
  placeholderAnswer: "Answer to be added",
  /** Shown under the questions so nobody hits a dead end. */
  stillAsking: { text: "Still have a question?", button: "Ask us on WhatsApp" },
  /** Set to true to hide questions that have no answer yet. */
  hideUnanswered: false,
  items: [
    {
      question: "What types of events do you cater?",
      answer:
        "Weddings, receptions, engagements, upanayanams, birthdays, corporate events and any other family function.",
    },
    {
      question: "Do you only serve South Indian food?",
      answer: "No. We're 100% vegetarian and cook any cuisine, built to your request.",
    },
    {
      question: "What areas do you serve?",
      answer: "Chennai and nearby areas. Message us with your venue to confirm.",
    },
    { question: "How far in advance should I book?", answer: null }, // TODO
    { question: "Is there a minimum guest count?", answer: null }, // TODO
    {
      question: "Can menus be customised?",
      answer: "Yes. Use our template menu as-is, customise it, or build a fully custom menu.",
    },
    { question: "Can you handle dietary requests?", answer: null }, // TODO
    { question: "What's included in the service?", answer: null }, // TODO
    {
      question: "How do I get a quote?",
      answer:
        "Message us on WhatsApp with your event date, venue, guest count and menu idea. We'll reply with a quote.",
    },
    { question: "What are your payment and cancellation terms?", answer: null }, // TODO
  ] as FaqItem[],
};

export const contactSection = {
  eyebrow: "Contact",
  title: "Get in Touch",
  text: "Planning an event? Tell us about it — we'll get back with availability and a quote.",
  phoneLabel: "Call",
  emailLabel: "Email",
  areaLabel: "Area",
};

export const footer = {
  blurb: "100% vegetarian catering and event services in Chennai. We Plan. We Serve. You Celebrate.",
  linksTitle: "Explore",
  contactTitle: "Contact",
  followTitle: "Follow",
  addressTitle: "Address",
  fssai: {
    label: "FSSAI Lic. No:",
    number: null as string | null, // TODO: FSSAI licence number
    placeholder: "FSSAI number — to be added",
  },
  privacy: {
    label: "Privacy Policy",
    title: "Privacy Policy",
    body: null as string | null, // TODO: privacy policy text
    placeholder: "Privacy policy text — to be added",
    closeLabel: "Close privacy policy",
  },
  copyrightName: site.name,
};

// ---------------------------------------------------------------------------
// SEO
// ---------------------------------------------------------------------------

export const seo = {
  title: "Vedavalli Catering Services | Pure Vegetarian Catering in Chennai",
  description:
    "Family-run, 100% vegetarian catering in Chennai for weddings, receptions, upanayanams, family functions and corporate events. Any cuisine, menus built to your request. Enquire on WhatsApp.",
  canonical: site.url,
  servesCuisine: "Vegetarian",
  locale: "en_IN",
  /** Paths are relative to the site root (files live in /public). */
  ogImage: { path: "/og-image.png", width: 1200, height: 630, alt: "Vedavalli Catering Services logo" },
  icon: "/favicon-192.png",
  areaServed: "Chennai",
  themeColor: "#FAF7F2",
};
