import React from 'react';
import CityPageLayout from './CityPageLayout';
import { CITIES_DATA } from '../../data/citiesData';

export default function KochiPage() {
  return <CityPageLayout city={CITIES_DATA.kochi} />;
}
