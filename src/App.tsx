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
