import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { CityInfo, CITIES_DATA } from '../data/citiesData';
import {
  PageSEOMetadata,
  getCitySEO,
  updateDocumentSEO,
  DEFAULT_PAGE_SEO,
} from '../utils/seo';
import { getStoredLocationId } from '../utils/locationStorage';

interface SEOHeadProps {
  city?: CityInfo | null;
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  jsonLd?: Record<string, any>;
}

export default function SEOHead({
  city,
  title,
  description,
  keywords,
  canonical,
  jsonLd,
}: SEOHeadProps = {}) {
  const location = useLocation();

  useEffect(() => {
    // 1. If explicit city prop provided
    if (city) {
      const citySeo = getCitySEO(city);
      updateDocumentSEO({
        ...citySeo,
        ...(title ? { title } : {}),
        ...(description ? { description } : {}),
        ...(keywords ? { keywords } : {}),
        ...(canonical ? { canonical } : {}),
        ...(jsonLd ? { jsonLd } : {}),
      });
      return;
    }

    // 2. If route matches a city directly (e.g. /chennai or /locations/chennai)
    const pathSlug = location.pathname.replace(/^\/(locations\/)?/, '').toLowerCase();
    if (pathSlug && CITIES_DATA[pathSlug]) {
      const citySeo = getCitySEO(CITIES_DATA[pathSlug]);
      updateDocumentSEO({
        ...citySeo,
        ...(title ? { title } : {}),
        ...(description ? { description } : {}),
        ...(keywords ? { keywords } : {}),
        ...(canonical ? { canonical } : {}),
        ...(jsonLd ? { jsonLd } : {}),
      });
      return;
    }

    // 3. If explicit custom props provided for a page
    if (title || description) {
      updateDocumentSEO({
        title: title || DEFAULT_PAGE_SEO['/'].title,
        description: description || DEFAULT_PAGE_SEO['/'].description,
        keywords,
        canonical: canonical || window.location.href,
        jsonLd,
      });
      return;
    }

    // 4. Default static page SEO by path
    const pageDefault = DEFAULT_PAGE_SEO[location.pathname];
    if (pageDefault) {
      updateDocumentSEO(pageDefault);
      return;
    }

    // 5. Fallback: Check stored location if on Home page
    const storedCityId = getStoredLocationId();
    if (storedCityId && CITIES_DATA[storedCityId] && location.pathname === '/') {
      const storedCity = CITIES_DATA[storedCityId];
      const citySeo = getCitySEO(storedCity);
      updateDocumentSEO(citySeo);
      return;
    }

    updateDocumentSEO(DEFAULT_PAGE_SEO['/']);
  }, [city, title, description, keywords, canonical, jsonLd, location.pathname]);

  return null;
}
