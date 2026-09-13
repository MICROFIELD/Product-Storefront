import { useState } from 'react';
import { Link } from 'wouter';
import { ArrowRight, Check, ChevronLeft, PackageOpen, Trash2 } from 'lucide-react';
import { products } from '@/data/products';
import { useCart } from '@/hooks/use-cart';
import { CartSummary, formatPrice, ProductVisual, QuantityControl } from '@/components/storefront';

export default function CartPage() {
  const { lines, updateQuantity, removeItem, clearCart } = useCart();
  const [handoff, setHandoff] = useState(false);
  const cartLines = lines.map((line) => ({ ...line, product: products.find((product) => product.id === line.productId) })).filter((line) => line.product);

  if (cartLines.length === 0) {
    return <main className="empty-cart page-width"><div className="empty-cart-mark"><PackageOpen size={30} /></div><p className="eyebrow">Your bag / 00</p><h1>Nothing here<br /><i>just yet.</i></h1><p className="empty-cart-copy">The best things take a little looking. Find something useful, beautiful, or both.</p><Link href="/shop" className="button button-dark" data-testid="button-empty-shop">Browse the collection <ArrowRight size={16} /></Link><div className="empty-cart-footnote">Free delivery on orders over $75</div></main>;
  }

  return (
    <main className="cart-page page-width">
      <div className="cart-title-row"><div><p className="eyebrow">Your bag / {String(lines.length).padStart(2, '0')}</p><h1>Good choices.</h1></div><Link href="/shop" className="text-link" data-testid="link-cart-continue"><ChevronLeft size={14} /> Keep browsing</Link></div>
      <div className="cart-layout">
        <section className="cart-lines" aria-label="Cart items">
          <div className="cart-lines-head"><span>Object</span><span>Quantity</span><span>Total</span></div>
          {cartLines.map(({ product, quantity, variant }) => product && <div className="cart-line" key={`${product.id}-${variant}`} data-testid={`row-cart-${product.id}`}><Link href={`/product/${product.id}`} className="cart-line-image" data-testid={`link-cart-product-${product.id}`}><ProductVisual product={product} /></Link><div className="cart-line-info"><p className="eyebrow">{product.category}</p><Link href={`/product/${product.id}`} data-testid={`link-cart-name-${product.id}`}>{product.name}</Link>{variant && <span>{variant}</span>}<button type="button" className="remove-line" onClick={() => removeItem(product.id, variant)} data-testid={`button-remove-${product.id}`}><Trash2 size={13} /> Remove</button></div><QuantityControl quantity={quantity} onDecrease={() => updateQuantity(product.id, quantity - 1, variant)} onIncrease={() => updateQuantity(product.id, quantity + 1, variant)} testId={`cart-${product.id}`} /><strong className="cart-line-total">{formatPrice(product.price * quantity)}</strong></div>)}
          <div className="cart-line-actions"><button type="button" onClick={clearCart} data-testid="button-clear-cart">Clear bag</button><span><Check size={14} /> Packed with care, always</span></div>
        </section>
        <div className="cart-sidebar">{handoff ? <div className="checkout-ready"><div className="checkout-ready-mark"><Check size={22} /></div><p className="eyebrow">Ready when you are</p><h2>Your bag is<br /><i>good to go.</i></h2><p>Checkout is not connected in this preview. Your order summary is saved and ready to hand off to a payment flow.</p><button type="button" className="button button-outline" onClick={() => setHandoff(false)} data-testid="button-return-to-summary">Return to summary</button></div> : <><CartSummary handoff={false} /><button type="button" className="button button-dark checkout-button" onClick={() => setHandoff(true)} data-testid="button-checkout">Continue to checkout <ArrowRight size={16} /></button><p className="checkout-caption">You will not be charged in this preview.</p></>}</div>
      </div>
    </main>
  );
}