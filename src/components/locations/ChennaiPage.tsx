import React from 'react';
import CityPageLayout from './CityPageLayout';
import { CITIES_DATA } from '../../data/citiesData';

export default function ChennaiPage() {
  return <CityPageLayout city={CITIES_DATA.chennai} />;
}
