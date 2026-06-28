## Objetivo

Implementar Meta Conversions API (CAPI) en el backend para complementar el Pixel ya configurado, con deduplicación por `event_id` para que Meta cuente cada acción **una sola vez** aunque lleguen por ambos canales (o solo por uno). La lógica de carrito en localStorage no se toca.

## Eventos a enviar

| Evento | Disparador en la UI | Datos clave |
|---|---|---|
| `PageView` | Carga inicial + cada cambio de ruta en SPA | `event_source_url`, `fbp`, `fbc` |
| `AddToCart` | Click en "COMPRAR AHORA" en `/product/:id` | `value` (precio × cantidad), `currency: COP`, `content_ids`, `content_name`, `content_type: product` |
| `Purchase` | Click en "PAGAR POR WHATSAPP" en `/datos-envio` (justo antes de abrir WhatsApp) | `value` (total del carrito), `currency: COP`, `contents[]`, datos hasheados del comprador (nombre, teléfono, ciudad, documento) |

## Arquitectura

```text
Browser (React)                     Lovable Cloud (Edge Function)        Meta
─────────────────                   ──────────────────────────────       ──────
1. genera event_id (uuid)
2. fbq('track', evento, data,
        { eventID: event_id })  ─────────────────────────────────────►  Pixel
3. POST /meta-capi ────────────►   valida + hashea PII (SHA-256)
                                   reenvía con MISMO event_id  ───────►  CAPI
```

Meta deduplica automáticamente cuando ambos eventos llegan con el mismo `event_name` + `event_id` dentro de 48h. Si solo llega uno, también se registra. Cubre los 4 casos que pediste.

## Pasos de implementación

### 1. Activar Lovable Cloud
Lo intenté pero falló. Volveré a intentarlo al inicio del build. Necesario para alojar la edge function que guarda el token CAPI sin exponerlo al navegador.

### 2. Guardar secretos
- `META_PIXEL_ID = 943491058154610`
- `META_CAPI_ACCESS_TOKEN = EAANANeTlfS0...` (token largo)
- `META_TEST_EVENT_CODE = TEST58310` (activable/desactivable; al pasar a producción se quita)

### 3. Edge function `meta-capi`
Pública (sin JWT), valida payload con Zod, hashea PII con SHA-256, llama a:
`POST https://graph.facebook.com/v19.0/{pixel_id}/events?access_token={token}`

Payload reenviado:
```json
{
  "data": [{
    "event_name": "Purchase",
    "event_time": 1730000000,
    "event_id": "<uuid del cliente>",
    "event_source_url": "https://www.tiendaaludo.com/datos-envio",
    "action_source": "website",
    "user_data": {
      "em": ["<sha256>"], "ph": ["<sha256>"],
      "fn": ["<sha256>"], "ct": ["<sha256>"],
      "country": ["<sha256 de 'co'>"],
      "client_ip_address": "...", "client_user_agent": "...",
      "fbp": "...", "fbc": "..."
    },
    "custom_data": { "currency": "COP", "value": 149900, "contents": [...] }
  }],
  "test_event_code": "TEST58310"
}
```

### 4. Helper frontend `src/lib/metaEvents.ts`
Una sola función `trackMetaEvent(eventName, customData, userData?)` que:
1. Genera `event_id = crypto.randomUUID()`
2. Lee `_fbp` y `_fbc` de cookies (los pone el pixel automáticamente)
3. Llama `window.fbq('track', eventName, customData, { eventID: event_id })`
4. Llama `supabase.functions.invoke('meta-capi', { body: { event_name, event_id, custom_data, user_data, event_source_url: location.href } })`
5. Falla en silencio si una de las dos vías falla (no rompe UX).

### 5. Wire-up en la UI
- **PageView SPA**: nuevo `<MetaPageView />` montado en `App.tsx` que escucha `useLocation()` y dispara en cada cambio de ruta. Mantengo el `fbq('track','PageView')` actual de `index.html` para la primera carga (con el mismo helper en el primer render para mandar también vía CAPI).
- **AddToCart**: en `ProductDetail.tsx → handleAddToCart`, después de añadir al carrito, disparar `trackMetaEvent('AddToCart', { value: price*qty, currency: 'COP', content_ids: [product.id], content_name, content_type: 'product' })`.
- **Purchase**: en `ShippingData.tsx → handleSubmit`, después de validar y antes de `navigate('/checkout')` (que abre WhatsApp), disparar `trackMetaEvent('Purchase', { value: getTotalPrice(), currency: 'COP', contents: [...] }, { email?, phone, first_name, city, country: 'co' })`. Los datos del form se hashean dentro de la edge function.

### 6. Limpieza del pixel actual
Hoy `index.html` ya tiene `fbq('track','PageView')` y el `<noscript>` está dentro del `<head>`. Lo muevo al `<body>` (HTML5) y, en el snippet de PageView inicial, paso un `eventID` que también enviaré a CAPI desde un módulo cargado al boot para deduplicar la primera vista.

### 7. Test desde Meta Events Manager
Con `test_event_code=TEST58310` activo, navegar → ver eventos en "Pruebas de eventos". Cada evento debe aparecer **una sola vez** marcado como "Procesado vía Browser + Server" (deduplicado). Al confirmar, quito el `TEST58310` para producción (o lo dejo como secret opcional para reactivar pruebas).

## Detalles técnicos

- **No tocar localStorage del carrito** ni el flujo de WhatsApp; CAPI es paralelo.
- **Hashing**: solo email, phone (E.164 sin `+`), first_name, city, country. IP y user_agent se mandan en claro (los toma la edge function de la request). `fbp`/`fbc` se mandan tal cual.
- **Phone normalization**: quitar todo lo que no sea dígito y anteponer `57` si tiene 10 dígitos.
- **Currency value**: número entero en COP (Meta acepta enteros).
- **CORS**: edge function con `corsHeaders` para llamadas desde `tiendaaludo.com` y el preview de Lovable.
- **Errores**: la función responde 200 incluso si Meta rechaza un evento individual (loguea para diagnóstico), para no romper UX si Meta tiene latencia.

## Archivos nuevos / modificados

- `supabase/functions/meta-capi/index.ts` (nuevo)
- `src/lib/metaEvents.ts` (nuevo)
- `src/components/MetaPageView.tsx` (nuevo)
- `src/App.tsx` (montar `MetaPageView`)
- `src/pages/ProductDetail.tsx` (AddToCart)
- `src/pages/ShippingData.tsx` (Purchase)
- `index.html` (mover `<noscript>` pixel al body, asignar eventID inicial)
- Secrets: `META_PIXEL_ID`, `META_CAPI_ACCESS_TOKEN`, `META_TEST_EVENT_CODE`
