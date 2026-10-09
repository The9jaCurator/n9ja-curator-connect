import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  Check,
  CheckCircle2,
  MapPin,
  ShieldCheck,
  Globe2,
  Sparkles,
  Headphones,
  TrendingUp,
  Layers3,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContactForm } from "@/components/contact-form";
import { Brand, SocialLinks } from "@/components/brand-shell";
import heroImage from "@/assets/curator-hero.jpg";
import techImage from "@/assets/tech.jpg";
import skincareImage from "@/assets/skincare.jpg";
import fashionImage from "@/assets/fashion.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "The 9ja Curator | Lifestyle Curation & Brand Partnerships" },
      {
        name: "description",
        content:
          "Bridging global manufacturers and the Nigerian consumer market through trusted product curation. Explore tech, skincare, fashion and brand partnerships.",
      },
      {
        property: "og:title",
        content: "The 9ja Curator | Lifestyle Curation & Brand Partnerships",
      },
      {
        property: "og:description",
        content:
          "Considered products. Local insight. Meaningful partnerships. Discover The 9ja Curator's lifestyle media kit and collaboration packages.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const pillars = [
  {
    title: "Gadgets & Tech Accessories",
    category: "Gadgets & Tech Accessories",
    image: techImage,
    description: "Smart tools, fast chargers, and everyday essentials that make life work better.",
    tag: "Practical & Trusted",
  },
  {
    title: "Skincare Products",
    category: "Skincare Products",
    image: skincareImage,
    description: "Thoughtful grooming and glowing-skin essentials, with safety always in focus.",
    tag: "Trusted & NAFDAC-approved",
  },
  {
    title: "Fashion Accessories",
    category: "Fashion Accessories",
    image: fashionImage,
    description:
      "The finishing touches. Sleek accessories that bring personal style to everyday life.",
    tag: "Curated for culture",
  },
];
const packages = [
  {
    name: "Starter Spotlight Package",
    description: "A thoughtful introduction to your product and what makes it worth discovering.",
    quote: "Project-based",
    caption: "A focused product spotlight",
    features: [
      "One premium feature post",
      "Unboxing or review content",
      "Story mention & engagement",
    ],
  },
  {
    name: "Growth Integration Package",
    description: "Put your product in context with a richer, multi-format lifestyle story.",
    quote: "Campaign-based",
    caption: "A connected content campaign",
    features: [
      "4–6 week campaign",
      "Video + reels + static posts",
      "Behind-the-scenes storytelling",
    ],
  },
  {
    name: "Exclusive Ambassador Retainer",
    description: "Build a lasting connection with an ongoing, dedicated voice for your brand.",
    quote: "Monthly retainer",
    caption: "A long-term brand partnership",
    features: [
      "Monthly recurring feature",
      "Product seeding & lifestyle integration",
      "Community building & direct access",
    ],
  },
];

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPackage, setSelectedPackage] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const cat = params.get("category");
      const pkg = params.get("package");
      if (cat) setSelectedCategory(cat);
      if (pkg) setSelectedPackage(pkg);
      if (window.location.hash === "#contact" || cat || pkg) {
        window.setTimeout(() => {
          document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
        }, 120);
      }
    }
  }, []);

  const handlePillarSelect = (category: string) => {
    setSelectedCategory(category);
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const handlePackageSelect = (packageName: string) => {
    setSelectedPackage(packageName);
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <header className="site-header">
        <div className="container-width h-full flex items-center justify-between">
          <Brand />
          <nav aria-label="Main navigation" className="desktop-nav flex items-center gap-6">
            {[
              { label: "Our Curation", href: "#curation" },
              { label: "Why Us", href: "#why-us" },
              { label: "Rate Card", href: "#rate-card" },
            ].map((link) => (
              <a key={link.label} href={link.href} className="nav-link">
                {link.label}
              </a>
            ))}
            <Link to="/gallery" className="nav-link">
              Visual Showcase
            </Link>
            <SocialLinks compact />
          </nav>
          <button
            className="mobile-menu-button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {menuOpen && (
        <nav className="mobile-nav" aria-label="Mobile navigation">
          {[
            { label: "Our Curation", href: "#curation" },
            { label: "Why Us", href: "#why-us" },
            { label: "Rate Card", href: "#rate-card" },
            { label: "Visual Showcase", href: "/gallery" },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="nav-link"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2 border-t border-border">
            <SocialLinks />
          </div>
        </nav>
      )}

      <main>
        <section className="hero">
          <img
            className="hero-image"
            src={heroImage}
            alt="Curated headphones, skincare, sunglasses, a watch and gold accessories on emerald display plinths"
            width={1600}
            height={900}
          />
          <div className="container-width hero-inner">
            <div className="hero-copy">
              <p className="eyebrow">
                <span className="status-dot" />
                Now open for partnerships
              </p>
              <h1>
                Considered products for <span>the culture</span>
              </h1>
              <p className="hero-description">
                We bridge global manufacturers and the Nigerian consumer. High-conversion curation.
                Trusted storytelling. Real community impact.
              </p>
              <div className="hero-actions">
                <Button className="btn-primary" onClick={() => handlePillarSelect("")}>
                  Partner with us
                  <ArrowRight />
                </Button>
                <Button
                  className="btn-secondary"
                  onClick={() =>
                    document.getElementById("rate-card")?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  View rate card
                </Button>
              </div>
              <p className="hero-note">
                <Check /> Quick response • Fair pricing • High impact
              </p>
            </div>
          </div>
          <p className="hero-caption">Nigeria's most trusted product editor</p>
        </section>

        <div className="trust-strip">
          <div className="container-width trust-inner">
            <div className="trust-item">
              <ShieldCheck />
              Trust-first curation
            </div>
            <div className="trust-item">
              <Globe2 />
              Nigerian insight, global reach
            </div>
            <div className="trust-item">
              <TrendingUp />
              High-conversion reviews
            </div>
          </div>
        </div>

        <section id="curation" className="section">
          <div className="container-width">
            <div className="section-heading">
              <div>
                <div className="section-label">The curation pillars</div>
                <h2>Three worlds. One editor. Endless possibilities.</h2>
              </div>
              <p className="section-intro">
                Each pillar is built on deep market insight, trusted partnerships, and a genuine
                connection to how Nigerians live.
              </p>
            </div>
            <div className="pillar-grid">
              {pillars.map((pillar, i) => (
                <button
                  key={i}
                  onClick={() => handlePillarSelect(pillar.category)}
                  className="pillar-card"
                >
                  <img className="pillar-photo" src={pillar.image} alt={pillar.title} />
                  <div className="pillar-content">
                    <p className="pillar-number">{i + 1}</p>
                    <div className="pillar-title">
                      <h3>{pillar.title}</h3>
                      <Sparkles />
                    </div>
                    <p>{pillar.description}</p>
                    <span className="pillar-tag">{pillar.tag}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section id="why-us" className="section value-section">
          <div className="container-width value-layout">
            <div>
              <div className="section-label">The partnership advantage</div>
              <h2>Global products. Local trust. Real results.</h2>
              <div className="value-items">
                {[
                  {
                    icon: <MapPin />,
                    title: "Deep local insight",
                    desc: "We know exactly how to position your brand for Nigerian consumers.",
                  },
                  {
                    icon: <Headphones />,
                    title: "First-person storytelling",
                    desc: "Every product gets a genuine, tested, trusted experience.",
                  },
                  {
                    icon: <Layers3 />,
                    title: "Multi-niche integration",
                    desc: "Tech, skincare, fashion—we place products in cohesive lifestyle contexts.",
                  },
                ].map((item, i) => (
                  <div key={i} className="value-item">
                    <div className="value-icon">{item.icon}</div>
                    <h3>{item.title}</h3>
                    <p>{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="rate-card" className="section">
          <div className="container-width">
            <div className="section-heading">
              <div>
                <div className="section-label">Partnerships & rate card</div>
                <h2>A partnership tier for every brand stage.</h2>
              </div>
              <p className="section-intro">
                From first-time collaborations to long-term ambassadorships, we scale with your
                goals and budget.
              </p>
            </div>
            <div className="packages-grid">
              {packages.map((pkg, i) => (
                <div key={i} className="package-card">
                  <div className="package-header">
                    <h3>{pkg.name}</h3>
                    <p className="package-quote">{pkg.quote}</p>
                  </div>
                  <p className="package-desc">{pkg.description}</p>
                  <ul className="package-features">
                    {pkg.features.map((feature, j) => (
                      <li key={j}>
                        <Check /> {feature}
                      </li>
                    ))}
                  </ul>
                  <Button className="package-cta" onClick={() => handlePackageSelect(pkg.name)}>
                    {pkg.caption}
                    <ArrowUpRight />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="section contact-section">
          <div className="container-width contact-layout">
            <div className="contact-copy">
              <div className="section-label">Let's create something meaningful</div>
              <h2>Your brand story starts here.</h2>
              <p>
                Share your product, goals, and vision. We'll review your brief and get back to you
                within 2–3 business days with a tailored collaboration plan.
              </p>
            </div>
            <ContactForm selectedCategory={selectedCategory} selectedPackage={selectedPackage} />
          </div>
        </section>
      </main>

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
    </>
  );
}
