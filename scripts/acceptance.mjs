// Acceptance checklist (section 10 of docs/VCS-Website-Requirements.md), verified in a real browser.
// Usage: start the site (npm run dev, or npm run build && npm run preview), then: npm run acceptance
// Item 9 (no overlap or horizontal scroll at each width) is covered by: npm run screenshots
import { readFile } from "node:fs/promises";
import { chromium } from "playwright";

const BASE_URL = process.env.SITE_URL ?? "http://localhost:3333/";
const WHATSAPP_MESSAGE = `Hi Vedavalli Catering, I'd like a quote for my event.
Event type:
Date:
Venue/area:
Approx. guest count:
Menu preference:`;
const WHATSAPP_URL = `https://wa.me/919940541996?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
// Short phone (iPhone SE height) so "heading visible after a nav tap" is tested on the tightest screen.
const MOBILE = { width: 375, height: 667 };
const INSTAGRAM_URL = "https://instagram.com/vedavalli_catering_services";
const CANONICAL = "https://www.vedavallicateringservices.com";

const results = [];
let current;
const item = (title) => {
  current = { title, checks: [] };
  results.push(current);
};
const check = (ok, message) => current.checks.push({ ok: Boolean(ok), message });

const browser = await chromium.launch({ channel: "chrome" });
const open = async (width, height) => {
  const context = await browser.newContext({ viewport: { width, height }, reducedMotion: "reduce" });
  const page = await context.newPage();
  await page.goto(BASE_URL, { waitUntil: "networkidle" });
  return { context, page };
};

const desktop = await open(1280, 900);
const mobile = await open(MOBILE.width, MOBILE.height);

// 1 ─ WhatsApp buttons
item("1. Every Get a Quote / WhatsApp button opens WhatsApp with the pre-filled message");
for (const [name, { page }] of [["desktop", desktop], ["mobile", mobile]]) {
  const links = await page.$$eval('a[href*="wa.me"], a[href*="whatsapp"]', (els) =>
    els.map((el) => ({ href: el.href, label: (el.textContent.trim() || el.getAttribute("aria-label")).slice(0, 40), target: el.target })),
  );
  check(links.length >= 7, `${name}: ${links.length} WhatsApp links found`);
  // Compare the decoded message: browsers re-encode the apostrophe (%27) when serialising the href.
  const wrong = links.filter((link) => {
    const url = new URL(link.href);
    return url.origin + url.pathname !== "https://wa.me/919940541996" || url.searchParams.get("text") !== WHATSAPP_MESSAGE;
  });
  check(wrong.length === 0, `${name}: all use the exact pre-filled message ${wrong.map((link) => link.label).join(", ")}`);
  check(links.every((link) => link.target === "_blank"), `${name}: all open in a new tab`);
  // Every CTA with WhatsApp wording must be one of those links, not a dead button.
  const labels = ["Get a Quote", "Discuss Your Menu", "Message us on WhatsApp", "Tell us about your event"];
  const stray = await page.evaluate((labels) => {
    const bad = [];
    for (const el of document.querySelectorAll("a, button")) {
      const text = el.textContent.trim();
      if (labels.includes(text) && !(el.tagName === "A" && el.href.includes("wa.me"))) bad.push(text);
    }
    return bad;
  }, labels);
  check(stray.length === 0, `${name}: every quote/WhatsApp CTA is a WhatsApp link ${stray.join(", ")}`);
}
check(
  decodeURIComponent(WHATSAPP_URL.split("text=")[1]) === WHATSAPP_MESSAGE,
  "message decodes back to the exact text in the requirements, line breaks included",
);

// 2 ─ Phone and email
item("2. Phone numbers dial on mobile; email opens the mail app");
{
  const { page } = mobile;
  const tels = await page.$$eval('a[href^="tel:"]', (els) => els.map((el) => el.getAttribute("href")));
  check(tels.includes("tel:+919940541996"), "primary number links to tel:+919940541996");
  check(tels.includes("tel:+919444288727"), "secondary number links to tel:+919444288727");
  check(tels.every((href) => /^tel:\+91\d{10}$/.test(href)), `all ${tels.length} tel: links are valid`);
  const visibleNumbers = await page.evaluate(() => {
    const loose = [];
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) {
      const node = walker.currentNode;
      if (/\b9\d{4} ?\d{5}\b/.test(node.textContent) && !node.parentElement.closest("a") && !node.parentElement.closest("script")) {
        loose.push(node.textContent.trim());
      }
    }
    return loose;
  });
  // The number under the Contact WhatsApp button is a caption for that button, not a separate phone entry.
  check(visibleNumbers.length <= 1, `phone numbers shown as text are links (unlinked: ${visibleNumbers.join(" | ") || "none"})`);
  const mails = await page.$$eval('a[href^="mailto:"]', (els) => els.map((el) => el.getAttribute("href")));
  check(mails.length >= 2 && mails.every((href) => href === "mailto:vedavallicateringservices@gmail.com"), `${mails.length} mailto: links, all correct`);
}

// 3 ─ Instagram
item("3. Instagram opens in a new tab");
{
  const { page } = desktop;
  const links = await page.$$eval('a[href*="instagram.com"]', (els) => els.map((el) => ({ href: el.href, target: el.target, rel: el.rel })));
  check(links.length >= 2, `${links.length} Instagram links on the page (footer icon, gallery line)`);
  check(links.every((link) => link.href === "https://instagram.com/vedavalli_catering_services"), "all point at the VCS profile");
  check(links.every((link) => link.target === "_blank" && link.rel.includes("noopener")), 'all have target="_blank" and rel="noopener"');
  const [popup] = await Promise.all([
    desktop.context.waitForEvent("page"),
    page.locator('footer a[aria-label="Instagram"]').click(),
  ]);
  check(popup !== page, "clicking the footer icon opens a new tab");
  check(page.url() === BASE_URL, "the site tab stays where it is");
  await popup.close();
}

// 4 ─ Coming-soon socials
item('4. Facebook, X and LinkedIn show the "launching soon" toast and don\'t navigate');
{
  const { page, context } = desktop;
  const toast = page.locator('[role="status"]');
  for (const platform of ["Facebook", "X", "LinkedIn"]) {
    const pagesBefore = context.pages().length;
    const icon = page.locator(`footer [aria-label="${platform}"]`);
    check((await icon.evaluate((el) => el.tagName)) === "BUTTON", `${platform}: is a button, not a link`);
    await icon.click();
    const text = (await toast.textContent()).trim();
    check(
      text === `Our ${platform} page is launching soon. Follow us on Instagram for updates.`,
      `${platform}: toast reads "${text}"`,
    );
    check(page.url() === BASE_URL && context.pages().length === pagesBefore, `${platform}: no navigation, no new tab`);
    const link = toast.locator("a");
    check((await link.getAttribute("href")) === INSTAGRAM_URL && (await link.textContent()) === "Instagram", `${platform}: "Instagram" in the toast links to the profile`);
    await toast.locator("button").click();
    check((await toast.textContent()).trim() === "", `${platform}: close button dismisses it`);
  }
  check((await toast.getAttribute("aria-live")) === "polite", "toast is a polite live region (announced to screen readers)");
  await page.locator('footer [aria-label="Facebook"]').click();
  await page.waitForTimeout(3500);
  check((await toast.textContent()).trim() !== "", "toast is still showing at 3.5 seconds");
  await page.waitForTimeout(900);
  check((await toast.textContent()).trim() === "", "toast auto-dismisses after 4 seconds");
}

// 5 ─ No prices
item("5. No prices anywhere on the site");
{
  const pricePattern = /₹|\bRs\.?\s?\d|\bINR\b|\$\s?\d|\bprice|\bpricing|\bper plate|\bper head|\bstarting (from|at)\b|\bdiscount|\boffer\b|\brates?\b/i;
  const text = await desktop.page.evaluate(() => document.body.innerText);
  const html = await desktop.page.content();
  const hits = text.split("\n").filter((line) => pricePattern.test(line));
  check(hits.length === 0, `visible text has no price wording ${hits.join(" | ")}`);
  const head = html.slice(0, html.indexOf("</head>"));
  check(!pricePattern.test(head.replace(/<style[\s\S]*?<\/style>/g, "")), "head tags and JSON-LD have no price wording or priceRange");
  // FAQ answers and the privacy modal are hidden until opened, so read them too.
  const hidden = await desktop.page.evaluate(() => [...document.querySelectorAll("[hidden]")].map((el) => el.textContent).join("\n"));
  check(!pricePattern.test(hidden), "collapsed FAQ answers have no price wording");
  const content = await readFile("src/content.ts", "utf8");
  const contentHits = content.split("\n").filter((line) => pricePattern.test(line) && !/no prices|No price|Rules:/.test(line));
  check(contentHits.length === 0, `src/content.ts has no price wording ${contentHits.join(" | ")}`);
}

// 6 ─ No "Est. 1971"
item('6. No "Est. 1971" wording next to the business name');
{
  const text = await desktop.page.evaluate(() => document.body.innerText + "\n" + document.head.innerHTML);
  check(!/\bEst\b\.?|\bEstd\b|Established|Founded/i.test(text), 'no "Est.", "Established" or "Founded" anywhere');
  const mentions = text.split("\n").filter((line) => line.includes("1971")).map((line) => line.trim());
  const allowed = mentions.every((line) => /A Tradition Since 1971/i.test(line) || /catering celebrations since 1971/.test(line));
  check(allowed, `every 1971 mention is "A Tradition Since 1971" or the About sentence (${mentions.length} mentions)`);
  const lockups = await desktop.page.$$eval("header a[href='#home']:has(img), footer", (els) => els.map((el) => el.innerText.replace(/\s+/g, " ")));
  check(lockups.every((value) => /Vedavalli Catering Services A TRADITION SINCE 1971/i.test(value)), "header and footer lockups show the name with A Tradition Since 1971");
}

// 7 ─ Reviews hidden
item("7. Reviews section is hidden while empty");
{
  const content = await readFile("src/content.ts", "utf8");
  check(/items: \[\] as Review\[\]/.test(content), "reviews array in content.ts is empty");
  const text = await desktop.page.evaluate(() => document.body.innerText);
  check(!/What Our Clients Say|REVIEWS|Google reviews/i.test(text), "no Reviews heading, eyebrow or Google link on the page");
  const sections = await desktop.page.$$eval("main > section", (els) => els.length);
  check(sections === 9, `main has 9 sections, i.e. everything except Reviews (found ${sections})`);
}

// 8 ─ Placeholders
item("8. All placeholders are clearly styled and marked with TODO in content.ts");
{
  const { page } = desktop;
  // Open everything that hides placeholders.
  for (const button of await page.locator("#faq button").all()) await button.click();
  await page.getByRole("button", { name: "Privacy Policy" }).click();
  const found = await page.evaluate(() => {
    const out = [];
    for (const el of document.querySelectorAll("*")) {
      const style = getComputedStyle(el);
      if (style.borderTopStyle === "dashed" && el.getBoundingClientRect().width > 0) {
        out.push({ text: (el.getAttribute("aria-label") ?? el.textContent).trim(), italic: getComputedStyle(el.querySelector("span") ?? el).fontStyle === "italic" });
      }
    }
    return out;
  });
  await page.keyboard.press("Escape");
  const texts = found.map((entry) => entry.text);
  const expected = [
    // The hero uses a stand-in photo for now, so it has no placeholder.
    ["Hero photo", (t) => t === "Hero photo coming soon", 0],
    ["Gallery photos", (t) => t.startsWith("Photo coming soon —") && t !== "Photo coming soon — Our team", 8],
    ["Team photo", (t) => t === "Photo coming soon — Our team", 1],
    ["Service options", (t) => t === "Service options — to be confirmed", 1],
    ["Template menu items", (t) => t === "Menu items coming soon", 5],
    ["Menu PDF", (t) => t === "Coming soon", 1],
    ["Specific service areas", (t) => t === "Specific areas — to be added", 1],
    ["FAQ answers", (t) => t === "Answer to be added", 5],
    ["FSSAI number", (t) => t === "FSSAI number — to be added", 1],
    ["Privacy policy text", (t) => t === "Privacy policy text — to be added", 1],
  ];
  for (const [name, match, count] of expected) {
    const actual = texts.filter(match).length;
    check(actual === count, `${name}: ${actual} of ${count} shown with the dashed placeholder style`);
  }
  check(found.every((entry) => entry.italic), "every placeholder label is italic");
  const content = (await readFile("src/content.ts", "utf8")).split("\n");
  const missing = content.filter((line) => {
    const empty = /: null[, ]|: null$|null as string \| null|\[\] as (string|Review)\[\]|src: null/.test(line);
    // A service card with no sub-line is complete as written in the requirements, not a placeholder.
    if (/description: null/.test(line)) return false;
    return empty && !line.includes("TODO") && !line.trim().startsWith("/**") && !line.trim().startsWith("//");
  });
  check(missing.length === 0, `every empty value in content.ts has a // TODO (${missing.map((l) => l.trim()).join(" | ") || "none missing"})`);
  check(content.filter((line) => line.includes("TODO")).length >= 25, `content.ts has ${content.filter((line) => line.includes("TODO")).length} TODO markers`);
}

