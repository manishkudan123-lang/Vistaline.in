import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import CityPageLayout from './CityPageLayout';
import { CITIES_DATA } from '../../data/citiesData';

// Map common aliases/misspellings
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

export default function CityDynamicRoute() {
  const { cityId } = useParams<{ cityId: string }>();
  const normalizedKey = (cityId || '').toLowerCase().trim();
  const canonicalId = ALIAS_MAP[normalizedKey] || normalizedKey;
  const city = CITIES_DATA[canonicalId];

  if (!city) {
    return <Navigate to="/contact" replace />;
  }

  return <CityPageLayout city={city} />;
}
