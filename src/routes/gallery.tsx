import { Link, createFileRoute } from '@tanstack/react-router';
import { ArrowLeft, ArrowUpRight, Box, PackageOpen, ScanSearch, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Brand, SiteFooter, SocialLinks } from '@/components/brand-shell';
import gadgetImage from '@/assets/gallery-gadgets.jpg';
import skincareImage from '@/assets/gallery-skincare.jpg';
import fashionImage from '@/assets/gallery-fashion.jpg';

export const Route = createFileRoute('/gallery')({
  head: () => ({
    meta: [
      { title: 'Curation Gallery | The 9ja Curator' },
      { name: 'description', content: 'Explore sample product styling, unboxing concepts, and benefit-led campaign layouts for gadgets, skincare, and fashion accessories.' },
      { property: 'og:title', content: 'Curation Gallery | The 9ja Curator' },
      { property: 'og:description', content: 'A visual showcase of product storytelling concepts created for the Nigerian consumer market.' },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
  }),
  component: GalleryPage,
});

type Category = 'All' | 'Gadgets' | 'Skincare' | 'Fashion';

const filters: Category[] = ['All', 'Gadgets', 'Skincare', 'Fashion'];

const galleryItems = [
  { category: 'Gadgets' as const, image: gadgetImage, icon: PackageOpen, kicker: 'Unboxing & utility', title: 'Everyday power, elevated', caption: 'Premium storytelling for devices that move seamlessly through modern routines.' },
  { category: 'Skincare' as const, image: skincareImage, icon: ScanSearch, kicker: 'Benefit-led review', title: 'Texture, ritual, trust', caption: 'Clean product staging designed to highlight sensory appeal and skincare efficacy.' },
  { category: 'Fashion' as const, image: fashionImage, icon: Sparkles, kicker: 'Lifestyle placement', title: 'The finishing edit', caption: 'Styled accessories and finishing touches that complete a confident everyday look.' },
  { category: 'Gadgets' as const, image: gadgetImage, icon: Box, kicker: 'Campaign layout', title: 'One ecosystem, one story', caption: 'A curated product system built to connect utility, aesthetics, and practical value.' },
  { category: 'Skincare' as const, image: skincareImage, icon: PackageOpen, kicker: 'Shelf concept', title: 'The considered shelf', caption: 'Elegant reveal formats balancing glow, ingredient trust, and confidence in every frame.' },
  { category: 'Fashion' as const, image: fashionImage, icon: ScanSearch, kicker: 'Product detail', title: 'Details worth noticing', caption: 'Sharp close-up styling that brings material feel, finish, and form into focus.' },
];

function GalleryPage() {
  const [filter, setFilter] = useState<Category>('All');
  const visibleItems = filter === 'All' ? galleryItems : galleryItems.filter((item) => item.category === filter);

  return (
    <>
      <header className="site-header gallery-header">
        <div className="container-width h-full flex items-center justify-between gap-5">
          <Brand />
          <nav className="gallery-nav" aria-label="Gallery navigation">
            <Link className="nav-link" to="/">
              Media kit
            </Link>
            <Link className="nav-link" to="/gallery">
              Visual showcase
            </Link>
          </nav>
        </div>
      </header>

      <main className="gallery-page">
        <section className="gallery-intro">
          <div className="container-width">
            <Link to="/" className="gallery-back">
              <ArrowLeft /> Back to media kit
            </Link>
            <div className="section-label">Visual showcase</div>
            <h1>Curated product stories for the brands people want to discover.</h1>
            <p>
              A clean, premium presentation layer designed to help manufacturers introduce products
              in a way that feels aspirational, useful, and instantly recognizable.
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
                    className={filter === item ? 'gallery-filter is-active' : 'gallery-filter'}
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
              {visibleItems.map(({ category, image, icon: Icon, kicker, title, caption }) => (
                <article key={`${category}-${title}`} className="gallery-card">
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
                      <Button variant="link" className="gallery-link">
                        View concept
                        <ArrowUpRight />
                      </Button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="gallery-cta">
          <div className="container-width gallery-cta-inner">
            <div>
              <div className="section-label">Your product, thoughtfully placed</div>
              <h2>Let’s shape the next visual story for your brand.</h2>
            </div>
            <Link to="/" className="gallery-cta-button">
              Start a collaboration
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
