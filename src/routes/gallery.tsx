import { Link } from "@tanstack/react-router";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Box,
  Check,
  Menu,
  PackageOpen,
  ScanSearch,
  Sparkles,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Brand, SiteFooter, SocialLinks } from "@/components/brand-shell";
import gadgetImage from "@/assets/gallery-gadgets.jpg";
import skincareImage from "@/assets/gallery-skincare.jpg";
import fashionImage from "@/assets/gallery-fashion.jpg";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Curation Gallery | The 9ja Curator" },
      {
        name: "description",
        content:
          "Explore sample product styling, unboxing concepts, and benefit-led campaign layouts for gadgets, skincare, and fashion accessories.",
      },
      { property: "og:title", content: "Curation Gallery | The 9ja Curator" },
      {
        property: "og:description",
        content:
          "A visual showcase of product storytelling concepts created for the Nigerian consumer market.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: GalleryPage,
});

type Category = "All" | "Gadgets" | "Skincare" | "Fashion";

interface GalleryConcept {
  id: string;
  category: "Gadgets" | "Skincare" | "Fashion";
  fullCategoryName: string;
  image: string;
  icon: typeof PackageOpen;
  kicker: string;
  title: string;
  caption: string;
  deliverables: string[];
  recommendedPackage: string;
  strategyFocus: string;
}

const filters: Category[] = ["All", "Gadgets", "Skincare", "Fashion"];

const galleryItems: GalleryConcept[] = [
  {
    id: "gadgets-unboxing",
    category: "Gadgets",
    fullCategoryName: "Gadgets & Tech Accessories",
    image: gadgetImage,
    icon: PackageOpen,
    kicker: "Unboxing & utility",
    title: "Everyday power, elevated",
    caption: "Premium storytelling for devices that move seamlessly through modern routines.",
    deliverables: [
      "Macro 4K unboxing & build quality breakdown",
      "Real-world Nigerian charging & battery stress test",
      "Short-form Instagram Reel & TikTok showcase",
      "Key purchasing takeaway with direct affiliate/order link",
    ],
    recommendedPackage: "Starter Spotlight Package",
    strategyFocus: "Utility & Reliability in Nigerian Daily Life",
  },
  {
    id: "skincare-benefit",
    category: "Skincare",
    fullCategoryName: "Skincare Products",
    image: skincareImage,
    icon: ScanSearch,
    kicker: "Benefit-led review",
    title: "Texture, ritual, trust",
    caption: "Clean product staging designed to highlight sensory appeal and skincare efficacy.",
    deliverables: [
      "Texture macro shots & skin barrier application demo",
      "Ingredient analysis highlighting NAFDAC-safe verification",
      "7-day glow test & honest before/after lifestyle recap",
      "Multi-story highlight series answering audience skin questions",
    ],
    recommendedPackage: "Growth Integration Package",
    strategyFocus: "Efficacy, Safety & Climate-Adaptive Skin Protection",
  },
  {
    id: "fashion-lifestyle",
    category: "Fashion",
    fullCategoryName: "Fashion Accessories",
    image: fashionImage,
    icon: Sparkles,
    kicker: "Lifestyle placement",
    title: "The finishing edit",
    caption: "Styled accessories and finishing touches that complete a confident everyday look.",
    deliverables: [
      "Editorial lookbook integration across 3 distinct outfits",
      "Lagos urban streetwear & professional setting context",
      "Carousel post featuring materials, clasps, and fit",
      "High-converting style guide caption with product tag",
    ],
    recommendedPackage: "Growth Integration Package",
    strategyFocus: "Culture, Versatility & Confident Personal Style",
  },
  {
    id: "gadgets-ecosystem",
    category: "Gadgets",
    fullCategoryName: "Gadgets & Tech Accessories",
    image: gadgetImage,
    icon: Box,
    kicker: "Campaign layout",
    title: "One ecosystem, one story",
    caption: "A curated product system built to connect utility, aesthetics, and practical value.",
    deliverables: [
      "Multi-device ecosystem integration in a creator workspace",
      "Problem-solving narrative: charging on the move & load shedding survival",
      "Dedicated YouTube/Reels video with branded bumper",
      "Product seeding into recurring monthly roundups",
    ],
    recommendedPackage: "Exclusive Ambassador Retainer",
    strategyFocus: "Comprehensive Ecosystem Adoption",
  },
  {
    id: "skincare-shelf",
    category: "Skincare",
    fullCategoryName: "Skincare Products",
    image: skincareImage,
    icon: PackageOpen,
    kicker: "Shelf concept",
    title: "The considered shelf",
    caption:
      "Elegant reveal formats balancing glow, ingredient trust, and confidence in every frame.",
    deliverables: [
      "Morning vs. evening routine placement",
      "Minimalist bathroom staging with branded product focal point",
      "Voiceover storytelling emphasizing self-care rituals",
      "Community giveaway or exclusive audience discount code",
    ],
    recommendedPackage: "Starter Spotlight Package",
    strategyFocus: "Everyday Self-Care & Habit Formation",
  },
  {
    id: "fashion-detail",
    category: "Fashion",
    fullCategoryName: "Fashion Accessories",
    image: fashionImage,
    icon: ScanSearch,
    kicker: "Product detail",
    title: "Details worth noticing",
    caption: "Sharp close-up styling that brings material feel, finish, and form into focus.",
    deliverables: [
      "Studio macro captures showcasing stitching, leather, and metal sheen",
      "Styling guide with footwear, wristwear, and eyewear matching",
      "Story engagement poll ('Which look would you wear?')",
      "Permanent feature in The 9ja Curator seasonal lookbook",
    ],
    recommendedPackage: "Starter Spotlight Package",
    strategyFocus: "Craftsmanship & Distinctive Detail",
  },
];

