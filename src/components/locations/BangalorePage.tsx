import React from 'react';
import CityPageLayout from './CityPageLayout';
import { CITIES_DATA } from '../../data/citiesData';

export default function BangalorePage() {
  return <CityPageLayout city={CITIES_DATA.bangalore} />;
}