// 9 ─ horizontal scroll here; the visual overlap review uses the screenshots from npm run screenshots
item("9. No overlap or horizontal scroll at any of the listed widths");
{
  for (const width of [360, 375, 414, 768, 1024, 1280, 1440, 1920]) {
    const { context, page } = await open(width, 900);
    const sizes = await page.evaluate(() => ({ s: document.documentElement.scrollWidth, c: document.documentElement.clientWidth }));
    check(sizes.s <= sizes.c, `${width}px: no horizontal scroll (${sizes.s} / ${sizes.c})`);
    await context.close();
  }
}

// 10 ─ Nav landings
item("10. Nav links land with the section heading visible below the sticky header");
{
  const targets = ["#services", "#menus", "#gallery", "#about", "#faq", "#contact"];
  for (const [name, { page }] of [["desktop", desktop], ["mobile", mobile]]) {
    const isMobile = name === "mobile";
    for (const target of targets) {
      if (isMobile) {
        await page.locator("header button[aria-controls]").click();
        await page.locator(`#mobile-menu a[href="${target}"]`).click();
      } else {
        await page.locator(`header nav a[href="${target}"]`).first().click();
      }
      await page.waitForTimeout(350);
      const pos = await page.evaluate((target) => {
        const header = document.querySelector("header").getBoundingClientRect();
        const section = document.querySelector(target);
        const heading = section.querySelector("h2").getBoundingClientRect();
        const eyebrow = section.querySelector("p").getBoundingClientRect();
        return { headerBottom: header.bottom, top: Math.min(heading.top, eyebrow.top), bottom: heading.bottom, viewport: innerHeight };
      }, target);
      check(
        pos.top >= pos.headerBottom && pos.bottom <= pos.viewport,
        `${name} ${target}: heading at ${Math.round(pos.top)}px, header ends at ${Math.round(pos.headerBottom)}px`,
      );
    }
    if (isMobile) {
      await page.locator("header button[aria-controls]").click();
      await page.locator('#mobile-menu a[href="#home"]').click();
    } else {
      await page.locator('header nav a[href="#home"]').first().click();
    }
    await page.waitForTimeout(350);
    check((await page.evaluate(() => scrollY)) === 0, `${name} #home: returns to the top of the page`);
  }
}

