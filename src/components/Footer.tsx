import { Phone, MapPin, MessageCircle, ArrowUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useMotionValueEvent } from 'motion/react';
import { useState } from 'react';
import Logo from './Logo';

const footerLinks = {
  services: [
    { label: 'Aluminium Partition', path: '/our-work' },
    { label: 'Glass Partition', path: '/our-work' },
    { label: 'Office Cabin Work', path: '/our-work' },
    { label: 'Interior Solutions', path: '/our-work' },
  ],
  explore: [
    { label: 'Home', path: '/' },
    { label: 'Our Services', path: '/our-work' },
    { label: 'All Products', path: '/products' },
    { label: 'Contact Us', path: '/contact' },
  ],
};

function FooterLink({ label, path, delay, key: _key }: { label: string; path: string; delay: number; key?: string | null }) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <Link to={path} className="text-slate-400 hover:text-[#FF8800] text-sm font-medium transition-colors duration-200">
        {label}
      </Link>
    </motion.li>
  );
}

export default function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setShowScrollTop(latest > 800);
  });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0A3D73] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute top-[-50%] right-[-20%] w-[400px] h-[400px] rounded-full bg-[#FF8800]/[0.02] blur-[100px]" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="mb-6">
              <Logo className="h-8" showTm={false} />
            </div>
            <p className="text-slate-400 mb-6 leading-relaxed text-sm">
              Premium aluminium & glass partition experts — design, supply and installation for offices, shops & homes across India.
            </p>
            <div className="flex items-center gap-3 text-slate-300 font-semibold text-sm">
              <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center">
                <Phone className="w-4 h-4" />
              </div>
              <span>+91 91000 44124</span>
            </div>
            <div className="flex items-center gap-3 text-slate-300 font-semibold text-sm mt-3">
              <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </div>
              <a href="mailto:info@vistaline.in" className="hover:text-[#FF8800] transition-colors">info@vistaline.in</a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <h4 className="text-white font-bold mb-5 uppercase text-xs tracking-widest">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link, i) => (
                <FooterLink key={link.label} label={link.label} path={link.path} delay={0.15 + i * 0.05} />
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <h4 className="text-white font-bold mb-5 uppercase text-xs tracking-widest">Explore</h4>
            <ul className="space-y-3">
              {footerLinks.explore.map((link, i) => (
                <FooterLink key={link.label} label={link.label} path={link.path} delay={0.25 + i * 0.05} />
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <h4 className="text-white font-bold mb-5 uppercase text-xs tracking-widest">Talk To Us</h4>
            <motion.a
              href="https://wa.me/919100044124?text=Hi,%20I'm%20exploring%20premium%20partition%20systems%20for%20my%20office."
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02, y: -1 }}
              className="w-full inline-flex items-center justify-center gap-3 px-5 py-3 rounded-xl bg-[#FF8800] hover:bg-[#E67700] text-white font-bold transition-all duration-200 shadow-lg shadow-[#FF8800]/20 relative overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent"
                initial={{ x: '-100%' }}
                whileHover={{ x: '200%' }}
                transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              />
              <MessageCircle className="w-5 h-5 relative z-10" />
              <span className="relative z-10">WhatsApp Us</span>
            </motion.a>
            <div className="mt-6 flex items-start gap-3 text-slate-400 text-sm">
              <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
              <span>Plot No. 7 & 8, Thondapally, Shamshabad—501218, Telangana</span>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p className="text-slate-400 text-sm font-medium">
            &copy; {new Date().getFullYear()} Vistaline Profiles Pvt Ltd. All rights reserved.
          </p>
          <motion.button
            onClick={scrollToTop}
            initial={{ opacity: 0, y: 10 }}
            animate={showScrollTop ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            whileHover={{ y: -4, scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 text-slate-400 hover:text-white text-sm font-medium transition-colors group"
            aria-label="Scroll to top"
          >
            <motion.span
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              Back to top
            </motion.span>
            <ArrowUp className="w-4 h-4" />
          </motion.button>
        </motion.div>
      </div>
    </footer>
  );
}
