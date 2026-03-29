// Meta Pixel helper functions

declare global {
  interface Window {
    fbq: (...args: unknown[]) => void;
  }
}

export const trackViewContent = (product: {
  id: number;
  name: string;
  price: number;
  color: string;
}) => {
  if (typeof window.fbq === 'function') {
    window.fbq('track', 'ViewContent', {
      content_name: product.name,
      content_ids: [String(product.id)],
      content_type: 'product',
      value: product.price,
      currency: 'COP',
      contents: [{ id: String(product.id), quantity: 1 }],
    });
  }
};

export const trackAddToCart = (product: {
  id: number;
  name: string;
  price: number;
  color: string;
  quantity: number;
}) => {
  if (typeof window.fbq === 'function') {
    window.fbq('track', 'AddToCart', {
      content_name: product.name,
      content_ids: [String(product.id)],
      content_type: 'product',
      value: product.price * product.quantity,
      currency: 'COP',
      contents: [{ id: String(product.id), quantity: product.quantity }],
    });
  }
};

export const trackInitiateCheckout = (totalValue: number, items: { id: number; quantity: number }[]) => {
  if (typeof window.fbq === 'function') {
    window.fbq('track', 'InitiateCheckout', {
      value: totalValue,
      currency: 'COP',
      content_type: 'product',
      contents: items.map(i => ({ id: String(i.id), quantity: i.quantity })),
      num_items: items.reduce((sum, i) => sum + i.quantity, 0),
    });
  }
};
