import { useEffect, useRef, useState } from 'react';
import { Phone, Star, MapPin, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import gsap from 'gsap';
import { useMagnetic } from './useMagnetic';
import SpotlightReveal from './SpotlightReveal';

const stats = [
  { value: '500+', label: 'Projects Done' },
  { value: '12+', label: 'Years Experience' },
  { value: '15+', label: 'Cities Served' },
];

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null!);
  const ctaRef = useMagnetic<HTMLAnchorElement>(0.15);
  const [cursor, setCursor] = useState({ x: 400, y: 300 });
  const spotlightRef = useRef<HTMLDivElement>(null!);

  useEffect(() => {
    const el = spotlightRef.current;
    if (!el) return;
    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      setCursor({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };
    const onLeave = () => setCursor({ x: 400, y: 300 });
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    return () => {
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
      tl.fromTo('.hero-badge', { opacity: 0, y: -20, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 0.7 })
        .fromTo('.hero-title-line', { opacity: 0, y: 60, rotateX: 15 }, { opacity: 1, y: 0, rotateX: 0, duration: 0.9, stagger: 0.12 }, '-=0.3')
        .fromTo('.hero-desc', { opacity: 0, y: 30, filter: 'blur(6px)' }, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.7 }, '-=0.5')
        .fromTo('.hero-cta', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 }, '-=0.3')
        .fromTo('.hero-stats', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.2')
        .fromTo('.hero-image', { opacity: 0, scale: 0.92, y: 40, rotateY: -5 }, { opacity: 1, scale: 1, y: 0, rotateY: 0, duration: 1, ease: 'power4.out' }, '-=0.6');
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="home" ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden bg-[#0A3D73] grain-overlay">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0A3D73] via-[#0A3D73] to-[#041c36]" />
      <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle at 25% 25%, white 1px, transparent 1px)', backgroundSize: '50px 50px' }} />

      {/* Cursor-reactive ambient glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(700px at ${cursor.x + 150}px ${cursor.y + 150}px, rgba(255,136,0,0.1), transparent 60%)`,
        }}
      />

      <motion.div
        className="absolute top-[-10%] right-[-5%] w-[700px] h-[700px] rounded-full bg-[#FF8800]/5 blur-[150px] scroll-orb"
        animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-20%] left-[-5%] w-[500px] h-[500px] rounded-full bg-[#0088CC]/5 blur-[120px] scroll-orb"
        animate={{ scale: [1, 1.15, 1], rotate: [0, -5, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pt-32 pb-20 lg:pt-36 lg:pb-24">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <div className="flex-1 text-left">
            <div className="hero-badge">
              <motion.div
                className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/10 border border-white/20 text-white text-xs font-bold tracking-wider mb-8 uppercase backdrop-blur-sm"
                whileHover={{ scale: 1.03, backgroundColor: 'rgba(255,255,255,0.15)' }}
              >
                <motion.div
                  className="w-2 h-2 rounded-full bg-[#00A2FF]"
                  animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
                Hyderabad — Pan-India Delivery
              </motion.div>
            </div>

            <h1 className="font-display text-5xl sm:text-7xl lg:text-[96px] font-black tracking-[-0.05em] text-white mb-6 leading-[1.0]" style={{ textShadow: '0 2px 40px rgba(0,0,0,0.2)' }}>
              <span className="hero-title-line block">Modular</span>
              <span className="hero-title-line block text-[#FF8800]" style={{ textShadow: '0 2px 30px rgba(255,136,0,0.3)' }}>Aluminium Glass</span>
              <span className="hero-title-line block">Partitions</span>
            </h1>

            <p className="hero-desc text-base md:text-lg text-slate-300/90 mb-10 max-w-xl leading-relaxed font-medium">
              Designing, manufacturing and installing modern partition systems for offices, showrooms, hotels, school and college across India for over a decade.
            </p>

            <div className="hero-cta flex flex-wrap items-center gap-4 mb-16">
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                <Link
                  to="/contact"
                  className="group btn-island btn-island-white px-9 py-4.5 rounded-full bg-[#FF8800] text-white font-bold shadow-xl shadow-[#FF8800]/30 hover:shadow-[#FF8800]/50 hover:-translate-y-1 transition-all duration-300"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '200%' }}
                    transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                  />
                  <span className="relative z-10 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-white" />
                    Free Site Visit
                  </span>
                  <span className="btn-trail relative z-10">
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-300" />
                  </span>
                </Link>
              </motion.div>
              <motion.a
                ref={ctaRef}
                href="tel:+919100044126"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="btn-island btn-island-white px-9 py-4.5 rounded-full bg-transparent border-2 border-white/20 text-white font-bold hover:bg-white/10 hover:border-white/30 transition-all duration-300"
              >
                <Phone className="w-5 h-5 relative z-10" />
                <span className="relative z-10">Call Now</span>
              </motion.a>
            </div>

            <div className="hero-stats grid grid-cols-2 sm:grid-cols-4 gap-6 md:gap-10 text-white border-t border-white/10 pt-8">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.6 + i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                  className="relative"
                >
                  <h4 className="text-3xl md:text-4xl font-display font-black mb-1 text-white" style={{ textShadow: '0 1px 20px rgba(0,0,0,0.15)' }}>{stat.value}</h4>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div ref={spotlightRef} className="hero-image flex-1 w-full lg:w-auto relative flex justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 30, filter: 'blur(8px)' }}
              animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-none lg:max-w-2xl rounded-3xl overflow-hidden shadow-premium-xl aspect-[4/3] lg:aspect-[4/4]"
            >
              <div className="absolute inset-0">
                <SpotlightReveal
                  baseImage="https://drive.google.com/thumbnail?id=1yqwYWhtuA2oryydP9435WnwZvHyAun-E&sz=w1600"
                  revealImage="https://drive.google.com/thumbnail?id=12wW08ABy7scma_x69kaji417SUgXysGN&sz=w1600"
                  cursorX={cursor.x}
                  cursorY={cursor.y}
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A3D73]/40 via-transparent to-transparent pointer-events-none z-40" />

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 bg-white/95 backdrop-blur-md rounded-2xl p-5 text-slate-900 shadow-premium-xl max-w-[200px] z-50 border border-white/20"
              >
                <div className="flex gap-0.5 text-yellow-500 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="font-black text-sm leading-tight">500+ Happy Clients</p>
                <p className="text-xs font-bold text-slate-700 uppercase tracking-wide">Across India</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1.4 }}
                className="absolute top-6 left-6 bg-white/95 backdrop-blur-md rounded-xl px-4 py-2 shadow-premium-lg flex items-center gap-2 z-50 border border-white/20"
              >
                <MapPin className="w-4 h-4 text-[#FF8800]" />
                <span className="text-xs font-bold text-slate-800">Hyderabad HQ</span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
