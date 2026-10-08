import { Link } from '@tanstack/react-router';
import { Instagram, Mail, MessageCircle, Music2, Send, Twitter } from 'lucide-react';

const socialProfiles = [
  { label: 'TikTok', icon: Music2 },
  { label: 'Instagram', icon: Instagram },
  { label: 'Telegram', icon: Send },
  { label: 'X', icon: Twitter },
  { label: 'WhatsApp Business', icon: MessageCircle },
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
      {socialProfiles.map(({ label, icon: Icon }) => (
        <span className="social-link social-link-pending" title={`${label} profile coming soon`} aria-label={`${label} profile coming soon`} key={label}>
          <Icon />
        </span>
      ))}
      <a className="social-link" href="mailto:myrdpa@gmail.com" title="Email The 9ja Curator" aria-label="Email The 9ja Curator">
        <Mail />
      </a>
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
        <Link className="nav-link" to="/">Home</Link>
      </div>
    </footer>
  );
}