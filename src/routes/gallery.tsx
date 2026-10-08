import { createFileRoute, Link } from '@tanstack/react-router';
import { useState } from 'react';
import { ArrowLeft, ArrowUpRight, Box, PackageOpen, ScanSearch, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Brand, SiteFooter, SocialLinks } from '@/components/brand-shell';
import gadgetImage from '@/assets/gallery-gadgets.jpg';
import skincareImage from '@/assets/gallery-skincare.jpg';
import fashionImage from '@/assets/gallery-fashion.jpg';

export const Route = createFileRoute('/gallery')({
  head: () => ({ meta: [
    { title: 'Curation Gallery | The 9ja Curator' },
    { name: 'description', content: 'Explore sample product styling, unboxing concepts, and benefit-led campaign layouts for gadgets, skincare, and fashion accessories.' },
    { property: 'og:title', content: 'Curation Gallery | The 9ja Curator' },
    { property: 'og:description', content: 'A visual showcase of product storytelling concepts created for the Nigerian consumer market.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: GalleryPage,
});

type Category = 'All' | 'Gadgets' | 'Skincare' | 'Fashion';
const filters: Category[] = ['All', 'Gadgets', 'Skincare', 'Fashion'];
const galleryItems = [
  { category: 'Gadgets' as const, image: gadgetImage, icon: PackageOpen, kicker: 'Unboxing & utility', title: 'Everyday power, elevated', caption: 'A premium unboxing direction that makes practical charging and wearable tech feel immediately desirable.' },
  { category: 'Skincare' as const, image: skincareImage, icon: ScanSearch, kicker: 'Benefit-led review', title: 'Texture, ritual, trust', caption: 'Clean product staging designed to support ingredient education, safe-use guidance, and a credible glow story.' },
  { category: 'Fashion' as const, image: fashionImage, icon: Sparkles, kicker: 'Lifestyle placement', title: 'The finishing edit', caption: 'A styled accessories story that shows how considered details move from product shot to everyday wear.' },
  { category: 'Gadgets' as const, image: gadgetImage, icon: Box, kicker: 'Campaign layout', title: 'One ecosystem, one story', caption: 'A connected visual system for product benefits, comparison frames, and social-first campaign cut-downs.' },
  { category: 'Skincare' as const, image: skincareImage, icon: PackageOpen, kicker: 'Unboxing concept', title: 'The considered shelf', caption: 'An elegant reveal format balancing sensory appeal with the clarity Nigerian skincare buyers expect.' },
  { category: 'Fashion' as const, image: fashionImage, icon: ScanSearch, kicker: 'Product review', title: 'Details worth noticing', caption: 'Sharp close-up storytelling that makes materials, finish, versatility, and value easy to understand.' },
];

function GalleryPage() {
  const [filter, setFilter] = useState<Category>('All');
  const visibleItems = filter === 'All' ? galleryItems : galleryItems.filter(item => item.category === filter);

  return <>
    <header className="site-header gallery-header"><div className="container-width h-full flex items-center justify-between gap-5"><Brand /><nav className="gallery-nav" aria-label="Gallery navigation"><Link to="/" hash="rate-card" className="nav-link">Rate Card</Link><Link to="/" hash="contact" className="nav-link">Collaborate</Link></nav><SocialLinks compact /></div></header>
    <main className="gallery-page">
      <section className="gallery-intro"><div className="container-width"><Link to="/" className="gallery-back"><ArrowLeft /> Back to media kit</Link><div className="section-label">Visual showcase</div><div className="gallery-intro-grid"><h1>Curation<br /><span>Gallery.</span></h1><div><p>Sample visual directions for brands ready to show up with relevance, clarity, and premium appeal in Nigeria.</p><span className="concept-note">Concept work · created to demonstrate styling direction</span></div></div></div></section>
      <section className="section gallery-work"><div className="container-width"><div className="gallery-toolbar"><div><div className="section-label">The visual edit</div><h2>Made to be seen. Built to be understood.</h2></div><div className="filter-tabs" role="tablist" aria-label="Filter gallery by category">{filters.map(item => <Button key={item} role="tab" aria-selected={filter === item} variant={filter === item ? 'default' : 'outline'} size="sm" onClick={() => setFilter(item)}>{item}</Button>)}</div></div><div className="gallery-grid">{visibleItems.map((item, index) => { const Icon = item.icon; return <article className="gallery-card" key={`${item.category}-${item.title}`}><div className="gallery-image-wrap"><img src={item.image} alt={`${item.title} — ${item.category.toLowerCase()} styling concept`} width={1408} height={1056} loading={index < 2 ? 'eager' : 'lazy'} /><span>{item.category}</span></div><div className="gallery-card-copy"><div className="gallery-kicker"><Icon />{item.kicker}</div><h3>{item.title}</h3><p>{item.caption}</p></div></article>; })}</div></div></section>
      <section className="gallery-cta"><div className="container-width gallery-cta-inner"><div><div className="section-label">Your product, thoughtfully placed</div><h2>Let’s shape the next visual story.</h2></div><Button asChild variant="gold"><Link to="/" hash="contact">Start a collaboration <ArrowUpRight /></Link></Button></div></section>
    </main>
    <SiteFooter />
  </>;
}