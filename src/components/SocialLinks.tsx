import { socials, type SocialLink } from "../content";
import { FacebookIcon, InstagramIcon, LinkedInIcon, MailIcon, XIcon } from "./icons";

const icons: Record<SocialLink["id"], typeof MailIcon> = {
  instagram: InstagramIcon,
  facebook: FacebookIcon,
  x: XIcon,
  linkedin: LinkedInIcon,
  email: MailIcon,
};

const itemStyle =
  "flex h-11 w-11 items-center justify-center rounded-full border border-gold/60 text-gold-light transition duration-200 hover:-translate-y-0.5 hover:border-ivory hover:bg-ivory hover:text-wine active:scale-95 active:bg-ivory active:text-wine focus-visible:outline-gold-light";

type SocialLinksProps = {
  /** Called with the platform name when a coming-soon icon is activated. */
  onComingSoon: (platform: string) => void;
};

export default function SocialLinks({ onComingSoon }: SocialLinksProps) {
  return (
    <ul className="flex flex-wrap gap-2">
      {socials.map((social) => {
        const Icon = icons[social.id];
        // Flipping status to "live" and adding a url in content.ts is all it takes to make a real link.
        const live = social.status === "live" && social.url;
        return (
          <li key={social.id}>
            {live ? (
              <a
                href={live}
                aria-label={social.label}
                className={itemStyle}
                {...(live.startsWith("mailto:") ? {} : { target: "_blank", rel: "noopener noreferrer" })}
              >
                <Icon className="h-5 w-5" />
              </a>
            ) : (
              <button type="button" aria-label={social.label} onClick={() => onComingSoon(social.label)} className={itemStyle}>
                <Icon className="h-5 w-5" />
              </button>
            )}
          </li>
        );
      })}
    </ul>
  );
}
