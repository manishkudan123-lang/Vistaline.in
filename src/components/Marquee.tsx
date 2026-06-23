import { useState } from 'react';
import { motion } from 'motion/react';

const items = [
  'Aluminium Partitions',
  'Glass Partitions',
  'Office Cabins',
  'Boardroom Fitouts',
  'Sliding Doors',
  'Frameless Systems',
  'Custom Interiors',
  'Pan-India Delivery',
  'Premium Quality',
  '500+ Projects',
  '12+ Years',
  'BLR Series',
  'Hyderabad HQ',
  'Chennai Office',
];

export default function Marquee() {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <section
      className="relative py-6 bg-[#0A3D73] border-y border-white/5 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-[#0A3D73] via-transparent to-[#0A3D73] z-10 pointer-events-none" />
      <div className="flex whitespace-nowrap">
        <motion.div
          className="flex gap-16 items-center shrink-0"
          initial={{ x: 0 }}
          animate={isPaused ? { x: '-50%' } : { x: '-50%' }}
          transition={{
            duration: isPaused ? 99999 : 30,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {[...items, ...items].map((text, i) => (
            <span key={i} className={`flex items-center gap-16 text-sm font-bold uppercase tracking-[0.15em] transition-colors duration-300 ${isPaused ? 'text-white/70' : 'text-white/40'}`}>
              <span className="w-2 h-2 rounded-full bg-[#FF8800]/60" />
              {text}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export function MarqueeReverse() {
  return (
    <section className="relative py-4 bg-[#FCF9F8] border-y border-slate-200/50 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-[#FCF9F8] via-transparent to-[#FCF9F8] z-10 pointer-events-none" />
      <div className="flex whitespace-nowrap">
        <motion.div
          className="flex gap-12 items-center shrink-0"
          initial={{ x: '-50%' }}
          animate={{ x: 0 }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        >
          {[...items, ...items].map((text, i) => (
            <span key={i} className="flex items-center gap-12 text-xs font-bold text-slate-600 uppercase tracking-[0.2em]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0088CC]/40" />
              {text}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
