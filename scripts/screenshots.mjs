// Full-page screenshots at every width in the requirements, plus layout and mobile-menu checks.
// Usage: start the dev server (npm run dev), then: npm run screenshots
// Uses the installed Chrome, so no Playwright browser download is needed.
import { mkdir } from "node:fs/promises";
import { chromium } from "playwright";

const BASE_URL = process.env.SITE_URL ?? "http://localhost:3333/";
const OUT_DIR = "screenshots";
const WIDTHS = [360, 375, 414, 768, 1024, 1280, 1440, 1920];
const MOBILE_MAX = 767; // the floating WhatsApp button shows below 768px

const heightFor = (width) => (width < 768 ? 800 : width < 1024 ? 1024 : 900);

let failures = 0;
const check = (ok, message) => {
  if (!ok) failures += 1;
  console.log(`  ${ok ? "ok  " : "FAIL"} ${message}`);
};

await mkdir(OUT_DIR, { recursive: true });
const browser = await chromium.launch({ channel: "chrome" });

for (const width of WIDTHS) {
  console.log(`${width}px`);
  // Reduced motion switches off the scroll-in reveal, which would otherwise leave
  // below-the-fold sections transparent in a full-page capture.
  const context = await browser.newContext({
    viewport: { width, height: heightFor(width) },
    reducedMotion: "reduce",
    deviceScaleFactor: 1,
  });
  const page = await context.newPage();
  await page.goto(BASE_URL, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);

  await page.screenshot({ path: `${OUT_DIR}/${width}.png`, fullPage: true });

  const layout = await page.evaluate(() => {
    const doc = document.documentElement;
    const offenders = [];
    for (const el of document.querySelectorAll("body *")) {
      const rect = el.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) continue;
      if (rect.right > doc.clientWidth + 1 || rect.left < -1) {
        offenders.push(`${el.tagName.toLowerCase()}.${String(el.className).split(" ").slice(0, 3).join(".")}`);
      }
    }
    return { scrollWidth: doc.scrollWidth, clientWidth: doc.clientWidth, offenders: offenders.slice(0, 5) };
  });
  check(layout.scrollWidth <= layout.clientWidth, `no horizontal scroll (${layout.scrollWidth} / ${layout.clientWidth})`);
  check(layout.offenders.length === 0, `nothing outside the viewport ${layout.offenders.join(", ")}`);

  if (width <= MOBILE_MAX) {
    // At the very bottom of the page the floating button must not sit on top of any link or button.
    await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
    await page.waitForTimeout(200);
    await page.screenshot({ path: `${OUT_DIR}/${width}-bottom.png` });
    const covered = await page.evaluate(() => {
      const float = document.querySelector("a.fixed");
      const box = float.getBoundingClientRect();
      const hit = [];
      for (const el of document.querySelectorAll("a, button")) {
        if (el === float) continue;
        const rect = el.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) continue;
        const overlaps = rect.left < box.right && rect.right > box.left && rect.top < box.bottom && rect.bottom > box.top;
        if (overlaps) hit.push(el.textContent.trim().slice(0, 30) || el.getAttribute("aria-label"));
      }
      return hit;
    });
    check(covered.length === 0, `floating WhatsApp button covers no link or button at page bottom ${covered.join(", ")}`);
  }

  await context.close();
}

// Mobile menu at 375px
console.log("mobile menu at 375px");
{
  const context = await browser.newContext({ viewport: { width: 375, height: 800 }, reducedMotion: "reduce" });
  const page = await context.newPage();
  await page.goto(BASE_URL, { waitUntil: "networkidle" });
  const toggle = page.locator("header button[aria-controls]");
  const panel = page.locator("#mobile-menu");

  check(await toggle.isVisible(), "hamburger is visible");
  check(!(await panel.isVisible()), "panel starts closed");

  await toggle.click();
  await page.screenshot({ path: `${OUT_DIR}/375-menu-open.png` });
  check(await panel.isVisible(), "panel opens on tap");
  check((await toggle.getAttribute("aria-expanded")) === "true", "aria-expanded is true");
  const panelBox = await panel.boundingBox();
  check(panelBox.width === 375, `panel is full width (${panelBox.width}px)`);
  check((await page.evaluate(() => document.body.style.overflow)) === "hidden", "background scroll is locked");
  check(await page.evaluate(() => document.querySelector("main").hasAttribute("inert")), "page behind is inert");
  check((await panel.locator("nav a").count()) === 7, "all 7 nav links are listed");

  await page.keyboard.press("Escape");
  check(!(await panel.isVisible()), "Escape closes the panel");
  check(await toggle.evaluate((el) => el === document.activeElement), "focus returns to the hamburger");

  await toggle.click();
  await panel.locator('a[href="#menus"]').click();
  await page.waitForTimeout(600);
  check(!(await panel.isVisible()), "tapping a link closes the panel");
  check((await page.evaluate(() => document.body.style.overflow)) !== "hidden", "background scroll is unlocked");
  const landing = await page.evaluate(() => {
    const header = document.querySelector("header").getBoundingClientRect();
    const heading = document.querySelector("#menus h2").getBoundingClientRect();
    return { headerBottom: Math.round(header.bottom), headingTop: Math.round(heading.top), viewport: window.innerHeight };
  });
  check(
    landing.headingTop >= landing.headerBottom && landing.headingTop < landing.viewport,
    `link lands with the Menus heading visible below the header (heading ${landing.headingTop}px, header ends ${landing.headerBottom}px)`,
  );
  await page.screenshot({ path: `${OUT_DIR}/375-after-menu-link.png` });
  await context.close();
}

await browser.close();
console.log(failures === 0 ? "\nAll checks passed." : `\n${failures} check(s) failed.`);
process.exit(failures === 0 ? 0 : 1);
