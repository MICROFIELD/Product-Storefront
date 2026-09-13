import { useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { Link, useLocation } from 'wouter';
import {
  ArrowRight,
  Check,
  ChevronLeft,
  Minus,
  Plus,
  Search,
  ShoppingBag,
  Sparkles,
  X,
} from 'lucide-react';
import type { Product } from '@/data/products';
import { products } from '@/data/products';
import { useCart } from '@/hooks/use-cart';

const money = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

export function formatPrice(value: number) {
  return money.format(value);
}

export function ProductVisual({ product, large = false }: { product: Product; large?: boolean }) {
  return (
    <div
      className={`product-visual visual-${product.image} ${large ? 'product-visual-large' : ''}`}
      aria-label={`${product.name} product image`}
      role="img"
      data-testid={`img-product-${product.id}`}
    >
      <div className="visual-sun" />
      <div className="visual-shadow" />
      {product.image === 'stoneware' && <div className="object-mug"><span /></div>}
      {product.image === 'linen' && <div className="object-linen"><i /><i /><i /></div>}
      {product.image === 'candle' && <div className="object-candle"><b /><small>EMBER<br />02</small></div>}
      {product.image === 'glass' && <div className="object-carafe"><span /><i /></div>}
      {product.image === 'paper' && <div className="object-notebook"><span>FIELD<br />NOTES</span><i /></div>}
      {product.image === 'wood' && <div className="object-tray"><i /><i /></div>}
      {product.image === 'soap' && <div className="object-soap"><span>CLOUD</span></div>}
      {product.image === 'brass' && <div className="object-spoon"><i /></div>}
      {product.image === 'tea' && <div className="object-tea"><span>HEARTH<br />04</span><i /></div>}
      <span className="visual-caption">{product.category} / {product.image}</span>
    </div>
  );
}

export function QuantityControl({
  quantity,
  onDecrease,
  onIncrease,
  testId,
}: {
  quantity: number;
  onDecrease: () => void;
  onIncrease: () => void;
  testId: string;
}) {
  return (
    <div className="quantity-control" data-testid={`quantity-${testId}`}>
      <button type="button" onClick={onDecrease} aria-label="Decrease quantity" data-testid={`button-decrease-${testId}`}>
        <Minus size={13} strokeWidth={1.7} />
      </button>
      <span data-testid={`text-quantity-${testId}`}>{quantity}</span>
      <button type="button" onClick={onIncrease} aria-label="Increase quantity" data-testid={`button-increase-${testId}`}>
        <Plus size={13} strokeWidth={1.7} />
      </button>
    </div>
  );
}

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const quickAdd = () => {
    addItem(product);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1300);
  };

  return (
    <article className="product-card animate-rise-in" style={{ animationDelay: `${index * 70}ms` }} data-testid={`card-product-${product.id}`}>
      <Link href={`/product/${product.id}`} className="product-card-image group" data-testid={`link-product-${product.id}`}>
        {product.badge && <span className="product-badge">{product.badge}</span>}
        <ProductVisual product={product} />
        <span className="product-card-arrow"><ArrowRight size={16} /></span>
      </Link>
      <div className="product-card-info">
        <div>
          <p className="eyebrow">{product.category}</p>
          <Link href={`/product/${product.id}`} className="product-name" data-testid={`link-product-name-${product.id}`}>{product.name}</Link>
        </div>
        <div className="product-card-buy">
          <div className="price-line">
            <span>{formatPrice(product.price)}</span>
            {product.compareAtPrice && <del>{formatPrice(product.compareAtPrice)}</del>}
          </div>
          <button
            className={`quick-add ${added ? 'is-added' : ''}`}
            type="button"
            onClick={quickAdd}
            data-testid={`button-quick-add-${product.id}`}
            aria-label={`Add ${product.name} to cart`}
          >
            {added ? <Check size={16} /> : <Plus size={16} />}
          </button>
        </div>
      </div>
    </article>
  );
}

