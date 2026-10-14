import { trustStrip, trustStripLabel } from "../content";
import Container from "./Container";
import { ClocheIcon, HeritageIcon, LeafIcon, PinIcon } from "./icons";

const icons = {
  leaf: LeafIcon,
  heritage: HeritageIcon,
  menu: ClocheIcon,
  location: PinIcon,
};

export default function TrustStrip() {
  return (
    <section aria-label={trustStripLabel} className="border-b border-ink/10 bg-white">
      <Container>
        {/* gap-px over a tinted background draws hairline dividers in both the 2×2 and 1×4 layouts */}
        <ul className="grid grid-cols-2 gap-px bg-ink/10 lg:grid-cols-4">
          {trustStrip.map((item) => {
            const Icon = icons[item.icon];
            return (
              <li key={item.label} className="flex flex-col items-center gap-3 bg-white px-3 py-9 text-center lg:px-6 lg:py-12">
                <Icon className={`h-8 w-8 ${item.badge ? "text-leaf" : "text-gold-deep"}`} />
                {item.badge ? (
                  <span className="rounded-full bg-leaf px-3 py-1 text-sm font-semibold text-ivory">{item.label}</span>
                ) : (
                  <span className="max-w-[20ch] text-balance text-sm font-medium leading-snug text-ink">{item.label}</span>
                )}
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
