import { useEffect, useRef } from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'motion/react';

const highlights = [
  'Certified Materials',
  'On-Time Delivery',
  'Designer Led',
];

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null!);
  const imageRef = useRef<HTMLDivElement>(null!);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const imageParallaxY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section id="about" ref={sectionRef} className="py-24 lg:py-32 bg-[#FCF9F8] relative overflow-hidden">
      <motion.div
        className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#FF8800]/[0.03] to-transparent"
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, -30]) }}
      />
      <motion.div
        className="absolute bottom-0 left-0 w-96 h-96 bg-[#0088CC]/[0.03] rounded-full blur-3xl"
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, 40]) }}
      />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          <div className="flex-1 text-left">
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
              className="font-display text-4xl md:text-[56px] font-black text-[#1C1B1B] leading-[1.06] mb-6 tracking-[-0.03em]"
            >
              Premium partition<br /> systems, design and<br /> build.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-slate-600 mb-4 text-base leading-relaxed max-w-xl"
            >
              Vistaline is a Hyderabad-based premium aluminium and glass partition specialist, serving offices, showrooms, hotels, schools and colleges across India. With over a decade of hands-on experience, we have delivered 500+ partition projects ranging from single executive cabins to full corporate floors.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-slate-600 mb-8 text-base leading-relaxed max-w-xl"
            >
              We supply and install the complete BLR-series aluminium profile range, single and double glazed glass systems, boardroom partitions, sliding doors and frameless solutions. Every project is overseen directly by the owner — clean quotes, no middleman, on-time delivery.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
              className="grid grid-cols-2 gap-y-4 gap-x-8 mb-8 max-w-xl"
            >
              {highlights.map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.4 + i * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
                  className="flex items-center gap-3"
                >
                  <div className="w-6 h-6 rounded-full bg-[#FF8800]/10 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#FF8800]" />
                  </div>
                  <span className="text-sm font-semibold text-slate-700">{item}</span>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <Link
                to="/contact"
                className="group btn-island px-8 py-4 rounded-full bg-[#FF8800] text-white text-sm font-bold hover:bg-[#E67700] transition-all duration-200 shadow-lg shadow-[#FF8800]/20 hover:shadow-[#FF8800]/30 hover:-translate-y-1"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '200%' }}
                  transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                />
                <span className="relative z-10">Get a Free Quote</span>
                <span className="btn-trail relative z-10">
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-300" />
                </span>
              </Link>
            </motion.div>
          </div>

          <motion.div
            ref={imageRef}
            initial={{ opacity: 0, x: 60, scale: 0.92, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, x: 0, scale: 1, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 relative"
            style={{ y: imageParallaxY }}
          >
            <div className="relative">
              <motion.div
                className="rounded-3xl overflow-hidden shadow-premium-xl border border-slate-200/60 scroll-clip-reveal"
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <img
                  src="https://drive.google.com/thumbnail?id=1h5ysu-HnXzvKgoX6g5shDzzg4NbUvIw0&sz=w1600"
                  alt="Vistaline Office Partitions—Premium aluminium and glass partition installation"
                  referrerPolicy="no-referrer"
                  className="w-full h-auto aspect-square lg:aspect-[4/3] object-cover"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                className="absolute -bottom-5 -left-5 sm:-bottom-7 sm:-left-7 bg-white p-5 sm:p-7 rounded-2xl shadow-premium-xl border border-slate-100 max-w-[210px] sm:max-w-[230px]"
              >
                <h4 className="text-5xl font-display font-bold text-[#FF8800] mb-1">12+</h4>
                <p className="text-xs uppercase tracking-wider font-bold text-slate-700 leading-tight">
                  YEARS BUILDING <br />PREMIUM PARTITION<br /> SYSTEMS
                </p>
              </motion.div>

              <div className="absolute -top-4 -right-4 w-32 h-32 bg-[#FF8800]/8 rounded-full blur-3xl" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
