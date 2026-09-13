import { useState } from 'react';
import { Link, useRoute } from 'wouter';
import { ArrowRight, Check, ChevronLeft, Plus } from 'lucide-react';
import { getProduct, products } from '@/data/products';
import { useCart } from '@/hooks/use-cart';
import { formatPrice, ProductCard, ProductVisual, QuantityControl } from '@/components/storefront';

export default function ProductPage() {
  const [, params] = useRoute('/product/:id');
  const product = params?.id ? getProduct(params.id) : undefined;
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [variant, setVariant] = useState(product?.colors?.[0]);
  const [added, setAdded] = useState(false);

  if (!product) {
    return <main className="not-found page-width"><p className="eyebrow">404 / missing object</p><h1>That piece has<br /><i>moved on.</i></h1><Link href="/shop" className="button button-dark" data-testid="link-product-not-found">Back to the collection <ArrowRight size={16} /></Link></main>;
  }

  const handleAdd = () => {
    addItem(product, quantity, variant);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  };
  const related = products.filter((item) => item.id !== product.id && item.category === product.category).slice(0, 3);

  return (
    <main className="product-page">
      <div className="page-width product-breadcrumb"><Link href="/shop" data-testid="link-product-back"><ChevronLeft size={15} /> All pieces</Link><span>/</span><span>{product.category}</span></div>
      <section className="product-detail page-width">
        <div className="product-detail-visual"><ProductVisual product={product} large /></div>
        <div className="product-detail-copy">
          {product.badge && <p className="product-detail-badge"><span /> {product.badge}</p>}
          <p className="eyebrow">{product.category}</p>
          <h1>{product.name}</h1>
          <div className="detail-price"><span>{formatPrice(product.price)}</span>{product.compareAtPrice && <del>{formatPrice(product.compareAtPrice)}</del>}</div>
          <p className="detail-description">{product.description}</p>
          {product.colors && <div className="variant-picker"><p className="eyebrow">Color <span>{variant}</span></p><div>{product.colors.map((color) => <button type="button" className={variant === color ? 'active' : ''} onClick={() => setVariant(color)} key={color} data-testid={`button-variant-${color.toLowerCase()}`}><i className={`swatch swatch-${color.toLowerCase()}`} />{color}{variant === color && <Check size={13} />}</button>)}</div></div>}
          <div className="detail-buy"><QuantityControl quantity={quantity} onDecrease={() => setQuantity(Math.max(1, quantity - 1))} onIncrease={() => setQuantity(quantity + 1)} testId={product.id} /><button type="button" className={`button button-dark add-button ${added ? 'is-added' : ''}`} onClick={handleAdd} data-testid="button-add-to-cart">{added ? <><Check size={16} /> Added to your bag</> : <>Add to bag <Plus size={16} /></>}</button></div>
          <div className="detail-notes"><div><span>01</span><p>Made slowly<br /><em>Small batch, considered materials.</em></p></div><div><span>02</span><p>Arrives simply<br /><em>Plastic-free, ready to gift yourself.</em></p></div></div>
          <details className="detail-accordion" open><summary>Details <Plus size={15} /></summary><ul>{product.details.map((detail) => <li key={detail}>{detail}</li>)}</ul><p><strong>Material</strong> {product.material}<br /><strong>Dimensions</strong> {product.dimensions}</p></details>
        </div>
      </section>
      {related.length > 0 && <section className="related-section page-width"><div className="section-heading-row"><div><p className="eyebrow">Goes well with</p><h2>Keep the ritual<br /><i>going.</i></h2></div><Link href="/shop" className="text-link heading-link" data-testid="link-related-shop">Shop all <ArrowRight size={14} /></Link></div><div className="product-grid">{related.map((item, index) => <ProductCard key={item.id} product={item} index={index} />)}</div></section>}
    </main>
  );
}