// 11 ─ Floating WhatsApp
item("11. Floating WhatsApp button never covers content");
{
  const float = 'a[aria-label="Get a quote on WhatsApp"]';
  check(!(await desktop.page.locator(float).isVisible()), "hidden on desktop (1280px)");
  const { page } = mobile;
  check(await page.locator(float).isVisible(), "visible on mobile (375px)");
  const fixed = await page.locator(float).evaluate((el) => getComputedStyle(el).position);
  check(fixed === "fixed", "fixed to the viewport, so visible at every scroll position");
  await page.evaluate(() => scrollTo(0, document.documentElement.scrollHeight));
  await page.waitForTimeout(200);
  const atBottom = await page.evaluate((selector) => {
    const box = document.querySelector(selector).getBoundingClientRect();
    const hit = [];
    for (const el of document.querySelectorAll("a, button, footer p, footer address, footer li")) {
      if (el.matches(selector)) continue;
      const rect = el.getBoundingClientRect();
      if (!rect.width || !rect.height) continue;
      if (rect.left < box.right && rect.right > box.left && rect.top < box.bottom && rect.bottom > box.top) hit.push(el.textContent.trim().slice(0, 30));
    }
    const footer = document.querySelector("footer").getBoundingClientRect();
    return { hit, insideFooter: box.top > footer.top && box.bottom <= footer.bottom + 1 };
  }, float);
  check(atBottom.hit.length === 0, `at the page bottom it overlaps no link, button or footer text ${atBottom.hit.join(", ")}`);
  check(atBottom.insideFooter, "at the page bottom it sits in the footer's reserved empty space");
  await page.evaluate(() => scrollTo(0, 0));
  await page.locator("header button[aria-controls]").click();
  const underMenu = await page.evaluate((selector) => {
    const box = document.querySelector(selector).getBoundingClientRect();
    const top = document.elementFromPoint(box.left + box.width / 2, box.top + box.height / 2);
    return !top.closest(selector);
  }, float);
  check(underMenu, "sits underneath the open mobile menu, not on top of its buttons");
  await page.keyboard.press("Escape");
  await page.evaluate(() => scrollTo(0, document.documentElement.scrollHeight));
  await page.locator('footer [aria-label="LinkedIn"]').click();
  await page.waitForTimeout(300);
  const whileToast = await page.locator(float).evaluate((el) => getComputedStyle(el).opacity);
  check(whileToast === "0", "hides while the toast is showing, so the two never overlap");
}

