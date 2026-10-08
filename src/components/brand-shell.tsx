import { Link } from '@tanstack/react-router';
import { Instagram, Mail, MessageCircle, Music2, Send, Twitter } from 'lucide-react';

export const socialProfiles = [
  { label: 'Instagram', href: 'https://instagram.com/the9jacurator', icon: Instagram },
  { label: 'TikTok', href: 'https://tiktok.com/@the9jacurator', icon: Music2 },
  { label: 'X', href: 'https://x.com/the9jacurator', icon: Twitter },
  { label: 'WhatsApp', href: 'https://wa.me/2348000000000', icon: MessageCircle },
  { label: 'Email', href: 'mailto:myrdpa@gmail.com', icon: Mail },
] as const;

export function Brand() {
  return (
    <Link to="/" className="brand" aria-label="The 9ja Curator home">
      <span className="brand-mark">9</span>
      <span className="brand-name">
        The 9ja Curator<span className="brand-sub">Curated for real life</span>
      </span>
    </Link>
  );
}

export function SocialLinks({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`social-links ${compact ? 'social-links-compact' : ''}`} aria-label="Social profiles">
      {socialProfiles.map(({ label, href, icon: Icon }) => (
        <a
          key={label}
          className="social-link"
          href={href}
          title={label}
          aria-label={label}
          target={href.startsWith('http') ? '_blank' : undefined}
          rel={href.startsWith('http') ? 'noreferrer noopener' : undefined}
        >
          <Icon />
        </a>
      ))}
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="container-width footer-inner">
        <Brand />
        <SocialLinks />
        <span className="footer-copy">© 2026 The 9ja Curator. Thoughtfully curated. Always.</span>
        <Link className="nav-link" to="/">
          Home
        </Link>
      </div>
    </footer>
  );
}
