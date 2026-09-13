import { useMemo, useState } from 'react';
import { ChevronDown, Search, SlidersHorizontal, X } from 'lucide-react';
import { categories, products } from '@/data/products';
import { ProductCard } from '@/components/storefront';

type SortValue = 'featured' | 'price-low' | 'price-high' | 'name';

export default function Shop() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<string>('All');
  const [sort, setSort] = useState<SortValue>('featured');
  const [mobileFilters, setMobileFilters] = useState(false);

  const visibleProducts = useMemo(() => {
    const filtered = products.filter((product) => {
      const matchesCategory = category === 'All' || product.category === category;
      const haystack = `${product.name} ${product.description} ${product.category}`.toLowerCase();
      return matchesCategory && haystack.includes(query.toLowerCase());
    });
    return [...filtered].sort((a, b) => {
      if (sort === 'price-low') return a.price - b.price;
      if (sort === 'price-high') return b.price - a.price;
      if (sort === 'name') return a.name.localeCompare(b.name);
      return products.indexOf(a) - products.indexOf(b);
    });
  }, [category, query, sort]);

  return (
    <main className="shop-page page-width">
      <div className="shop-intro">
        <p className="eyebrow">The full collection</p>
        <h1>Useful things,<br /><i>beautifully made.</i></h1>
        <p>Small-batch objects for a slower, more deliberate everyday.</p>
      </div>
      <div className="shop-tools">
        <div className="search-field"><Search size={17} /><input type="search" placeholder="Search the collection" value={query} onChange={(event) => setQuery(event.target.value)} data-testid="input-search-products" />{query && <button type="button" onClick={() => setQuery('')} data-testid="button-clear-search"><X size={15} /></button>}</div>
        <button className="mobile-filter-toggle" type="button" onClick={() => setMobileFilters(!mobileFilters)} data-testid="button-toggle-filters"><SlidersHorizontal size={16} /> Filter & sort</button>
        <div className={`shop-filters ${mobileFilters ? 'is-open' : ''}`}>
          <div className="category-pills">{categories.map((item) => <button type="button" className={category === item ? 'active' : ''} key={item} onClick={() => { setCategory(item); setMobileFilters(false); }} data-testid={`button-category-${item.toLowerCase()}`}>{item}</button>)}</div>
          <label className="sort-select"><span>Sort</span><select value={sort} onChange={(event) => setSort(event.target.value as SortValue)} data-testid="select-sort-products"><option value="featured">Featured</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option><option value="name">Name</option></select><ChevronDown size={14} /></label>
        </div>
      </div>
      <div className="collection-meta"><span data-testid="text-product-count">{visibleProducts.length} pieces</span><span>{category === 'All' ? 'Everything in its place' : category}</span></div>
      {visibleProducts.length > 0 ? <div className="product-grid shop-grid">{visibleProducts.map((product, index) => <ProductCard product={product} index={index} key={product.id} />)}</div> :
        <div className="empty-results"><Search size={22} /><h2>Nothing by that name.</h2><p>Try a different phrase or return to the full edit.</p><button type="button" className="button button-outline" onClick={() => { setQuery(''); setCategory('All'); }} data-testid="button-reset-filters">Reset filters</button></div>}
    </main>
  );
}