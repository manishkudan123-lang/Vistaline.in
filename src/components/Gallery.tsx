import { X, ZoomIn } from 'lucide-react';
import { useEffect, useState, useMemo } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useGoogleDriveFolder } from './useGoogleDriveFolder';

const GALLERY_FOLDER_ID = '1lhUcSp22x6o1s94H6tDE9dgqvZe6l327';

const SPANS = [
  'col-span-1 row-span-1',
  'col-span-2 row-span-1',
  'col-span-1 row-span-2',
  'col-span-2 row-span-2',
  'col-span-1 row-span-1',
  'col-span-1 row-span-1',
  'col-span-2 row-span-1',
  'col-span-1 row-span-1',
  'col-span-1 row-span-2',
  'col-span-1 row-span-1',
  'col-span-2 row-span-2',
  'col-span-1 row-span-1',
  'col-span-1 row-span-1',
  'col-span-2 row-span-1',
  'col-span-1 row-span-2',
  'col-span-1 row-span-1',
] as const;

const VARIANTS = [
  { initial: { opacity: 0, y: 60, scale: 0.92 }, hover: { y: -8, scale: 1.02 } },
  { initial: { opacity: 0, y: 40, scale: 0.95 }, hover: { y: -6, scale: 1.03 } },
  { initial: { opacity: 0, y: 50, scale: 0.9 }, hover: { y: -10, scale: 1.04 } },
  { initial: { opacity: 0, y: 30, scale: 0.93 }, hover: { y: -7, scale: 1.02 } },
  { initial: { opacity: 0, y: 70, scale: 0.88 }, hover: { y: -9, scale: 1.05 } },
  { initial: { opacity: 0, y: 45, scale: 0.94 }, hover: { y: -5, scale: 1.03 } },
] as const;

export default function Gallery() {
  const images = useGoogleDriveFolder(GALLERY_FOLDER_ID);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const layout = useMemo(() => {
    const seed = Date.now();
    return images.map((_, i) => ({
      span: SPANS[i % SPANS.length],
      variant: VARIANTS[(seed + i) % VARIANTS.length],
      delay: ((seed + i * 7) % 15) * 0.04 + 0.1,
    }));
  }, [images]);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <section className="pt-36 pb-28 bg-[#FCF9F8] relative overflow-hidden min-h-screen">
      {/* Ambient decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-[#FF8800]/[0.03] to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-[#0A3D73]/[0.03] to-transparent pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <span className="text-[11px] font-bold tracking-[0.15em] text-[#FF8800] uppercase inline-block mb-4">
            Portfolio
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-[#1C1B1B] mb-6 tracking-tight">
            Our Gallery
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto font-medium">
            Real projects, real spaces — explore our installations.
          </p>
        </motion.div>

        {images.length === 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className={`rounded-2xl bg-slate-100 animate-pulse ${
                  i % 5 === 0 ? 'col-span-2 row-span-2 h-[320px]' : i % 3 === 0 ? 'col-span-2 h-[150px]' : i % 7 === 0 ? 'row-span-2 h-[320px]' : 'h-[150px]'
                }`}
              />
            ))}
          </div>
        )}

        {images.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 auto-rows-[150px] gap-4" style={{ gridAutoFlow: 'dense' }}>
            {images.map((item, i) => {
              const src = item.url;
              const cell = layout[i];
              return (
                <motion.div
                  key={i}
                  initial={cell.variant.initial}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.55, delay: cell.delay, ease: [0.22, 1, 0.36, 1] }}
                  className={`${cell.span} relative rounded-2xl overflow-hidden cursor-pointer group`}
                  onClick={() => setSelectedImage(src)}
                  whileHover={cell.variant.hover}
                >
                  <img
                    src={src}
                    alt={`Gallery image ${i + 1}`}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none"
                  >
                    <div className="bg-white/95 text-slate-800 rounded-full p-3 shadow-xl backdrop-blur-md">
                      <ZoomIn className="w-5 h-5" />
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        )}

        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4"
              onClick={() => setSelectedImage(null)}
            >
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
                onClick={() => setSelectedImage(null)}
                className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center transition-colors duration-200"
              >
                <X className="w-5 h-5 text-white" />
              </motion.button>

              <motion.img
                key={selectedImage}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                src={selectedImage}
                alt="Gallery full view"
                className="max-w-full max-h-[90vh] object-contain rounded-2xl shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
