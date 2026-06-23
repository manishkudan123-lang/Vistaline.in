import { ShieldCheck, CircleDollarSign, CheckSquare, Wrench, PackageCheck, ListVideo } from 'lucide-react';
import { motion, useMotionValue, useTransform, useInView, animate } from 'motion/react';
import { useRef, useEffect, useCallback } from 'react';
import { useSpring, useTrail, animated } from '@react-spring/web';
import { useTilt } from './useTilt';

const reasons = [
  {
    icon: CheckSquare,
    title: 'Design + Supply + Install',
    desc: 'Not just materials — full project responsibility. From design to final installation, everything under one roof.',
    span: 'lg:col-span-2'
  },
  {
    icon: CircleDollarSign,
    title: 'No Middleman',
    desc: 'Directly interact with the core team. No agents, no commissions — better pricing, direct answers, and full accountability.',
    span: 'lg:col-span-1'
  },
  {
    icon: PackageCheck,
    title: 'Pan-India Supply',
    desc: 'Supplying pan-India from Hyderabad. Offices, showrooms, hotels, educational institutions — anywhere you need.',
    span: 'lg:col-span-1'
  },
  {
    icon: Wrench,
    title: 'Expert In-House Team',
    desc: 'Our own trained installation team. No subcontractors — ensuring clean and timely execution.',
    span: 'lg:col-span-2'
  },
  {
    icon: ShieldCheck,
    title: 'Premium Quality',
    desc: 'BLR aluminium — India\'s leading profile system. High-grade extruded aluminium with precision-engineered finishes.',
    span: 'lg:col-span-1'
  },
  {
    icon: ListVideo,
    title: '500+ Projects Done',
    desc: 'Over 12 years of industry experience and 500+ successful installations across IT parks, hospitals, and showrooms.',
    span: 'lg:col-span-2'
  }
];

function AnimatedCount({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, value, { duration: 1.8, ease: [0.25, 0.1, 0.25, 1] });
      return controls.stop;
    }
  }, [isInView, value, count]);

  return (
    <span ref={ref}>
      <motion.span>{rounded}</motion.span>{suffix}
    </span>
  );
}

function ReasonCard({ r, i, style: trailStyle, key: _key }: { r: typeof reasons[0]; i: number; style: any; key?: number }) {
  const tiltRef = useTilt<HTMLDivElement>(4);
  const Icon = r.icon;
  const isCounterCard = r.title === '500+ Projects Done';
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
      className={r.span}
    >
      <div
        ref={tiltRef}
        className="group bg-white rounded-[1.5rem] p-5 sm:p-7 border border-slate-200/60 hover:border-[#FF8800]/30 transition-all duration-500 h-full cursor-default relative overflow-hidden shadow-premium hover:shadow-premium-xl"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <motion.div
          className="absolute -bottom-24 -left-24 w-48 h-48 rounded-full bg-[#FF8800]/[0.02] group-hover:bg-[#FF8800]/[0.07] transition-all duration-500"
          style={{ transform: 'translateZ(-10px)' }}
        />
        <motion.div
          className="absolute -top-10 -right-10 w-20 h-20 rounded-full bg-[#FF8800]/[0.01] group-hover:bg-[#FF8800]/[0.04] transition-all duration-500"
          style={{ transform: 'translateZ(-5px)' }}
        />
        <div
          className="w-14 h-14 rounded-2xl bg-[#FF8800]/10 flex items-center justify-center mb-5 group-hover:bg-[#FF8800]/20 group-hover:scale-110 group-hover:rotate-[-6deg] transition-all duration-500"
          style={{ transform: 'translateZ(20px)' }}
        >
          <Icon className="w-6 h-6 text-[#FF8800]" />
        </div>
        <h4 className="text-lg font-black text-[#1C1B1B] mb-2 tracking-tight" style={{ transform: 'translateZ(15px)' }}>
          {isCounterCard ? (
            <AnimatedCount value={500} suffix="+ Projects Done" />
          ) : (
            r.title
          )}
        </h4>
        <p className="text-sm leading-relaxed text-slate-600 font-medium" style={{ transform: 'translateZ(10px)' }}>
          {r.desc}
        </p>
      </div>
    </animated.div>
  );
}

export default function WhyUs() {
  const trails = useTrail(reasons.length, {
    from: { opacity: 0, y: 40 },
    to: { opacity: 1, y: 0 },
    config: { mass: 0.8, tension: 200, friction: 18 },
    delay: 200,
  });

  return (
    <section className="py-24 lg:py-32 bg-[#F2F4F8]/60 relative border-t border-slate-200/50 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl lg:text-[56px] font-black text-[#1C1B1B] mb-4 tracking-tight leading-[1.1]">
            Why <span className="relative inline-block text-[#FF8800]">
              VISTALINE
              <motion.span
                className="absolute -bottom-1.5 left-0 right-0 h-1.5 rounded-full bg-[#FF8800]/30 origin-left"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
              />
            </span>?
          </h2>
          <p className="text-slate-600 text-base max-w-2xl mx-auto font-medium">
            Why clients consistently choose us and confidently recommend us to their professional network.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trails.map((trail, i) => (
            <ReasonCard key={i} r={reasons[i]} i={i} style={trail} />
          ))}
        </div>
      </div>
    </section>
  );
}
