import { Instagram, Mail, MessageCircle, Music2, Twitter, type LucideIcon } from "lucide-react";

export interface SocialProfile {
  label: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
}

export const socialProfiles: readonly SocialProfile[] = [
  { label: "Instagram", href: "https://instagram.com/the9jacurator", icon: Instagram },
  { label: "TikTok", href: "https://tiktok.com/@the9jacurator", icon: Music2 },
  { label: "X (Twitter)", href: "https://x.com/the9jacurator", icon: Twitter },
  { label: "WhatsApp", href: "https://wa.me/2348000000000", icon: MessageCircle },
  { label: "Direct Email", href: "mailto:the9jacurator@gmail.com", icon: Mail },
] as const;
