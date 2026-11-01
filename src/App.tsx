import React, { useState, useEffect, useRef, useCallback } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { flushSync } from 'react-dom';
import { AnimatePresence, motion, useScroll, useSpring } from 'motion/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Showcase from './components/Showcase';
import AllProducts from './components/AllProducts';
import WhyUs from './components/WhyUs';
import Services from './components/Services';
import CTA from './components/CTA';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Marquee from './components/Marquee';
import CatalogueButton from './components/CatalogueButton';
import Gallery from './components/Gallery';
import {
  HyderabadPage,
  BangalorePage,
  PunePage,
  NagpurPage,
  ChennaiPage,
  CoimbatorePage,
  MysuruPage,
  KochiPage,
  VisakhapatnamPage,
  ThiruvananthapuramPage,
  CityDynamicRoute,
} from './components/locations';

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FF8800] to-[#FFaa44] origin-left z-50"
      style={{ scaleX }}
    />
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function useViewTransition() {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const prevLocation = useRef(location);

  useEffect(() => {
    if (location === prevLocation.current) return;
    prevLocation.current = location;

    const applyTransition = () => {
      if ((document as any).startViewTransition) {
        (document as any).startViewTransition(() => {
          flushSync(() => {
            setDisplayLocation(location);
          });
        });
      } else {
        setDisplayLocation(location);
      }
    };

    // Microtask ensures React Router has processed the navigation
    queueMicrotask(applyTransition);
  }, [location]);

  return displayLocation;
}

function HomePage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Hero />
      <Marquee />
      <About />
      <WhyUs />
      <Services />
      <CTA />
    </motion.div>
  );
}

function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  const displayLocation = useViewTransition();
  const RoutesWithKey = Routes as any;

  // Use displayLocation for rendering (morphs via View Transition),
  // or fall back to real location when unsupported
  const renderLocation = displayLocation || location;

  return (
    <AnimatePresence mode="wait">
      <RoutesWithKey location={renderLocation} key={renderLocation.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/our-work" element={<PageWrapper><Showcase /></PageWrapper>} />
        <Route path="/products" element={<PageWrapper><AllProducts /></PageWrapper>} />
        <Route path="/contact" element={<PageWrapper><div className="pt-24 pb-12"><Contact /></div></PageWrapper>} />
        <Route path="/gallery" element={<PageWrapper><Gallery /></PageWrapper>} />
        
        {/* Direct City Routes: /city_name */}
        <Route path="/hyderabad" element={<PageWrapper><HyderabadPage /></PageWrapper>} />
        <Route path="/bangalore" element={<PageWrapper><BangalorePage /></PageWrapper>} />
        <Route path="/pune" element={<PageWrapper><PunePage /></PageWrapper>} />
        <Route path="/nagpur" element={<PageWrapper><NagpurPage /></PageWrapper>} />
        <Route path="/chennai" element={<PageWrapper><ChennaiPage /></PageWrapper>} />
        <Route path="/coimbatore" element={<PageWrapper><CoimbatorePage /></PageWrapper>} />
        <Route path="/koimbotur" element={<PageWrapper><CoimbatorePage /></PageWrapper>} />
        <Route path="/mysuru" element={<PageWrapper><MysuruPage /></PageWrapper>} />
        <Route path="/maysuru" element={<PageWrapper><MysuruPage /></PageWrapper>} />
        <Route path="/kochi" element={<PageWrapper><KochiPage /></PageWrapper>} />
        <Route path="/visakhapatnam" element={<PageWrapper><VisakhapatnamPage /></PageWrapper>} />
        <Route path="/vishakapatnam" element={<PageWrapper><VisakhapatnamPage /></PageWrapper>} />
        <Route path="/thiruvananthapuram" element={<PageWrapper><ThiruvananthapuramPage /></PageWrapper>} />
        <Route path="/triventanampuram" element={<PageWrapper><ThiruvananthapuramPage /></PageWrapper>} />

        {/* Legacy /locations/:cityId routes supported for backward-compatibility */}
        <Route path="/locations/hyderabad" element={<PageWrapper><HyderabadPage /></PageWrapper>} />
        <Route path="/locations/bangalore" element={<PageWrapper><BangalorePage /></PageWrapper>} />
        <Route path="/locations/pune" element={<PageWrapper><PunePage /></PageWrapper>} />
        <Route path="/locations/nagpur" element={<PageWrapper><NagpurPage /></PageWrapper>} />
        <Route path="/locations/chennai" element={<PageWrapper><ChennaiPage /></PageWrapper>} />
        <Route path="/locations/coimbatore" element={<PageWrapper><CoimbatorePage /></PageWrapper>} />
        <Route path="/locations/koimbotur" element={<PageWrapper><CoimbatorePage /></PageWrapper>} />
        <Route path="/locations/mysuru" element={<PageWrapper><MysuruPage /></PageWrapper>} />
        <Route path="/locations/maysuru" element={<PageWrapper><MysuruPage /></PageWrapper>} />
        <Route path="/locations/kochi" element={<PageWrapper><KochiPage /></PageWrapper>} />
        <Route path="/locations/visakhapatnam" element={<PageWrapper><VisakhapatnamPage /></PageWrapper>} />
        <Route path="/locations/vishakapatnam" element={<PageWrapper><VisakhapatnamPage /></PageWrapper>} />
        <Route path="/locations/thiruvananthapuram" element={<PageWrapper><ThiruvananthapuramPage /></PageWrapper>} />
        <Route path="/locations/triventanampuram" element={<PageWrapper><ThiruvananthapuramPage /></PageWrapper>} />
        <Route path="/locations/:cityId" element={<PageWrapper><CityDynamicRoute /></PageWrapper>} />
      </RoutesWithKey>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#FCF9F8] font-sans text-[#1C1B1B]">
        <ScrollProgress />
        <ScrollToTop />
        <Navbar />
        <AnimatedRoutes />
        <Footer />
        <CatalogueButton />
      </div>
    </BrowserRouter>
  );
}
// Created by Pentaverse Tech

