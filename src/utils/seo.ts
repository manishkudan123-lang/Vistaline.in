import { CityInfo, CITIES_DATA } from '../data/citiesData';

export interface PageSEOMetadata {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogUrl?: string;
  ogImage?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  jsonLd?: Record<string, any>;
}

export const BASE_URL = 'https://vistaline.in';
export const DEFAULT_OG_IMAGE = 'https://vistaline.in/og-image.png';

/**
 * Standard SEO data for non-city static routes.
 */
export const DEFAULT_PAGE_SEO: Record<string, PageSEOMetadata> = {
  '/': {
    title: 'VISTALINE — Premium Aluminium & Glass Partition Systems | Hyderabad, India',
    description: 'Vistaline is a premium aluminium and glass partition specialist. Design, supply and turnkey installation of modular office cabins, acoustic soundproof glass walls and architectural systems across India.',
    keywords: 'aluminium partitions, glass partitions, office partitions, modular partitions, BLR profiles, Vistaline, acoustic glass partition, office cabin India',
    canonical: `${BASE_URL}/`,
    ogTitle: 'VISTALINE — Premium Aluminium & Glass Partition Systems',
    ogDescription: 'Designing, manufacturing and installing modern partition systems for offices, showrooms, hotels, schools and tech parks across India.',
    ogUrl: `${BASE_URL}/`,
  },
  '/products': {
    title: 'Aluminium Glass Partition Profiles & Systems Catalog | VISTALINE™',
    description: 'Explore Vistaline’s comprehensive catalog of architectural aluminium partition profiles: Slimline 25mm, Acoustic Double Glazed 45mm, Demountable 100mm, and Fluted glass systems.',
    keywords: 'aluminium profiles catalog, glass partition profiles, slimline 25mm, acoustic partition 45mm, demountable partition 100mm, office partition hardware',
    canonical: `${BASE_URL}/products`,
    ogTitle: 'Aluminium Partition Profiles & Hardware Catalog | VISTALINE™',
    ogDescription: 'Download and browse our complete range of architectural aluminium extrusions and glass partition profiles.',
    ogUrl: `${BASE_URL}/products`,
  },
  '/our-work': {
    title: 'Completed Glass Partition Projects & Portfolio | VISTALINE™',
    description: 'View real project installations: Corporate office cabins, tech park executive boardrooms, conference suites, and custom architectural glass partitions completed across India.',
    keywords: 'glass partition portfolio, office partition case studies, corporate glass interiors, partition project gallery',
    canonical: `${BASE_URL}/our-work`,
    ogTitle: 'Architectural Partition Projects Portfolio | VISTALINE™',
    ogDescription: 'Inspiring office fit-outs and glass partition installations completed for leading enterprises across India.',
    ogUrl: `${BASE_URL}/our-work`,
  },
  '/gallery': {
    title: 'Project Photo & Video Gallery | VISTALINE™ Partition Systems',
    description: 'Explore high-resolution photos and videos of finished aluminium and glass partitions in commercial spaces, IT campuses, and luxury offices.',
    keywords: 'glass partition photos, office interior gallery, modern cabin design, aluminium profiles gallery',
    canonical: `${BASE_URL}/gallery`,
    ogTitle: 'Photo & Video Gallery | VISTALINE™ Partitions',
    ogDescription: 'High-resolution showcase of contemporary glass partitions, slimline framing, and acoustic office installations.',
    ogUrl: `${BASE_URL}/gallery`,
  },
  '/contact': {
    title: 'Contact Vistaline — Request Quote & Free Consultation | Partitions India',
    description: 'Connect with Vistaline partition experts. Get instant pricing estimates, technical CAD drawings, and site measurement assistance for your commercial space.',
    keywords: 'contact vistaline, aluminium partition quotation, partition price per sq ft, office cabin quotation, partition manufacturer phone',
    canonical: `${BASE_URL}/contact`,
    ogTitle: 'Contact VISTALINE™ | Office Partition Systems & Quotations',
    ogDescription: 'Reach our architectural sales team at +91 8764131313 or manish@vistaline.in. Fast turnarounds on quotations & drawings.',
    ogUrl: `${BASE_URL}/contact`,
  },
};

