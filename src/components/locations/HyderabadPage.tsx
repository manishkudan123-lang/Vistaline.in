import React from 'react';
import CityPageLayout from './CityPageLayout';
import { CITIES_DATA } from '../../data/citiesData';

export default function HyderabadPage() {
  return <CityPageLayout city={CITIES_DATA.hyderabad} />;
}
