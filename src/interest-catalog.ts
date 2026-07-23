// Interest-capture catalog — RajahWild
export const SITE_SLUG = 'rajah-wild';
export const ARTIST_NAME = 'RajahWild';
export type PriceTier = { key: string; label: string };
export type Product = { id: string; name: string; variants: string[]; priceTiers: PriceTier[] };
export const MERCH_TIERS: PriceTier[] = [
  { key: 't1', label: '$20 – $40' }, { key: 't2', label: '$40 – $60' }, { key: 't3', label: '$60+' }, { key: 'any', label: "Price doesn't matter" },
];
export const MERCH_PRODUCTS: Product[] = [];
export function getProduct(id: string): Product | undefined { return MERCH_PRODUCTS.find(p => p.id === id); }
