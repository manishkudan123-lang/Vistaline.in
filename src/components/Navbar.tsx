import { useState, useEffect, useMemo, type MouseEvent } from 'react';
import { Menu, X, MessageCircle } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion, useMotionValueEvent, useScroll, AnimatePresence } from 'motion/react';
import Logo from './Logo';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/our-work', label: 'Services' },
  { path: '/products', label: 'Products' },
  { path: '/gallery', label: 'Gallery' },
  { path: '/contact', label: 'Contact' },
];

function NavLink({ link, isActive, onClick, key: _key }: { link: typeof navLinks[0]; isActive: boolean; onClick: (e: MouseEvent<HTMLAnchorElement>) => void; key?: string }) {
  return (
    <Link
      to={link.path}
      onClick={onClick}
      className="relative px-4 py-2 text-sm font-semibold transition-colors duration-300 group"
    >
      <span className={`relative z-10 transition-colors duration-200 ${isActive ? 'text-white' : 'text-white/85 group-hover:text-white'}`}>
        {link.label}
      </span>
      {/* Active indicator: orange pill */}
      {isActive && (
        <motion.div
          layoutId="active-pill"
          className="absolute inset-0 rounded-xl bg-[#FF8800] shadow-[0_0_12px_rgba(255,136,0,0.2)]"
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        />
      )}
      {/* Hover highlight */}
      {!isActive && (
        <span className="absolute inset-0 rounded-xl bg-white/0 group-hover:bg-[#FF8800] transition-all duration-200" />
      )}
    </Link>
  );
}

function WhatsAppButton() {
  return (
    <motion.a
      href="https://wa.me/919100044124?text=Hi,%20I%20want%20to%20discuss%20my%20office%20partition%20project%20directly."
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className="flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl bg-[#FF8800] hover:bg-[#E67700] text-white shadow-sm transition-all duration-200"
    >
      <MessageCircle className="w-4 h-4" />
      <span>WhatsApp</span>
    </motion.a>
  );
}

export default function Navbar() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const { scrollY: scrollYMotion } = useScroll();

  const scrolled = scrollY > 40;

  useMotionValueEvent(scrollYMotion, "change", (latest) => {
    setScrollY(latest);
  });

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const handleNavClick = (e: MouseEvent<HTMLAnchorElement>, hash: string) => {
    if (location.pathname === '/') {
      e.preventDefault();
      const el = document.getElementById(hash.replace('#', ''));
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navHeight = useMemo(() => scrollY > 60 ? 64 : 80, [scrollY]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-shadow duration-300 bg-[#0A3D73] ${
        scrolled ? 'shadow-[0_4px_20px_rgba(0,0,0,0.15)]' : ''
      }`}
      style={{ height: navHeight }}
    >
      <div className="h-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            <Link
              to="/"
              className="flex items-center shrink-0"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Logo className="h-8 md:h-9" />
            </Link>
          </motion.div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <NavLink
                  key={link.path}
                  link={link}
                  isActive={isActive}
                  onClick={(e) => {
                    if (link.path === '/') handleNavClick(e, '#home');
                  }}
                />
              );
            })}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <WhatsAppButton />
          </div>

          {/* Mobile hamburger */}
          <motion.button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 relative z-50 text-white"
            aria-label="Toggle menu"
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait">
              {isMobileMenuOpen ? (
                <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <X className="w-5 h-5" />
                </motion.div>
              ) : (
                <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <Menu className="w-5 h-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Mobile overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-0 bg-[#0A3D73] z-40 md:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full gap-2 px-6">
              {navLinks.map((link, i) => {
                const isActive = location.pathname === link.path;
                return (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3, delay: i * 0.06, ease: [0.25, 0.1, 0.25, 1] }}
                  >
                    <Link
                      to={link.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`block text-center px-10 py-3.5 rounded-xl text-xl font-bold tracking-tight transition-all duration-200 ${
                        isActive
                          ? 'text-white bg-[#FF8800] shadow-md shadow-[#FF8800]/20'
                          : 'text-white/70 hover:text-white hover:bg-[#FF8800]'
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                className="mt-6"
              >
                <a
                  href="https://wa.me/919100044124?text=Hi,%20I%20want%20to%20discuss%20my%20office%20partition%20project%20directly."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 bg-[#FF8800] hover:bg-[#E67700] text-white px-10 py-3.5 rounded-xl text-lg font-bold shadow-md shadow-[#FF8800]/20 transition-all duration-200"
                >
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp Us
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
