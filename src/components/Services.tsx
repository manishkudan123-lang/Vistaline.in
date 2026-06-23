import { useCallback, useRef } from 'react';
import { Layers, Box, DoorOpen, LayoutDashboard, ArrowRight, Check, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'motion/react';
import { useSpring, useTrail, animated } from '@react-spring/web';
import { useTilt } from './useTilt';

const services = [
  {
    icon: Layers,
    title: 'Aluminium Partition',
    desc: 'Strong, slim aluminium frame partitions for offices, showrooms and industrial spaces.',
    bullets: ['Powder-coated finishes', 'Single & double glazed'],
    span: 'lg:col-span-2'
  },
  {
    icon: Box,
    title: 'Glass Partition',
    desc: 'Toughened, frosted and tinted glass partitions for premium modern interiors.',
    bullets: ['10mm / 12mm toughened glass', 'Frosted & branding films', 'Sliding & pivot doors'],
    span: 'lg:col-span-1'
  },
  {
    icon: DoorOpen,
    title: 'Office Cabin Work',
    desc: 'Turn-key executive cabins, manager rooms, boardrooms and workstations — fully fitted.',
    bullets: ['MD & manager cabins', 'Boardroom partitions', 'End-to-end installation'],
    span: 'lg:col-span-1'
  },
  {
    icon: LayoutDashboard,
    title: 'Custom Interiors',
    desc: 'Bespoke partition design for hotels, schools, colleges and luxury commercial spaces.',
    bullets: ['Free site consultation', 'Designer-led layouts', 'PAN India delivery'],
    span: 'lg:col-span-2'
  }
];

const TITLE_WORDS = ['Our', 'Services'];

function AnimatedTitle() {
  return (
    <h2 className="font-display text-4xl md:text-5xl lg:text-[56px] font-black text-[#1C1B1B] mb-4 tracking-tight leading-[1.1]">
      {TITLE_WORDS.map((word, i) => (
        <motion.span
          key={word}
          initial={{ opacity: 0, y: 20, rotateX: 15 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.3 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="inline-block mr-3"
        >
          {word === 'Services' ? <span className="text-[#FF8800]">Services</span> : word}
        </motion.span>
      ))}
    </h2>
  );
}

function ServiceCard({ s, i, style: trailStyle, key: _key }: { s: typeof services[0]; i: number; style: any; key?: number }) {
  const tiltRef = useTilt<HTMLDivElement>(3);
  const Icon = s.icon;

  const [springProps, api] = useSpring(() => ({
    scale: 1,
    y: 0,
    shadow: 0,
    config: { mass: 1, tension: 280, friction: 25 },
  }));

  const handleMouseEnter = useCallback(() => {
    api.start({ scale: 1.02, y: -6, shadow: 30 });
  }, [api]);

  const handleMouseLeave = useCallback(() => {
    api.start({ scale: 1, y: 0, shadow: 0 });
  }, [api]);

  return (
    <animated.div
      style={{ ...trailStyle, ...springProps }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={s.span}
    >
      <div
        ref={tiltRef}
        className="group bg-white rounded-[1.75rem] p-5 sm:p-8 border border-slate-200/70 hover:border-[#FF8800]/40 transition-all duration-500 h-full flex flex-col cursor-default relative overflow-hidden shadow-premium hover:shadow-premium-xl"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <motion.div
          className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-[#FF8800]/[0.03] group-hover:bg-[#FF8800]/[0.08] transition-all duration-500"
          style={{ transform: 'translateZ(-10px)' }}
        />
        <div
          className="w-14 h-14 rounded-2xl bg-[#FF8800]/10 flex items-center justify-center mb-5 group-hover:bg-[#FF8800]/20 group-hover:shadow-lg group-hover:shadow-[#FF8800]/15 transition-all duration-500"
          style={{ transform: 'translateZ(24px)' }}
        >
          <Icon className="w-6 h-6 text-[#FF8800] group-hover:scale-110 group-hover:rotate-[-6deg] transition-all duration-300" />
        </div>
        <h3 className="text-lg font-black text-[#1C1B1B] mb-3 tracking-tight" style={{ transform: 'translateZ(18px)' }}>{s.title}</h3>
        <p className="text-sm text-slate-500 mb-6 leading-relaxed" style={{ transform: 'translateZ(12px)' }}>
          {s.desc}
        </p>

        <ul className="space-y-2.5 mt-auto">
          {s.bullets.map((b, j) => (
            <motion.li
              key={j}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: 0.35 + j * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-2.5 text-xs text-slate-600 font-medium group/bullet"
            >
              <motion.span
                className="w-4 h-4 rounded-full bg-[#FF8800]/10 flex items-center justify-center shrink-0 group-hover/bullet:bg-[#FF8800]/25 group-hover:bg-[#FF8800]/20 transition-colors duration-300"
                whileHover={{ scale: 1.2, rotate: [0, -15, 15, 0] }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <Check className="w-2.5 h-2.5 text-[#FF8800]" />
              </motion.span>
              {b}
            </motion.li>
          ))}
        </ul>
      </div>
    </animated.div>
  );
}

export default function Services() {
  const trails = useTrail(services.length, {
    from: { opacity: 0, y: 40 },
    to: { opacity: 1, y: 0 },
    config: { mass: 1, tension: 280, friction: 55 },
    delay: 200,
  });

  const ctaRef = useRef<HTMLDivElement>(null!);
  const ctaInView = useInView(ctaRef, { once: true, margin: '-80px' });

  return (
    <section id="services" className="py-24 lg:py-32 bg-[#FCF9F8] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#FF8800]/10 bg-[#FF8800]/5 text-[#FF8800] text-xs font-semibold tracking-wide mb-5"
          >
            <motion.div
              animate={{ rotate: [0, 5, 0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Sparkles className="w-3.5 h-3.5" />
            </motion.div>
            What We Do
          </motion.div>

          <AnimatedTitle />

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="text-slate-500 text-base max-w-xl mx-auto font-medium"
          >
            Complete partition system solutions — from design and manufacturing to on-site installation.
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {trails.map((trail, i) => (
            <ServiceCard key={i} s={services[i]} i={i} style={trail} />
          ))}
        </div>

        <motion.div
          ref={ctaRef}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-20 text-center"
        >
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-slate-500 mb-8 text-base font-medium"
          >
            Discover our full range of premium glass partition systems — 7 engineered types for modern interiors.
          </motion.p>

          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <Link
              to="/our-work"
              className="group inline-flex items-center gap-3 px-8 py-3.5 bg-[#FF8800] text-white font-semibold rounded-xl hover:bg-[#E67700] transition-all duration-300 shadow-lg hover:shadow-xl text-sm relative overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                initial={{ x: '-100%' }}
                whileHover={{ x: '200%' }}
                transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              />
              <span className="relative z-10">Explore Glass Partitions</span>
              <motion.div
                className="relative z-10"
                animate={ctaInView ? { x: [0, 4, 0] } : { x: 0 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
              >
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.div>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
