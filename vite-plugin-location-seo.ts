import type { Plugin } from 'vite';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { CITIES_DATA } from './src/data/citiesData';
import {
  getCitySEO,
  injectSEOMetadataIntoHtml,
  DEFAULT_PAGE_SEO,
  PageSEOMetadata,
} from './src/utils/seo';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ALIAS_MAP: Record<string, string> = {
  koimbotur: 'coimbatore',
  coimbatore: 'coimbatore',
  maysuru: 'mysuru',
  mysore: 'mysuru',
  mysuru: 'mysuru',
  bengaluru: 'bangalore',
  bangalore: 'bangalore',
  vizag: 'visakhapatnam',
  vishakapatnam: 'visakhapatnam',
  visakhapatnam: 'visakhapatnam',
  trivandrum: 'thiruvananthapuram',
  triventanampuram: 'thiruvananthapuram',
  thiruvananthapuram: 'thiruvananthapuram',
  hyderabad: 'hyderabad',
  pune: 'pune',
  nagpur: 'nagpur',
  chennai: 'chennai',
  kochi: 'kochi',
  cochin: 'kochi',
};

function resolveSEOForPath(urlPath: string): PageSEOMetadata | null {
  if (!urlPath) return null;
  const cleanPath = urlPath.split('?')[0].split('#')[0];
  const slug = cleanPath.replace(/^\/(locations\/)?/, '').replace(/\/$/, '').toLowerCase();

  // 1. Check city or alias
  const cityKey = ALIAS_MAP[slug] || slug;
  if (cityKey && CITIES_DATA[cityKey]) {
    return getCitySEO(CITIES_DATA[cityKey]);
  }

  // 2. Check static page defaults
  const normalizedPath = cleanPath === '' ? '/' : cleanPath;
  if (DEFAULT_PAGE_SEO[normalizedPath]) {
    return DEFAULT_PAGE_SEO[normalizedPath];
  }

  return null;
}

export function locationSeoPlugin(): Plugin {
  return {
    name: 'vite-plugin-location-seo',
    transformIndexHtml(html, ctx) {
      const requestPath = ctx?.originalUrl || ctx?.path || '';
      const seo = resolveSEOForPath(requestPath);
      if (seo) {
        return injectSEOMetadataIntoHtml(html, seo);
      }
      return html;
    },
    closeBundle() {
      // Run static HTML generation for all city routes during production build
      try {
        const outDir = path.resolve(__dirname, 'dist');
        const indexHtmlPath = path.join(outDir, 'index.html');
        if (!fs.existsSync(indexHtmlPath)) return;

        const baseHtml = fs.readFileSync(indexHtmlPath, 'utf-8');

        // 1. Generate for every city
        Object.entries(CITIES_DATA).forEach(([cityId, city]) => {
          const citySeo = getCitySEO(city);
          const cityHtml = injectSEOMetadataIntoHtml(baseHtml, citySeo);

          // Direct /:cityId
          const directDir = path.join(outDir, cityId);
          if (!fs.existsSync(directDir)) fs.mkdirSync(directDir, { recursive: true });
          fs.writeFileSync(path.join(directDir, 'index.html'), cityHtml, 'utf-8');

          // Legacy /locations/:cityId
          const locDir = path.join(outDir, 'locations', cityId);
          if (!fs.existsSync(locDir)) fs.mkdirSync(locDir, { recursive: true });
          fs.writeFileSync(path.join(locDir, 'index.html'), cityHtml, 'utf-8');
        });

        // 2. Generate for aliases
        Object.entries(ALIAS_MAP).forEach(([alias, targetCityId]) => {
          if (alias === targetCityId) return;
          const city = CITIES_DATA[targetCityId];
          if (!city) return;
          const citySeo = getCitySEO(city);
          const cityHtml = injectSEOMetadataIntoHtml(baseHtml, citySeo);

          const directDir = path.join(outDir, alias);
          if (!fs.existsSync(directDir)) fs.mkdirSync(directDir, { recursive: true });
          fs.writeFileSync(path.join(directDir, 'index.html'), cityHtml, 'utf-8');

          const locDir = path.join(outDir, 'locations', alias);
          if (!fs.existsSync(locDir)) fs.mkdirSync(locDir, { recursive: true });
          fs.writeFileSync(path.join(locDir, 'index.html'), cityHtml, 'utf-8');
        });

        // 3. Generate for standard static pages (/products, /our-work, /contact, /gallery)
        const staticPages = ['products', 'our-work', 'contact', 'gallery'];
        staticPages.forEach((pageSlug) => {
          const pagePath = `/${pageSlug}`;
          const pageSeo = DEFAULT_PAGE_SEO[pagePath];
          if (pageSeo) {
            const pageHtml = injectSEOMetadataIntoHtml(baseHtml, pageSeo);
            const pageDir = path.join(outDir, pageSlug);
            if (!fs.existsSync(pageDir)) fs.mkdirSync(pageDir, { recursive: true });
            fs.writeFileSync(path.join(pageDir, 'index.html'), pageHtml, 'utf-8');
          }
        });

        console.log('[locationSeoPlugin] Successfully pre-rendered static SEO HTML pages for all cities and routes.');
      } catch (err) {
        console.warn('[locationSeoPlugin] Warning during closeBundle:', err);
      }
    },
  };
}