export function Header() {
  const [location] = useLocation();
  const { itemCount } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartPulse, setCartPulse] = useState(false);

  useEffect(() => {
    if (itemCount) {
      setCartPulse(true);
      const timer = window.setTimeout(() => setCartPulse(false), 500);
      return () => window.clearTimeout(timer);
    }
    return undefined;
  }, [itemCount]);

  return (
    <>
      <div className="announcement"><Sparkles size={12} /> Free delivery on orders over $75 <span>·</span> Made for slower mornings</div>
      <header className="site-header">
        <div className="header-inner">
          <button className="mobile-menu-button" type="button" onClick={() => setMobileOpen(!mobileOpen)} data-testid="button-mobile-menu" aria-label="Toggle menu">
            {mobileOpen ? <X size={21} /> : <span className="menu-lines"><i /><i /></span>}
          </button>
          <Link href="/" className="wordmark" data-testid="link-home">
            <span className="wordmark-mark">M</span>
            <span>Morrow <em>Supply</em></span>
          </Link>
          <nav className={`main-nav ${mobileOpen ? 'is-open' : ''}`} aria-label="Main navigation">
            <Link href="/shop" className={location === '/shop' ? 'active' : ''} onClick={() => setMobileOpen(false)} data-testid="link-shop">Shop</Link>
            <Link href="/#edit" onClick={() => setMobileOpen(false)} data-testid="link-edit">The edit</Link>
            <Link href="/#story" onClick={() => setMobileOpen(false)} data-testid="link-story">Our point of view</Link>
          </nav>
          <div className="header-actions">
            <Link href="/shop" className="header-search" aria-label="Search products" data-testid="link-search"><Search size={18} /></Link>
            <Link href="/cart" className={`cart-link ${cartPulse ? 'animate-cart-pop' : ''}`} data-testid="link-cart">
              <ShoppingBag size={18} />
              <span>Bag</span>
              {itemCount > 0 && <b data-testid="text-cart-count">{itemCount}</b>}
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="footer-brand">
          <Link href="/" className="wordmark" data-testid="link-footer-home"><span className="wordmark-mark">M</span><span>Morrow <em>Supply</em></span></Link>
          <p>Objects for the hours<br />you want to keep.</p>
        </div>
        <div className="footer-links">
          <div><p className="eyebrow">Explore</p><Link href="/shop" data-testid="link-footer-shop">Shop all</Link><Link href="/#edit" data-testid="link-footer-edit">The edit</Link></div>
          <div><p className="eyebrow">Care</p><Link href="/cart" data-testid="link-footer-cart">Your bag</Link><button type="button" onClick={() => window.alert('Write to us at hello@morrow.supply')} data-testid="button-footer-contact">Contact</button></div>
          <div className="footer-note"><p className="eyebrow">A small note</p><p>We believe the everyday deserves better materials, fewer things, and a little more time.</p></div>
        </div>
      </div>
      <div className="footer-bottom"><span>© 2024 Morrow Supply Co.</span><span>Designed for the unhurried</span></div>
    </footer>
  );
}

export function StoreShell({ children }: { children: ReactNode }) {
  return <div className="morrow-grain min-h-[100dvh]"><Header />{children}<Footer /></div>;
}

export function SectionHeading({ kicker, title, copy }: { kicker: string; title: string; copy?: string }) {
  return <div className="section-heading"><p className="eyebrow">{kicker}</p><h2>{title}</h2>{copy && <p className="section-copy">{copy}</p>}</div>;
}

export function CartSummary({ handoff = false }: { handoff?: boolean }) {
  const { subtotal, itemCount } = useCart();
  const shipping = subtotal >= 75 || subtotal === 0 ? 0 : 8;
  const total = subtotal + shipping;
  return (
    <aside className="cart-summary">
      <div className="summary-heading"><span>Order summary</span><span>{itemCount} {itemCount === 1 ? 'piece' : 'pieces'}</span></div>
      <div className="summary-row"><span>Subtotal</span><strong>{formatPrice(subtotal)}</strong></div>
      <div className="summary-row"><span>Delivery</span><strong>{shipping === 0 ? 'Free' : formatPrice(shipping)}</strong></div>
      <div className="summary-total"><span>Total</span><strong>{formatPrice(total)}</strong></div>
      {handoff ? (
        <div className="handoff-note" data-testid="status-checkout-handoff"><Check size={17} /><span>Ready to connect checkout when you are. No payment has been taken.</span></div>
      ) : (
        <Link href="/cart" className={`button button-dark ${itemCount === 0 ? 'button-disabled' : ''}`} data-testid="button-review-bag">
          Review your bag <ArrowRight size={16} />
        </Link>
      )}
      <p className="secure-note">Thoughtful packing · carbon-neutral delivery</p>
    </aside>
  );
}

export function CartDrawerMini({ onClose }: { onClose: () => void }) {
  const { lines, removeItem, updateQuantity } = useCart();
  const lineProducts = useMemo(() => lines.map((line) => ({ ...line, product: products.find((product) => product.id === line.productId) })).filter((line) => line.product), [lines]);
  return (
    <div className="cart-drawer-overlay" onClick={onClose} role="presentation">
      <aside className="cart-drawer" onClick={(event) => event.stopPropagation()} aria-label="Cart drawer">
        <div className="drawer-header"><h2>Your bag</h2><button type="button" onClick={onClose} data-testid="button-close-cart"><X size={18} /></button></div>
        {lineProducts.length === 0 ? <div className="drawer-empty"><ShoppingBag size={24} /><p>Your bag is waiting for its first good thing.</p><Link href="/shop" className="text-link" onClick={onClose} data-testid="link-drawer-shop">Browse the collection <ArrowRight size={14} /></Link></div> :
          <div className="drawer-lines">{lineProducts.map(({ product, quantity, variant }) => product && <div className="drawer-line" key={`${product.id}-${variant}`}><ProductVisual product={product} /><div><Link href={`/product/${product.id}`} onClick={onClose}>{product.name}</Link><p>{formatPrice(product.price)} · {quantity}</p><button type="button" onClick={() => removeItem(product.id, variant)} data-testid={`button-drawer-remove-${product.id}`}>Remove</button><div className="drawer-quantity"><button type="button" onClick={() => updateQuantity(product.id, quantity - 1, variant)} aria-label="Decrease"><Minus size={12} /></button><span>{quantity}</span><button type="button" onClick={() => updateQuantity(product.id, quantity + 1, variant)} aria-label="Increase"><Plus size={12} /></button></div></div></div>)}</div>}
        <Link href="/cart" className="button button-dark drawer-checkout" onClick={onClose} data-testid="link-drawer-cart">View full bag <ArrowRight size={16} /></Link>
      </aside>
    </div>
  );
}