import { Helmet } from "react-helmet-async";

const SITE_URL = "https://aludocollar.com";
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`;

interface SEOHeadProps {
  title: string;
  description: string;
  path: string;
  type?: string;
  image?: string;
  noindex?: boolean;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

const SEOHead = ({
  title,
  description,
  path,
  type = "website",
  image = DEFAULT_OG_IMAGE,
  noindex = false,
  jsonLd,
}: SEOHeadProps) => {
  const canonicalUrl = `${SITE_URL}${path}`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      <meta name="robots" content={noindex ? "noindex, nofollow" : "index, follow"} />
      <meta httpEquiv="content-language" content="es-CO" />
      <link rel="alternate" hrefLang="es-co" href={canonicalUrl} />
      <link rel="alternate" hrefLang="x-default" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={image} />
      <meta property="og:locale" content="es_CO" />
      <meta property="og:site_name" content="ALUDO" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:site" content="@ALUDO" />

      {/* JSON-LD */}
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(Array.isArray(jsonLd) ? jsonLd : jsonLd)}
        </script>
      )}
    </Helmet>
  );
};

export const ORGANIZATION_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "ALUDO",
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.ico`,
  description: "Collares inteligentes con IA para mascotas. Fabricados en Colombia con materiales ecológicos.",
  address: {
    "@type": "PostalAddress",
    addressCountry: "CO",
  },
  sameAs: [
    "https://www.instagram.com/aludocollars",
  ],
};

export const WEBSITE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "ALUDO",
  url: SITE_URL,
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE_URL}/shop?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

export const createProductSchema = (product: {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  color: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Product",
  name: `${product.name} - ${product.color}`,
  description: product.description,
  image: product.image,
  brand: {
    "@type": "Brand",
    name: "ALUDO",
  },
  color: product.color,
  offers: {
    "@type": "Offer",
    priceCurrency: "COP",
    price: product.price,
    availability: "https://schema.org/InStock",
    url: `${SITE_URL}/product/${product.id}`,
    seller: {
      "@type": "Organization",
      name: "ALUDO",
    },
  },
});

export const createBreadcrumbSchema = (
  items: { name: string; url: string }[]
) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: `${SITE_URL}${item.url}`,
  })),
});

export default SEOHead;
