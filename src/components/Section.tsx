import type { ReactNode } from "react";
import Container from "./Container";
import KolamDivider from "./KolamDivider";

type SectionProps = {
  id?: string;
  children: ReactNode;
  className?: string;
  /** Shows the kolam line divider along the top of the section. Use on a few sections only. */
  divider?: boolean;
};

/** Standard page section: vertical rhythm, centred container and scroll-in reveal. scroll-margin-top comes from index.css. */
export default function Section({ id, children, className = "", divider = false }: SectionProps) {
  return (
    <section id={id} className={`relative py-20 md:py-24 lg:py-32 ${className}`}>
      {divider && (
        <KolamDivider className="absolute inset-x-0 top-7 mx-auto w-[min(20rem,70%)] text-gold-deep md:top-9 lg:top-12" />
      )}
      <Container className="reveal">{children}</Container>
    </section>
  );
}