function GalleryPage() {
  const [filter, setFilter] = useState<Category>("All");
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedConcept, setSelectedConcept] = useState<GalleryConcept | null>(null);

  const visibleItems =
    filter === "All" ? galleryItems : galleryItems.filter((item) => item.category === filter);

  return (
    <>
      <header className="site-header gallery-header">
        <div className="container-width h-full flex items-center justify-between gap-5">
          <Brand />
          <nav className="desktop-nav flex items-center gap-6" aria-label="Gallery navigation">
            <Link className="nav-link" to="/">
              Media kit
            </Link>
            <a href="/#curation" className="nav-link">
              Curation Pillars
            </a>
            <a href="/#rate-card" className="nav-link">
              Rate Card
            </a>
            <Link className="nav-link font-semibold text-foreground" to="/gallery">
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
          <Link className="nav-link" to="/">
            Media kit
          </Link>
          <a href="/#curation" className="nav-link">
            Curation Pillars
          </a>
          <a href="/#rate-card" className="nav-link">
            Rate Card
          </a>
          <Link className="nav-link" to="/gallery">
            Visual Showcase
          </Link>
          <div className="pt-2 border-t border-border">
            <SocialLinks />
          </div>
        </nav>
      )}

      <main className="gallery-page">
        <section className="gallery-intro">
          <div className="container-width">
            <Link to="/" className="gallery-back">
              <ArrowLeft size={14} /> Back to media kit
            </Link>
            <div className="section-label">Visual showcase</div>
            <h1>Curated product stories for the brands people want to discover.</h1>
            <p>
              A clean, premium presentation layer designed to help manufacturers introduce products
              in a way that feels aspirational, useful, and instantly recognizable to Nigerian
              audiences.
            </p>
          </div>
        </section>

        <section className="section gallery-work">
          <div className="container-width">
            <div className="gallery-toolbar">
              <div>
                <div className="section-label">The visual edit</div>
                <h2>Made to be seen. Built to convert.</h2>
              </div>

              <div className="gallery-filter-tabs" role="tablist" aria-label="Gallery categories">
                {filters.map((item) => (
                  <button
                    key={item}
                    type="button"
                    className={filter === item ? "gallery-filter is-active" : "gallery-filter"}
                    onClick={() => setFilter(item)}
                    role="tab"
                    aria-selected={filter === item}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="gallery-grid">
              {visibleItems.map((concept) => {
                const { category, image, icon: Icon, kicker, title, caption } = concept;
                return (
                  <article
                    key={concept.id}
                    className="gallery-card"
                    onClick={() => setSelectedConcept(concept)}
                  >
                    <img src={image} alt={title} className="gallery-card-image" />
                    <div className="gallery-card-content">
                      <span className="gallery-card-kicker">{kicker}</span>
                      <div className="gallery-card-heading">
                        <h3>{title}</h3>
                        <span className="gallery-card-icon">
                          <Icon />
                        </span>
                      </div>
                      <p>{caption}</p>
                      <div className="gallery-meta">
                        <span>{category}</span>
                        <Button
                          variant="link"
                          className="gallery-link"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedConcept(concept);
                          }}
                        >
                          View concept
                          <ArrowUpRight size={14} />
                        </Button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="gallery-cta">
          <div className="container-width gallery-cta-inner">
            <div>
              <div className="section-label">Your product, thoughtfully placed</div>
              <h2>Let’s shape the next visual story for your brand.</h2>
            </div>
            <a href="/#contact" className="gallery-cta-button">
              Start a collaboration
              <ArrowRight size={15} />
            </a>
          </div>
        </section>
      </main>

      {/* Interactive Concept Details Modal */}
      <Dialog
        open={selectedConcept !== null}
        onOpenChange={(open) => {
          if (!open) setSelectedConcept(null);
        }}
      >
        <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
          {selectedConcept && (
            <>
              <div className="relative rounded-md overflow-hidden aspect-video -mx-6 -mt-6 mb-4">
                <img
                  src={selectedConcept.image}
                  alt={selectedConcept.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 bg-card/90 backdrop-blur-sm px-2.5 py-1 rounded text-[10px] font-bold tracking-wider uppercase text-emerald">
                  {selectedConcept.category}
                </div>
              </div>

              <DialogHeader>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald">
                  {selectedConcept.kicker}
                </span>
                <DialogTitle className="text-2xl font-bold font-display">
                  {selectedConcept.title}
                </DialogTitle>
                <DialogDescription className="text-sm text-muted-foreground pt-1">
                  {selectedConcept.caption}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 pt-2">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
                    Campaign Deliverables Specification
                  </h4>
                  <ul className="space-y-2 text-xs">
                    {selectedConcept.deliverables.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check size={14} className="text-emerald mt-0.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-md bg-secondary p-3.5 text-xs flex justify-between items-center gap-4 border border-border">
                  <div>
                    <span className="block text-[10px] text-muted-foreground uppercase font-bold tracking-wider">
                      Strategic Focus
                    </span>
                    <span className="font-semibold">{selectedConcept.strategyFocus}</span>
                  </div>
                  <div className="text-right">
                    <span className="block text-[10px] text-muted-foreground uppercase font-bold tracking-wider">
                      Recommended Tier
                    </span>
                    <span className="font-semibold text-emerald">
                      {selectedConcept.recommendedPackage}
                    </span>
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <a
                    href={`/#contact`}
                    className="btn-primary flex-1 text-center justify-center"
                    onClick={() => setSelectedConcept(null)}
                  >
                    Request Brief for this Concept
                    <ArrowRight size={14} />
                  </a>
                  <Button variant="outline" onClick={() => setSelectedConcept(null)}>
                    Close
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <SiteFooter />
    </>
  );
}
