// Meta Pixel + Conversions API helper.
// Fires both Pixel (browser) and CAPI (server) with the same event_id
// so Meta deduplicates them into a single event.

import { supabase } from "@/integrations/supabase/client";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export interface MetaUserData {
  email?: string;
  phone?: string;
  first_name?: string;
  last_name?: string;
  city?: string;
  country?: string;
  external_id?: string;
}

export interface MetaCustomData {
  value?: number;
  currency?: string;
  content_ids?: (string | number)[];
  content_name?: string;
  content_type?: string;
  contents?: Array<{ id: string | number; quantity: number; item_price?: number }>;
  num_items?: number;
  [k: string]: unknown;
}

const getCookie = (name: string): string | undefined => {
  if (typeof document === "undefined") return undefined;
  const m = document.cookie.match(new RegExp("(?:^|; )" + name + "=([^;]*)"));
  return m ? decodeURIComponent(m[1]) : undefined;
};

const newEventId = (): string => {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
};

export async function trackMetaEvent(
  eventName: "PageView" | "AddToCart" | "Purchase" | "ViewContent" | "InitiateCheckout" | string,
  customData: MetaCustomData = {},
  userData: MetaUserData = {},
): Promise<void> {
  const eventId = newEventId();

  // 1) Pixel (browser)
  try {
    if (typeof window !== "undefined" && typeof window.fbq === "function") {
      window.fbq("track", eventName, customData, { eventID: eventId });
    }
  } catch (err) {
    console.warn("Pixel track failed", err);
  }

  // 2) CAPI (server) — same event_id for dedup
  try {
    const fbp = getCookie("_fbp");
    const fbc = getCookie("_fbc");
    await supabase.functions.invoke("meta-capi", {
      body: {
        event_name: eventName,
        event_id: eventId,
        event_source_url: typeof window !== "undefined" ? window.location.href : undefined,
        custom_data: customData,
        user_data: { ...userData, fbp, fbc },
      },
    });
  } catch (err) {
    console.warn("CAPI invoke failed", err);
  }
}