// 12 ─ Logo
item("12. Logo is unchanged and looks good on ivory and deep wine backgrounds");
{
  const { page } = desktop;
  const logos = await page.$$eval('img[alt="Vedavalli Catering Services logo"]', (imgs) =>
    imgs.map((img) => {
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      const px = (x, y) => [...ctx.getImageData(Math.round(x * canvas.width), Math.round(y * canvas.height), 1, 1).data];
      const style = getComputedStyle(img);
      return {
        where: img.closest("header") ? "header" : "footer",
        natural: `${img.naturalWidth}x${img.naturalHeight}`,
        disc: px(0.35, 0.5),
        corner: px(0.01, 0.01),
        square: Math.abs(img.getBoundingClientRect().width - img.getBoundingClientRect().height) < 0.5,
        filter: style.filter,
        opacity: style.opacity,
        blend: style.mixBlendMode,
      };
    }),
  );
  check(logos.length === 2, "logo appears in the header (ivory) and the footer (wine)");
  for (const logo of logos) {
    const [r, g, b] = logo.disc;
    check(Math.abs(r - 0x8b) <= 3 && Math.abs(g - 0x30) <= 3 && Math.abs(b - 0x31) <= 3, `${logo.where}: disc colour is still the original #8B3031 (rgb ${r},${g},${b})`);
    check(logo.corner[3] === 0, `${logo.where}: background outside the ring is still transparent`);
    check(logo.square && logo.natural === "192x192", `${logo.where}: drawn square from the ${logo.natural} resized copy, not stretched`);
    check(logo.filter === "none" && logo.opacity === "1" && logo.blend === "normal", `${logo.where}: no CSS filter, opacity or blend applied`);
  }
}

