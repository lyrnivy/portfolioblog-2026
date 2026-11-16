import type { ComponentType } from "react";
import { Mail, ShoppingBag } from "lucide-react";

type IconProps = { size?: number; className?: string };

function TikTokIcon({ size = 16, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M16.6 5.82A4.28 4.28 0 0 1 15.55 3h-3.13v12.6a2.59 2.59 0 1 1-2.87-2.57v-3.2a5.77 5.77 0 1 0 6 5.76V9.01a7.4 7.4 0 0 0 4.33 1.38V7.26a4.3 4.3 0 0 1-3.3-1.44Z" />
    </svg>
  );
}

function InstagramIcon({ size = 16, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function YouTubeIcon({ size = 16, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
      <path d="m9.75 15.02 5.75-3.27-5.75-3.27z" />
    </svg>
  );
}

function PinterestIcon({ size = 16, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M12 2a10 10 0 0 0-3.64 19.32c-.05-.78-.09-1.98.02-2.83.1-.76.65-4.93.65-4.93s-.17-.33-.17-.82c0-.77.45-1.34 1-1.34.47 0 .7.35.7.78 0 .47-.3 1.18-.46 1.84-.13.55.28 1 .82 1 .98 0 1.74-1.04 1.74-2.53 0-1.32-.95-2.25-2.3-2.25-1.57 0-2.49 1.18-2.49 2.4 0 .47.18.98.41 1.26a.17.17 0 0 1 .04.16c-.04.17-.13.55-.15.63-.03.1-.1.13-.21.08-.8-.37-1.3-1.53-1.3-2.47 0-2.01 1.46-3.86 4.22-3.86 2.21 0 3.93 1.58 3.93 3.69 0 2.2-1.39 3.98-3.31 3.98-.65 0-1.26-.34-1.47-.73 0 0-.32 1.23-.4 1.53-.14.55-.53 1.25-.79 1.67A10 10 0 1 0 12 2z" />
    </svg>
  );
}

const ICONS: Record<string, ComponentType<IconProps>> = {
  TikTok: TikTokIcon,
  Instagram: InstagramIcon,
  YouTube: YouTubeIcon,
  Pinterest: PinterestIcon,
  Email: Mail,
  "Klook Shop": ShoppingBag,
};

export default function SocialIcon({
  label,
  size = 16,
  className,
}: {
  label: string;
  size?: number;
  className?: string;
}) {
  const Icon = ICONS[label];
  return Icon ? <Icon size={size} className={className} /> : null;
}
