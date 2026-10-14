import { defineConfig, type HtmlTagDescriptor, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { contact, seo, site, socials } from "./src/content.ts";

/** Injects the title, meta tags and JSON-LD into index.html from src/content.ts, so SEO copy has one source. */
function seoTags(): Plugin {
  const absolute = (path: string) => `${site.url}${path}`;
  const meta = (attrs: Record<string, string>): HtmlTagDescriptor => ({ tag: "meta", attrs, injectTo: "head" });

  // No price fields here, ever (see CLAUDE.md).
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "FoodEstablishment"],
    "@id": `${site.url}/#business`,
    name: site.name,
    url: site.url,
    description: seo.description,
    slogan: site.taglines.primary,
    image: absolute(seo.ogImage.path),
    logo: absolute(seo.icon),
    telephone: contact.phones.map((phone) => phone.href.replace("tel:", "")),
    email: contact.email.display,
    address: {
      "@type": "PostalAddress",
      streetAddress: contact.address.street,
      addressLocality: `${contact.address.locality}, ${contact.address.city}`,
      addressRegion: contact.address.region,
      postalCode: contact.address.postalCode,
      addressCountry: contact.address.country,
    },
    areaServed: seo.areaServed,
    servesCuisine: seo.servesCuisine,
    sameAs: socials
      .filter((social) => social.status === "live" && social.url?.startsWith("http"))
      .map((social) => social.url),
  };

  return {
    name: "vcs-seo-tags",
    transformIndexHtml: () => [
      { tag: "title", children: seo.title, injectTo: "head" },
      meta({ name: "description", content: seo.description }),
      meta({ name: "theme-color", content: seo.themeColor }),
      { tag: "link", attrs: { rel: "canonical", href: seo.canonical }, injectTo: "head" },
      meta({ property: "og:type", content: "website" }),
      meta({ property: "og:site_name", content: site.name }),
      meta({ property: "og:locale", content: seo.locale }),
      meta({ property: "og:title", content: seo.title }),
      meta({ property: "og:description", content: seo.description }),
      meta({ property: "og:url", content: seo.canonical }),
      meta({ property: "og:image", content: absolute(seo.ogImage.path) }),
      meta({ property: "og:image:width", content: String(seo.ogImage.width) }),
      meta({ property: "og:image:height", content: String(seo.ogImage.height) }),
      meta({ property: "og:image:alt", content: seo.ogImage.alt }),
      meta({ name: "twitter:card", content: "summary_large_image" }),
      meta({ name: "twitter:title", content: seo.title }),
      meta({ name: "twitter:description", content: seo.description }),
      meta({ name: "twitter:image", content: absolute(seo.ogImage.path) }),
      { tag: "script", attrs: { type: "application/ld+json" }, children: JSON.stringify(jsonLd), injectTo: "head" },
    ],
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), seoTags()],
  // strictPort: fail loudly if the port is taken rather than silently moving to another one
  server: { port: 3333, strictPort: true },
  preview: { port: 4444, strictPort: true },
});