// 13 ─ SEO
item("13. Page title, meta tags, canonical URL and JSON-LD are present");
{
  const { page } = desktop;
  check((await page.title()) === "Vedavalli Catering Services | Pure Vegetarian Catering in Chennai", `title: "${await page.title()}"`);
  const head = await page.evaluate(() => {
    const get = (selector, attr = "content") => document.querySelector(selector)?.getAttribute(attr) ?? null;
    return {
      description: get('meta[name="description"]'),
      canonical: get('link[rel="canonical"]', "href"),
      ogTitle: get('meta[property="og:title"]'),
      ogDescription: get('meta[property="og:description"]'),
      ogUrl: get('meta[property="og:url"]'),
      ogImage: get('meta[property="og:image"]'),
      ogType: get('meta[property="og:type"]'),
      icon: get('link[rel="icon"]', "href"),
      titles: document.querySelectorAll("title").length,
      jsonLd: [...document.querySelectorAll('script[type="application/ld+json"]')].map((el) => el.textContent),
    };
  });
  check(head.titles === 1, "exactly one <title>");
  check(head.description && head.description.length >= 70 && head.description.length <= 200, `meta description present (${head.description?.length} characters)`);
  check(head.canonical === CANONICAL, `canonical: ${head.canonical}`);
  check(head.ogTitle && head.ogDescription && head.ogType === "website" && head.ogUrl === CANONICAL, "Open Graph title, description, type and url present");
  check(head.ogImage === `${CANONICAL}/og-image.png`, `og:image: ${head.ogImage}`);
  for (const path of ["og-image.png", "favicon-32.png", "favicon-192.png", "apple-touch-icon.png"]) {
    const response = await page.request.get(new URL(path, BASE_URL).href);
    check(response.ok() && response.headers()["content-type"]?.includes("image/png"), `/${path} is served`);
  }
  check(head.jsonLd.length === 1, "one JSON-LD block");
  const data = JSON.parse(head.jsonLd[0]);
  check([].concat(data["@type"]).includes("LocalBusiness") && [].concat(data["@type"]).includes("FoodEstablishment"), "JSON-LD type is LocalBusiness + FoodEstablishment");
  check(data.name === "Vedavalli Catering Services" && data.url === CANONICAL, "JSON-LD name and url");
  check(data.address?.streetAddress && data.address.postalCode === "600076" && data.address.addressCountry === "IN", "JSON-LD address");
  check([].concat(data.telephone).includes("+919940541996") && data.email === "vedavallicateringservices@gmail.com", "JSON-LD phone and email");
  check(data.servesCuisine === "Vegetarian", 'JSON-LD servesCuisine is "Vegetarian"');
  check(!("priceRange" in data), "JSON-LD has no priceRange");
}

await browser.close();

let failed = 0;
for (const result of results) {
  const bad = result.checks.filter((entry) => !entry.ok);
  failed += bad.length;
  console.log(`\n${bad.length === 0 ? "PASS" : "FAIL"}  ${result.title}`);
  for (const entry of result.checks) console.log(`      ${entry.ok ? "ok  " : "FAIL"} ${entry.message}`);
}
console.log(failed === 0 ? `\nAll ${results.length} checklist items pass.` : `\n${failed} check(s) failed.`);
process.exit(failed === 0 ? 0 : 1);
