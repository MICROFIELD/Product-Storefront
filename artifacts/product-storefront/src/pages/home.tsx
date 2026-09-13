import { Link } from 'wouter';
import { ArrowDown, ArrowRight, Leaf, Package, SunMedium } from 'lucide-react';
import { products } from '@/data/products';
import { ProductCard, SectionHeading } from '@/components/storefront';

export default function Home() {
  const featured = products.slice(0, 4);
  return (
    <main>
      <section className="hero-section">
        <div className="hero-copy animate-rise-in">
          <p className="eyebrow hero-kicker"><span /> The morning edit · vol. 04</p>
          <h1>Make room<br /><i>for the good.</i></h1>
          <p className="hero-description">A considered collection of everyday objects for the rituals that make a day feel like yours.</p>
          <div className="hero-actions">
            <Link href="/shop" className="button button-dark" data-testid="button-hero-shop">Shop the collection <ArrowRight size={16} /></Link>
            <Link href="/#story" className="text-link" data-testid="link-hero-story">Why Morrow <ArrowDown size={14} /></Link>
          </div>
        </div>
        <div className="hero-art animate-rise-in" style={{ animationDelay: '130ms' }} aria-label="A still life of objects for a slow morning" role="img">
          <div className="hero-art-glow" />
          <div className="hero-art-sun" />
          <div className="hero-art-table" />
          <div className="hero-art-mug"><span /></div>
          <div className="hero-art-carafe"><i /><span /></div>
          <div className="hero-art-branch"><i /><i /><i /><i /></div>
          <span className="hero-art-caption">Still life no. 01<br />08:14 / early light</span>
        </div>
        <div className="hero-side-note">Small things,<br />held well.</div>
      </section>

      <section className="principles-strip" id="story">
        <div><SunMedium size={20} /><span>For the first light</span></div>
        <div><Leaf size={20} /><span>Made with restraint</span></div>
        <div><Package size={20} /><span>Sent with intention</span></div>
      </section>

      <section className="home-featured page-width">
        <div className="section-heading-row">
          <SectionHeading kicker="The considered collection" title="Things worth reaching for." copy="Objects that do their job beautifully, then stay out of the way." />
          <Link href="/shop" className="text-link heading-link" data-testid="link-featured-all">See everything <ArrowRight size={14} /></Link>
        </div>
        <div className="product-grid product-grid-featured">{featured.map((product, index) => <ProductCard product={product} index={index} key={product.id} />)}</div>
      </section>

      <section className="editorial-band">
        <div className="editorial-image" role="img" aria-label="Warm afternoon light across linen and stoneware">
          <div className="editorial-window" /><div className="editorial-linen" /><div className="editorial-branch" />
          <span>Object study / 002</span>
        </div>
        <div className="editorial-copy">
          <p className="eyebrow">Our point of view</p>
          <h2>The luxury<br /><i>of enough.</i></h2>
          <p>We look for the quiet pleasure in a weighty spoon, a well-made cup, the corner of a notebook that stays open. Less, but better chosen.</p>
          <Link href="/shop" className="text-link" data-testid="link-editorial-shop">Meet the collection <ArrowRight size={14} /></Link>
        </div>
      </section>

      <section className="home-last-call page-width">
        <p className="eyebrow">A note for later</p>
        <h2>Good mornings<br /><i>take practice.</i></h2>
        <p>Start with one small thing you will use tomorrow.</p>
        <Link href="/shop" className="button button-outline" data-testid="button-last-shop">Find your first piece <ArrowRight size={16} /></Link>
      </section>
    </main>
  );
}