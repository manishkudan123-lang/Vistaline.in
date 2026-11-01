import React, { useState, useEffect, useRef } from 'react';
import { MapPin, ChevronDown, Check } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { CITIES_LIST, CITIES_DATA } from '../data/citiesData';
import { useSelectedLocation, setStoredLocationId } from '../utils/locationStorage';

export default function LocationsDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [storedCityId, setStoredCityId] = useSelectedLocation();

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close dropdown on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Determine city from current URL (/city_name or legacy /locations/city_name)
  const pathSlug = location.pathname.replace(/^\/(locations\/)?/, '').toLowerCase();
  const routeCity = CITIES_DATA[pathSlug] || null;

  // Sync route city into localStorage whenever the user visits a city page
  useEffect(() => {
    if (routeCity?.id && routeCity.id !== storedCityId) {
      setStoredCityId(routeCity.id);
    }
  }, [routeCity?.id, storedCityId, setStoredCityId]);

  // Active city resolution: route city takes precedence, followed by stored city from localStorage
  const activeCityId = routeCity?.id || storedCityId || null;
  const activeCity = activeCityId ? CITIES_DATA[activeCityId] : null;
  const displayName = activeCity ? activeCity.name : 'Locations';

  const handleCitySelect = (cityId: string) => {
    setStoredLocationId(cityId);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <motion.button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        aria-expanded={isOpen}
        aria-label="Select location"
        className={`flex items-center gap-2 px-3.5 py-2 text-sm font-semibold rounded-xl border shadow-sm transition-all duration-200 cursor-pointer ${
          isOpen || activeCity
            ? 'bg-white/20 text-white border-white/40 ring-2 ring-white/10'
            : 'bg-white/10 hover:bg-white/15 text-white/95 hover:text-white border-white/20'
        }`}
      >
        <MapPin className="w-4 h-4 text-[#FF8800] shrink-0" />
        <span className="font-semibold tracking-tight">{displayName}</span>
        <ChevronDown 
          className={`w-3.5 h-3.5 text-white/80 transition-transform duration-200 shrink-0 ${
            isOpen ? 'rotate-180' : ''
          }`} 
        />
      </motion.button>

      {/* Clean Dropdown with only City Names */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className="absolute right-0 top-full mt-2 w-52 bg-white rounded-2xl shadow-xl border border-slate-200/90 p-1.5 text-slate-800 z-50 overflow-hidden"
          >
            <div className="space-y-0.5">
              {CITIES_LIST.map((city) => {
                const isActive = activeCityId === city.id;
                return (
                  <Link
                    key={city.id}
                    to={`/${city.id}`}
                    onClick={() => handleCitySelect(city.id)}
                    className={`flex items-center justify-between px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
                      isActive
                        ? 'bg-[#FF8800] text-white shadow-sm'
                        : 'text-slate-700 hover:bg-slate-100/90 hover:text-[#0A3D73]'
                    }`}
                  >
                    <span>{city.name}</span>
                    {isActive && <Check className="w-4 h-4 text-white shrink-0" />}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