/**
 * Generate fully optimized SEO metadata and Schema.org LocalBusiness JSON-LD for a city.
 */
export function getCitySEO(city: CityInfo): PageSEOMetadata {
  const cityUrl = `${BASE_URL}/${city.id}`;

  const title = city.metaTitle || `Aluminium & Glass Partitions in ${city.name} | VISTALINE™`;

  const description =
    city.metaDescription ||
    `${city.tagline}. Certified supply and turnkey installation of modular office cabins, acoustic soundproof glass & slimline aluminium systems in ${city.name}, ${city.state}. Call ${city.phone}.`;

  const keywords =
    (city.keywords && city.keywords.join(', ')) ||
    `aluminium partitions ${city.name.toLowerCase()}, glass partitions ${city.name.toLowerCase()}, office cabin partition ${city.name.toLowerCase()}, acoustic glass partitions ${city.name.toLowerCase()}, modular partitions ${city.name.toLowerCase()}, aluminium profiles ${city.name.toLowerCase()}, Vistaline ${city.name}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: `Vistaline Profiles Pvt. Ltd. - ${city.name}`,
    image: DEFAULT_OG_IMAGE,
    description: city.description,
    telephone: city.phone,
    email: city.email,
    url: cityUrl,
    address: {
      '@type': 'PostalAddress',
      streetAddress: city.address,
      addressLocality: city.name,
      addressRegion: city.state,
      addressCountry: 'IN',
    },
    areaServed: [city.name, city.state, 'India'],
    priceRange: '₹₹',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '150',
    },
  };

  return {
    title,
    description,
    keywords,
    canonical: cityUrl,
    ogTitle: title,
    ogDescription: description,
    ogUrl: cityUrl,
    ogImage: DEFAULT_OG_IMAGE,
    twitterTitle: title,
    twitterDescription: description,
    jsonLd,
  };
}

/**
 * Pure client-side DOM head updater.
 * Safely updates title, meta tags, canonical link, open graph, and JSON-LD schema without full-page reload.
 */
export function updateDocumentSEO(seo: PageSEOMetadata): void {
  if (typeof document === 'undefined') return;

  // 1. Update Title
  if (seo.title && document.title !== seo.title) {
    document.title = seo.title;
  }

  // Helper to upsert a meta tag
  const setMeta = (attrName: 'name' | 'property', attrVal: string, contentVal?: string) => {
    if (!contentVal) return;
    let el = document.querySelector<HTMLMetaElement>(`meta[${attrName}="${attrVal}"]`);
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(attrName, attrVal);
      document.head.appendChild(el);
    }
    el.setAttribute('content', contentVal);
  };

  // 2. Standard Meta Tags
  setMeta('name', 'description', seo.description);
  if (seo.keywords) setMeta('name', 'keywords', seo.keywords);

  // 3. Canonical Tag
  if (seo.canonical) {
    let link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    link.setAttribute('href', seo.canonical);
  }

  // 4. Open Graph Tags
  setMeta('property', 'og:title', seo.ogTitle || seo.title);
  setMeta('property', 'og:description', seo.ogDescription || seo.description);
  setMeta('property', 'og:url', seo.ogUrl || seo.canonical);
  setMeta('property', 'og:image', seo.ogImage || DEFAULT_OG_IMAGE);

  // 5. Twitter Card Tags
  setMeta('name', 'twitter:title', seo.twitterTitle || seo.title);
  setMeta('name', 'twitter:description', seo.twitterDescription || seo.description);
  setMeta('name', 'twitter:image', seo.ogImage || DEFAULT_OG_IMAGE);

  // 6. JSON-LD Structured Data
  if (seo.jsonLd) {
    let script = document.getElementById('schema-dynamic-seo') as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.id = 'schema-dynamic-seo';
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(seo.jsonLd);
  }
}

/**
 * Injects SEO metadata into a raw HTML template string.
 * Used by Vite dev server plugin and the build-time static HTML prerenderer.
 */
export function injectSEOMetadataIntoHtml(html: string, seo: PageSEOMetadata): string {
  let result = html;

  // Replace Title
  if (seo.title) {
    result = result.replace(/<title>[\s\S]*?<\/title>/i, `<title>${seo.title}</title>`);
  }

  // Replace Description
  if (seo.description) {
    result = result.replace(
      /<meta\s+name=["']description["']\s+content=["'][\s\S]*?["']\s*\/?>/i,
      `<meta name="description" content="${seo.description.replace(/"/g, '&quot;')}" />`
    );
  }

  // Replace Keywords
  if (seo.keywords) {
    result = result.replace(
      /<meta\s+name=["']keywords["']\s+content=["'][\s\S]*?["']\s*\/?>/i,
      `<meta name="keywords" content="${seo.keywords.replace(/"/g, '&quot;')}" />`
    );
  }

  // Replace Canonical Link
  if (seo.canonical) {
    result = result.replace(
      /<link\s+rel=["']canonical["']\s+href=["'][\s\S]*?["']\s*\/?>/i,
      `<link rel="canonical" href="${seo.canonical}" />`
    );
  }

  // Replace Open Graph Tags
  const ogTitle = seo.ogTitle || seo.title;
  if (ogTitle) {
    result = result.replace(
      /<meta\s+property=["']og:title["']\s+content=["'][\s\S]*?["']\s*\/?>/i,
      `<meta property="og:title" content="${ogTitle.replace(/"/g, '&quot;')}" />`
    );
  }

  const ogDescription = seo.ogDescription || seo.description;
  if (ogDescription) {
    result = result.replace(
      /<meta\s+property=["']og:description["']\s+content=["'][\s\S]*?["']\s*\/?>/i,
      `<meta property="og:description" content="${ogDescription.replace(/"/g, '&quot;')}" />`
    );
  }

  const ogUrl = seo.ogUrl || seo.canonical;
  if (ogUrl) {
    result = result.replace(
      /<meta\s+property=["']og:url["']\s+content=["'][\s\S]*?["']\s*\/?>/i,
      `<meta property="og:url" content="${ogUrl}" />`
    );
  }

  // Replace Twitter Tags
  const twitterTitle = seo.twitterTitle || seo.title;
  if (twitterTitle) {
    result = result.replace(
      /<meta\s+name=["']twitter:title["']\s+content=["'][\s\S]*?["']\s*\/?>/i,
      `<meta name="twitter:title" content="${twitterTitle.replace(/"/g, '&quot;')}" />`
    );
  }

  const twitterDescription = seo.twitterDescription || seo.description;
  if (twitterDescription) {
    result = result.replace(
      /<meta\s+name=["']twitter:description["']\s+content=["'][\s\S]*?["']\s*\/?>/i,
      `<meta name="twitter:description" content="${twitterDescription.replace(/"/g, '&quot;')}" />`
    );
  }

  // Inject or update Schema JSON-LD if provided
  if (seo.jsonLd) {
    const jsonLdTag = `<script id="schema-dynamic-seo" type="application/ld+json">\n${JSON.stringify(
      seo.jsonLd,
      null,
      2
    )}\n</script>`;
    if (result.includes('id="schema-dynamic-seo"')) {
      result = result.replace(
        /<script\s+id=["']schema-dynamic-seo["']\s+type=["']application\/ld\+json["']>[\s\S]*?<\/script>/i,
        jsonLdTag
      );
    } else {
      result = result.replace('</head>', `  ${jsonLdTag}\n</head>`);
    }
  }

  return result;
}
