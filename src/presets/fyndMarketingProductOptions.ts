/**
 * Canonical "Product interested" select options used in the Fynd
 * marketing ContactForm. Sourced from the live Webflow Book-a-demo form
 * — keep in sync with the marketing team's source of truth.
 *
 * Used as the default for `FyndMarketingNavActions.productOptions`.
 * Consumers can override via the prop, or import this list directly
 * for their own ContactForm composition.
 */
export const fyndMarketingProductOptions: ReadonlyArray<string> = [
  'Building a website',
  'Supply chain solutions',
  'Retail store solutions',
  'Sell on Marketplaces',
  'AI solutions',
  'Fashion manufacturing solution',
];
