// Meta Conversions API (CAPI) — server-side event forwarder
// Receives events from the browser and forwards them to Meta with the same
// event_id used by the Pixel for automatic deduplication.

import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

const PIXEL_ID = Deno.env.get("META_PIXEL_ID")!;
const ACCESS_TOKEN = Deno.env.get("META_CAPI_ACCESS_TOKEN")!;
const TEST_EVENT_CODE = Deno.env.get("META_TEST_EVENT_CODE") || "";

const GRAPH_URL = `https://graph.facebook.com/v19.0/${PIXEL_ID}/events`;

async function sha256(input: string): Promise<string> {
  const data = new TextEncoder().encode(input);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

const norm = (v: unknown) => (typeof v === "string" ? v.trim().toLowerCase() : "");
const normPhone = (v: unknown) => {
  if (typeof v !== "string") return "";
  const digits = v.replace(/\D/g, "");
  if (!digits) return "";
  // Colombia: if 10 digits, prepend 57
  if (digits.length === 10) return `57${digits}`;
  return digits;
};

async function hashIfPresent(v: string): Promise<string[] | undefined> {
  if (!v) return undefined;
  return [await sha256(v)];
}

function getClientIp(req: Request): string | undefined {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return req.headers.get("cf-connecting-ip") || undefined;
}

interface UserDataIn {
  email?: string;
  phone?: string;
  first_name?: string;
  last_name?: string;
  city?: string;
  country?: string;
  external_id?: string;
  fbp?: string;
  fbc?: string;
}

interface EventIn {
  event_name: string;
  event_id: string;
  event_source_url?: string;
  custom_data?: Record<string, unknown>;
  user_data?: UserDataIn;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    if (!PIXEL_ID || !ACCESS_TOKEN) {
      return new Response(
        JSON.stringify({ error: "Meta CAPI not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const body = (await req.json()) as EventIn;

    if (!body?.event_name || !body?.event_id) {
      return new Response(
        JSON.stringify({ error: "Missing event_name or event_id" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const u = body.user_data ?? {};
    const userData: Record<string, unknown> = {
      em: await hashIfPresent(norm(u.email)),
      ph: await hashIfPresent(normPhone(u.phone)),
      fn: await hashIfPresent(norm(u.first_name)),
      ln: await hashIfPresent(norm(u.last_name)),
      ct: await hashIfPresent(norm(u.city)),
      country: await hashIfPresent(norm(u.country) || "co"),
      external_id: await hashIfPresent(norm(u.external_id)),
      client_ip_address: getClientIp(req),
      client_user_agent: req.headers.get("user-agent") || undefined,
      fbp: u.fbp || undefined,
      fbc: u.fbc || undefined,
    };

    // Strip undefined values
    for (const k of Object.keys(userData)) {
      if (userData[k] === undefined) delete userData[k];
    }

    const event = {
      event_name: body.event_name,
      event_time: Math.floor(Date.now() / 1000),
      event_id: body.event_id,
      event_source_url: body.event_source_url,
      action_source: "website",
      user_data: userData,
      custom_data: body.custom_data ?? {},
    };

    const payload: Record<string, unknown> = { data: [event] };
    if (TEST_EVENT_CODE) payload.test_event_code = TEST_EVENT_CODE;

    const url = `${GRAPH_URL}?access_token=${encodeURIComponent(ACCESS_TOKEN)}`;
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const meta = await res.json().catch(() => ({}));

    if (!res.ok) {
      console.error("Meta CAPI error", res.status, meta);
    } else {
      console.log("Meta CAPI ok", body.event_name, body.event_id, meta);
    }

    // Always 200 to avoid breaking UX; report status in body
    return new Response(
      JSON.stringify({ ok: res.ok, meta_status: res.status, meta }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    console.error("meta-capi exception", err);
    return new Response(
      JSON.stringify({ ok: false, error: String(err) }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
