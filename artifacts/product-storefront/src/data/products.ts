export type Product = {
  id: string;
  name: string;
  category: 'Kitchen' | 'Desk' | 'Bath' | 'Objects';
  description: string;
  price: number;
  compareAtPrice?: number;
  image: 'stoneware' | 'linen' | 'candle' | 'glass' | 'wood' | 'soap' | 'paper' | 'brass' | 'tea';
  colors?: string[];
  variants?: string[];
  badge?: string;
  details: string[];
  material: string;
  dimensions: string;
}

export const products: Product[] = [
  {
    id: 'dawn-stoneware-mug',
    name: 'Dawn Stoneware Mug',
    category: 'Kitchen',
    description: 'A generous, hand-thrown mug with a quiet satin glaze made for the first pour.',
    price: 34,
    compareAtPrice: 42,
    image: 'stoneware',
    colors: ['Oat', 'Moss', 'Chalk'],
    badge: 'Morrow favourite',
    details: ['Hand-thrown in small batches', 'Dishwasher and microwave safe', 'Glazed interior, raw foot'],
    material: 'High-fired stoneware',
    dimensions: '10 oz · 3.5 in tall',
  },
  {
    id: 'quiet-hour-linen',
    name: 'Quiet Hour Linen',
    category: 'Kitchen',
    description: 'Soft, washed linen that turns an ordinary table into a place worth lingering.',
    price: 48,
    image: 'linen',
    colors: ['Clay', 'Parchment'],
    badge: 'New',
    details: ['European flax linen', 'Pre-washed for a lived-in hand', 'Finished with a narrow hem'],
    material: '100% Belgian linen',
    dimensions: '20 × 28 in',
  },
  {
    id: 'ember-candle',
    name: 'Ember No. 02 Candle',
    category: 'Objects',
    description: 'Cedar smoke, bergamot peel, and the warmth of a room after everyone has gone home.',
    price: 42,
    image: 'candle',
    badge: 'Slow burn',
    details: ['40 hour burn time', 'Cotton wick, hand-poured', 'Reusable amber glass vessel'],
    material: 'Soy and beeswax blend',
    dimensions: '8 oz · 3.2 in diameter',
  },
  {
    id: 'tide-glass-carafe',
    name: 'Tide Glass Carafe',
    category: 'Kitchen',
    description: 'A softly rippled carafe that makes keeping water close feel like a small ceremony.',
    price: 58,
    image: 'glass',
    colors: ['Clear', 'Smoke'],
    details: ['Mouth-blown borosilicate glass', 'Fits a standard refrigerator door', 'Pouring lip, no stopper'],
    material: 'Borosilicate glass',
    dimensions: '1.2 L · 10.5 in tall',
  },
  {
    id: 'field-notes-keeper',
    name: 'Field Notes Keeper',
    category: 'Desk',
    description: 'A linen-bound notebook with enough room for the important bits and the in-between.',
    price: 24,
    image: 'paper',
    colors: ['Sage', 'Ink'],
    details: ['128 pages of warm white paper', 'Lay-flat sewn binding', 'Back pocket for loose thoughts'],
    material: 'FSC-certified paper and linen',
    dimensions: 'A5 · 5.8 × 8.3 in',
  },
  {
    id: 'sandalwood-tray',
    name: 'Sandalwood Catch Tray',
    category: 'Objects',
    description: 'A small landing place for keys, rings, and the loose pieces of a well-lived day.',
    price: 39,
    image: 'wood',
    details: ['Carved from salvaged sandalwood', 'Finished with plant-based oil', 'Each grain pattern is unique'],
    material: 'Salvaged sandalwood',
    dimensions: '7.5 × 4.5 × 0.75 in',
  },
  {
    id: 'cloud-bar-soap',
    name: 'Cloud Bar Soap',
    category: 'Bath',
    description: 'A creamy, low-foam bar scented with oat, neroli, and a little morning air.',
    price: 16,
    compareAtPrice: 20,
    image: 'soap',
    badge: 'Bundle & save',
    details: ['Cold-process, palm-oil free', 'Three month cure', 'Paper-wrapped, plastic-free'],
    material: 'Olive, coconut, and oat oils',
    dimensions: '4.5 oz bar',
  },
  {
    id: 'brass-morning-spoon',
    name: 'Morning Brass Spoon',
    category: 'Kitchen',
    description: 'A slender, weighty spoon for the teaspoon of honey that changes the whole cup.',
    price: 22,
    image: 'brass',
    details: ['Solid unlacquered brass', 'Develops a soft patina over time', 'Polish cloth included'],
    material: 'Solid brass',
    dimensions: '6.2 in long',
  },
  {
    id: 'hearth-tea-no-04',
    name: 'Hearth Tea No. 04',
    category: 'Kitchen',
    description: 'A grounding blend of hojicha, toasted rice, and cacao husk for unhurried afternoons.',
    price: 26,
    image: 'tea',
    badge: 'Limited harvest',
    details: ['Small-batch blended in Portland', '20 compostable sachets', 'Caffeine-light roasted green tea'],
    material: 'Hojicha, genmaicha, cacao husk',
    dimensions: '2.8 oz · 20 sachets',
  },
];

export const categories = ['All', 'Kitchen', 'Desk', 'Bath', 'Objects'] as const;

export function getProduct(id: string) {
  return products.find((product) => product.id === id);
}