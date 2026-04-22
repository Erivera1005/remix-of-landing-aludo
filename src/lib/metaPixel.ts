// Meta Pixel helper functions

declare global {
  interface Window {
    fbq: (...args: unknown[]) => void;
  }
}

const canTrack = () => typeof window !== 'undefined' && typeof window.fbq === 'function';

export const trackPageView = () => {
  if (canTrack()) {
    window.fbq('track', 'PageView');
  }
};

export const trackViewContent = (product: {
  id: number;
  name: string;
  price: number;
  color: string;
}) => {
  if (canTrack()) {
    window.fbq('track', 'ViewContent');
  }
};

export const trackAddToCart = (product: {
  id: number;
  name: string;
  price: number;
  color: string;
  quantity: number;
}) => {
  if (canTrack()) {
    window.fbq('track', 'AddToCart');
  }
};

export const trackInitiateCheckout = (totalValue: number, items: { id: number; quantity: number }[]) => {
  if (canTrack()) {
    window.fbq('track', 'InitiateCheckout');
  }
};

export const trackWhatsAppInitiateCheckout = () => {
  if (canTrack()) {
    window.fbq('track', 'InitiateCheckout');
  }
};

export const trackPurchase = (value: number = 119900) => {
  if (canTrack()) {
    window.fbq('track', 'Purchase', { value, currency: 'COP' });
  }
};

export const trackLead = (value: number) => {
  if (canTrack()) {
    window.fbq('track', 'Lead', {
      value,
      currency: 'COP',
    });
  }
};
