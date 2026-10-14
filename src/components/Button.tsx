import type { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  variant?: "gold" | "outline";
  size?: "md" | "sm";
  /** Use on wine or photo backgrounds so the outline variant stays legible. */
  onDark?: boolean;
  /** Renders a link when set, otherwise a button. */
  href?: string;
  newTab?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  ariaLabel?: string;
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-control font-semibold tracking-wide whitespace-nowrap transition duration-200 ease-out";

const sizes = {
  md: "min-h-12 px-6 py-3 text-[0.9375rem]",
  sm: "min-h-11 px-5 py-2 text-sm",
};

const variants = {
  gold: "bg-gold text-ink shadow-card active:scale-[0.97] hover:-translate-y-0.5 hover:bg-gold-deep hover:shadow-lift active:translate-y-0 active:bg-gold-deep",
  outline: "border border-wine text-wine active:scale-[0.97] hover:bg-wine hover:text-ivory active:bg-wine active:text-ivory",
  outlineOnDark: "border border-ivory/70 text-ivory active:scale-[0.97] hover:bg-ivory hover:text-wine active:bg-ivory active:text-wine",
};

const disabledStyle = "cursor-not-allowed border border-ink/15 bg-sand text-ink-muted";

export default function Button({
  children,
  variant = "gold",
  size = "md",
  onDark = false,
  href,
  newTab = false,
  disabled = false,
  onClick,
  className = "",
  ariaLabel,
}: ButtonProps) {
  const style = disabled ? disabledStyle : variants[variant === "outline" && onDark ? "outlineOnDark" : variant];
  const classes = `${base} ${sizes[size]} ${style} ${className}`;

  if (href && !disabled) {
    return (
      <a
        href={href}
        className={classes}
        aria-label={ariaLabel}
        onClick={onClick}
        {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={classes} disabled={disabled} aria-label={ariaLabel} onClick={onClick}>
      {children}
    </button>
  );
}
