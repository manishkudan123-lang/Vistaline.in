import { useState, useEffect, useCallback } from 'react';
import { CITIES_DATA } from '../data/citiesData';

export const LOCATION_STORAGE_KEY = 'selected_location';
export const LOCATION_EVENT_NAME = 'vistaline_location_change';

/**
 * Retrieve the currently stored city ID from localStorage.
 * Automatically cleans up any obsolete/duplicate keys.
 */
export function getStoredLocationId(): string | null {
  try {
    if (typeof window === 'undefined') return null;

    // Clean up any extra variables from previous iterations
    localStorage.removeItem('vistaline_location');
    localStorage.removeItem('selected_location_name');

    const stored = localStorage.getItem(LOCATION_STORAGE_KEY);
    if (stored && CITIES_DATA[stored.toLowerCase().trim()]) {
      return stored.toLowerCase().trim();
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Save only the single selected city ID to localStorage under `selected_location`.
 */
export function setStoredLocationId(cityId: string): void {
  try {
    if (typeof window === 'undefined') return;
    const normalized = cityId.toLowerCase().trim();

    // Store only the 1 required key
    localStorage.setItem(LOCATION_STORAGE_KEY, normalized);

    // Remove any extra keys so only 1 variable exists
    localStorage.removeItem('vistaline_location');
    localStorage.removeItem('selected_location_name');

    window.dispatchEvent(new CustomEvent(LOCATION_EVENT_NAME, { detail: normalized }));
  } catch {
    // Ignore storage quota/security errors
  }
}

/**
 * React hook that stays synced with localStorage and custom location events.
 */
export function useSelectedLocation(): [string | null, (cityId: string) => void] {
  const [locationId, setLocationId] = useState<string | null>(() => getStoredLocationId());

  useEffect(() => {
    const handleLocationChange = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      if (customEvent.detail) {
        setLocationId(customEvent.detail);
      } else {
        setLocationId(getStoredLocationId());
      }
    };

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === LOCATION_STORAGE_KEY) {
        setLocationId(getStoredLocationId());
      }
    };

    window.addEventListener(LOCATION_EVENT_NAME, handleLocationChange);
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener(LOCATION_EVENT_NAME, handleLocationChange);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const updateLocation = useCallback((cityId: string) => {
    setStoredLocationId(cityId);
    setLocationId(cityId.toLowerCase().trim());
  }, []);

  return [locationId, updateLocation];
}
