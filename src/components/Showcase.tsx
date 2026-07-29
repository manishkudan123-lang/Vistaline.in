import { X, ZoomIn, ZoomOut, Maximize, MessageCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { useTilt } from './useTilt';
import { useGoogleDriveFolder } from './useGoogleDriveFolder';

function ImageWithSkeleton({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const [highResLoaded, setHighResLoaded] = useState(false);
  const [lowResLoaded, setLowResLoaded] = useState(false);
  const [error, setError] = useState(false);

  const getLowResUrl = (url: string) => {
    if (!url) return '';
    if (url.includes('drive.google.com')) {
      if (url.includes('sz=')) return url.replace(/sz=w\d+/, 'sz=w100');
      return `${url}&sz=w100`;
    }
    return url;
  };

  const lowResSrc = getLowResUrl(src);

  return (
    <>
      {!lowResLoaded && !highResLoaded && !error && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-100 z-0 rounded-[inherit] overflow-hidden">
          <div className="absolute inset-0 animate-shimmer" />
          <div className="w-8 h-8 rounded-full border-2 border-slate-200 border-t-[#FF8800] animate-spin relative z-10" />
        </div>
      )}
      {!error && lowResSrc && (
        <img
          src={lowResSrc || undefined}
          alt=""
          loading="lazy"
          referrerPolicy="no-referrer"
          onLoad={() => setLowResLoaded(true)}
          className={`${className} absolute inset-0 w-full h-full object-cover filter blur-lg scale-105 transition-opacity duration-500 z-10 ${highResLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        />
      )}
      {src && (
        <img
          src={src || undefined}
          alt={alt}
          loading="lazy"
          referrerPolicy="no-referrer"
          onLoad={() => setHighResLoaded(true)}
          onError={() => { setHighResLoaded(true); setError(true); }}
          className={`${className} relative z-10 ${highResLoaded && !error ? 'opacity-100 scale-100' : 'opacity-0 scale-95'} transition-all duration-700 ease-out`}
        />
      )}
      {error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 bg-slate-100 z-20 rounded-[inherit]">
          <svg className="w-12 h-12 mb-2 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="text-xs font-semibold">Image Unavailable</span>
        </div>
      )}
    </>
  );
}

const partitions = [
  {
    id: 'vistaline-25',
    name: 'VISTALINE 25 (25mm × 25mm)',
    type: 'Single Glazed',
    category: 'single-glazed',
    folderId: '1Dn1-qoMPHaHbqfuDQVkVN3U0wUTDYubK',
    desc: 'Compact single-glazed partition system with a slim 25mm profile for lightweight interior divisions.',
    features: [
      'Standard section: 25mm × 25mm',
      'Suitable for 8mm / 10mm / 12mm toughened glass',
      'Partition height up to 3000mm',
      'Doors on hinges, patch systems, or pivot doors',
      'Stile doors can be incorporated',
      'Finishes: Mill, Silver, Black',
    ],
  },
  {
    id: 'vistaline-35',
    name: 'VISTALINE 35 (35mm × 16mm)',
    type: 'Single Glazed',
    category: 'single-glazed',
    folderId: '11_udwzKw7p_Rgo7AeKq4cVROgXsW6X81',
    desc: 'Ultra-slim 35mm single-glazed system for minimalist glass partitions with flexible mounting.',
    features: [
      'Standard section: 35mm × 16mm',
      'Suitable for 6mm / 8mm / 10mm toughened glass',
      'Partition height up to 3000mm',
      'Doors on hinges, patch systems, or pivot doors',
      'Glass doors and stile doors can be incorporated',
      'Finishes: Mill, Silver, Black',
    ],
  },
  {
    id: 'vistaline-45',
    name: 'VISTALINE 45 (45mm × 25mm)',
    type: 'Single Glazed',
    category: 'single-glazed',
    folderId: '1LUXj0B5hxR_VIYtEsYEO_oEu_wEyed0X',
    desc: 'Mid-size single-glazed partition balancing structural strength with a clean architectural look.',
    features: [
      'Standard section: 45mm × 25mm',
      'Suitable for 8mm / 10mm / 12mm toughened glass',
      'Partition height up to 3000mm',
      'Doors on hinges, patch systems, or pivot doors',
      'Glass doors and stile doors can be incorporated',
      'Finishes: Mill, Silver, Black',
    ],
  },
  {
    id: 'vistaline-78-sg',
    name: 'VISTALINE 78 (78mm × 25mm)',
    type: 'Single Glazed',
    category: 'single-glazed',
    folderId: '1JGQ-gklvxVFO2_4JCn_tnpSuNisrdo3b',
    desc: 'Wide-profile single-glazed system supporting multiple configurations with flush door integration.',
    features: [
      'Standard section: 78mm × 25mm',
      'Suitable for 8mm / 10mm / 12mm toughened glass',
      'Any configuration: full height, segmented, segmented at door height, multi-transform',
      'Accommodates flush doors of 35mm or 45mm',
      'Partition height up to 3000mm',
      'Doors on hinges, patch systems, or pivot doors',
      'Stile doors can be incorporated',
      'Finishes: Mill, Silver, Black',
    ],
  },
  {
    id: 'vistaline-78-dg',
    name: 'VISTALINE 78 (78mm × 25mm)',
    type: 'Double Glazed',
    category: 'double-glazed',
    folderId: '1_98S3680OLEa4H9FctfMy92rMr_iI8G4',
    desc: 'Demountable 78mm double-glazed partition for enhanced acoustic performance and thermal insulation.',
    features: [
      'Demountable glass partition, 78mm thick',
      'Maximum height: 3000mm (depending on elevations)',
      'Any configuration: full height, segmented, segmented at door height, multi-transform',
      'Doors on hinges, patch systems, or pivot doors',
      'Stile doors in both 65 Series and 75 Series',
      'Finishes: Mill, Silver, Black',
    ],
  },
  {
    id: 'vistaline-103-sg',
    name: 'VISTALINE 103 (103mm × 25mm)',
    type: 'Single Glazed',
    category: 'single-glazed',
    folderId: '1XhqDIPeqz3wV8a7vyuvyR3h0Mru0qDG0',
    desc: 'Heavy-duty 103mm single-glazed system for premium large-scale commercial partition projects.',
    features: [
      'Demountable glass partition, 103mm thick',
      'Maximum height: 3000mm (depending on elevations)',
      'Any configuration: full height, segmented, segmented at door height, multi-transform',
      'Doors on hinges, patch systems, or pivot doors',
      'Stile doors in both 65 Series and 75 Series',
      'Finishes: Mill, Silver, Black',
    ],
  },
  {
    id: 'vistaline-103-dg',
    name: 'VISTALINE 103 (103mm × 25mm)',
    type: 'Double Glazed',
    category: 'double-glazed',
    folderId: '1sK4pHPy7gAKnntMQrclG-TBTlq_DY5Tv',
    desc: 'Maximum-performance 103mm double-glazed partition for superior soundproofing and insulation.',
    features: [
      'Demountable glass partition, 103mm thick',
      'Maximum height: 3000mm (depending on elevations)',
      'Any configuration: full height, segmented, segmented at door height, multi-transform',
      'Doors on hinges, patch systems, or pivot doors',
      'Stile doors in both 65 Series and 75 Series',
      'Finishes: Mill, Silver, Black',
    ],
  },
  {
    id: 'vistaline-sd35-65',
    name: 'VISTALINE SD 35 & 65',
    type: 'Stile Door',
    category: 'stile-door',
    folderId: '1JGQ-gklvxVFO2_4JCn_tnpSuNisrdo3b',
    desc: 'Framed glass door system available for Series 35 and 65, compatible with European hardware.',
    features: [
      'Framed glass door system',
      'Available for Series 35 and 65',
      'Compatible with European hardware',
      'Open door closer can be incorporated',
      'Suitable for high-traffic areas',
      'Finishes: Mill, Silver, Black',
    ],
  },
  {
    id: 'vistaline-sd75-dgd75',
    name: 'VISTALINE SD75 & DGD75',
    type: 'Single & Double Glazed Stile Door',
    category: 'stile-door',
    folderId: '1-sh7xbrd-M2jJqqHfl7toKmblY47i_wB',
    desc: 'Framed glass door system for Series 75 with concealed closer and high acoustic performance.',
    features: [
      'Framed glass door system — Series 75',
      'Compatible with European hardware',
      'Concealed door closer for enhanced aesthetics',
      'High acoustic performance',
      'Single Glazed and Double Glazed configurations',
      'Finishes: Mill, Silver, Black',
    ],
  },
  {
    id: 'vistaline-portal',
    name: 'Technical Portal System',
    type: 'Portal System',
    category: 'portal',
    folderId: '1EZ96xHjySjcYnRVdhyziZBpvYpADxyyU',
    desc: 'Portal profile system compatible with all VISTALINE series for access control and meeting scheduler devices.',
    features: [
      'Compatible with all VISTALINE series',
      'Enables access control and meeting scheduler devices',
      'Available in 45mm, 78mm, and 103mm series',
      'Compatible with 8mm / 10mm / 12mm clear toughened glass',
      'Partition height up to 3000mm',
      'Finishes: Mill, Silver, Black',
    ],
  },
  {
    id: 'vistaline-sliding',
    name: 'Sliding System',
    type: 'Sliding System',
    category: 'sliding',
    folderId: '1aMXVBGC2B4wG72IpBvmKOVbDUNScaSeI',
    desc: 'Minimalist sliding glass door system with smooth operation using high-quality roller technology.',
    features: [
      'Minimalist sliding glass door system',
      'Space-saving design',
      'Smooth operation using high-quality roller technology',
      'Suitable for large and heavy glass doors',
      'Finishes: Silver, Black',
    ],
  },
];

function PartitionCard({ partition, index, onImageClick }: { partition: typeof partitions[0]; index: number; onImageClick: (src: string) => void; key?: string }) {
  const tiltRef = useTilt<HTMLDivElement>(4);
  const images = useGoogleDriveFolder(partition.folderId);
  const sliderImages = images.filter(i => !i.name.toUpperCase().includes('PROFILE'));
  const profileImages = images.filter(i => i.name.toUpperCase().includes('PROFILE'));
  const [imgIdx, setImgIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(0);
  const hasImages = sliderImages.length > 0;
  const currentImage = hasImages ? sliderImages[imgIdx].url : undefined;

  const goTo = (i: number) => {
    if (!hasImages) return;
    setImgIdx((i + sliderImages.length) % sliderImages.length);
  };

  useEffect(() => {
    if (paused || !hasImages || sliderImages.length === 1) return;
    const id = setInterval(() => {
      setImgIdx((prev) => (prev + 1) % sliderImages.length);
    }, 3000);
    return () => clearInterval(id);
  }, [sliderImages.length, paused, hasImages]);

  return (
    <motion.div
      ref={tiltRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
      className="bg-white rounded-2xl border border-slate-200/60 hover:border-[#FF8800]/30 shadow-sm hover:shadow-2xl hover:shadow-[#FF8800]/10 transition-all duration-500 flex flex-col overflow-hidden group cursor-default"
      style={{ transformStyle: 'preserve-3d' }}
    >
      <motion.div
        className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-[#FF8800]/[0.02] group-hover:bg-[#FF8800]/[0.06] transition-all duration-500 pointer-events-none"
        style={{ transform: 'translateZ(-10px)' }}
      />
      <div
        className="relative aspect-[1/1] w-full bg-[#F1F5F9]/30 border-b border-slate-100 overflow-hidden"
        style={{ transform: 'translateZ(30px)' }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="relative w-full h-full cursor-zoom-in" onClick={() => onImageClick(currentImage)}>
          <ImageWithSkeleton
            src={currentImage}
            alt={partition.name}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
          />
          <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/30 transition-all duration-300 flex items-center justify-center pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="bg-white/95 text-slate-800 rounded-full p-3 opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 shadow-xl backdrop-blur-md"
            >
              <ZoomIn className="w-6 h-6 opacity-80" />
            </motion.div>
          </div>
        </div>

        {sliderImages.length > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); goTo(imgIdx - 1); }}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-30 w-8 h-8 rounded-full bg-white/80 hover:bg-white shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-4 h-4 text-slate-700" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); goTo(imgIdx + 1); }}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-30 w-8 h-8 rounded-full bg-white/80 hover:bg-white shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              aria-label="Next image"
            >
              <ChevronRight className="w-4 h-4 text-slate-700" />
            </button>
          </>
        )}
        {sliderImages.length > 0 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1.5">
            {sliderImages.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setImgIdx(i); }}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  i === imgIdx ? 'bg-white w-4' : 'bg-white/50 hover:bg-white/80'
                }`}
                aria-label={`Go to image ${i + 1}`}
              />
            ))}
          </div>
        )}

        <div className="absolute top-4 left-4 z-20">
          <span className="text-[11px] font-bold tracking-[0.1em] text-[#FF8800] uppercase px-2.5 py-1 border border-[#FF8800]/30 rounded-full bg-white/90 shadow-sm">
            {partition.type}
          </span>
        </div>
      </div>

      <div className="p-5 sm:p-7 flex flex-col flex-grow relative bg-white" style={{ transform: 'translateZ(20px)' }}>
        <h3 className="text-xl font-bold text-[#1C1B1B] mb-3 font-display tracking-tight leading-tight line-clamp-2">{partition.name}</h3>
        <p className="text-slate-700 text-xs mb-6 leading-relaxed line-clamp-3">
          {partition.desc}
        </p>

        <ul className="space-y-2 mb-4 mt-auto">
          {partition.features.map((f, j) => (
            <motion.li
              key={j}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: 0.35 + j * 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-start gap-2 text-xs text-slate-600 font-medium"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF8800] shrink-0 mt-1.5" />
              {f}
            </motion.li>
          ))}
        </ul>

        {profileImages.length > 0 && (
          <div className="mb-6 mt-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">Profile Views</span>
              <div className="h-px flex-1 bg-slate-100" />
            </div>
            <div className="flex flex-wrap gap-3">
              {profileImages.map((img, j) => (
                <button
                  key={j}
                  onClick={() => onImageClick(img.url)}
                  className={`w-28 h-28 rounded-xl overflow-hidden border-2 transition-all duration-200 shrink-0 ${
                    selectedProfile === j
                      ? 'border-[#FF8800] ring-1 ring-[#FF8800]/30 shadow-sm'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                  onMouseEnter={() => setSelectedProfile(j)}
                >
                  <img
                    src={img.url}
                    alt={`${partition.name} profile ${j + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        )}

        <motion.a
          href={`https://wa.me/919100044126?text=Hi!%20I%20want%20to%20inquire%20about%20${encodeURIComponent(partition.name)}`}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-3 rounded-xl bg-[#FF8800] hover:bg-[#E67700] text-white text-sm font-bold transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg hover:-translate-y-0.5 text-center mt-2 relative overflow-hidden"
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent"
            initial={{ x: '-100%' }}
            whileHover={{ x: '200%' }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          />
          <MessageCircle className="w-4 h-4 relative z-10" />
          <span className="relative z-10">Inquire Now</span>
        </motion.a>
      </div>
    </motion.div>
  );
}

export default function Showcase() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'single-glazed' | 'double-glazed' | 'stile-door' | 'portal' | 'sliding'>('all');

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const filteredPartitions = partitions.filter((p) => filter === 'all' || p.category === filter);

  const filterTabs = [
    { id: 'all', label: 'All Systems', count: partitions.length },
    { id: 'single-glazed', label: 'Single Glazed', count: partitions.filter(p => p.category === 'single-glazed').length },
    { id: 'double-glazed', label: 'Double Glazed', count: partitions.filter(p => p.category === 'double-glazed').length },
    { id: 'stile-door', label: 'Door Systems', count: partitions.filter(p => p.category === 'stile-door').length },
    { id: 'portal', label: 'Portal', count: partitions.filter(p => p.category === 'portal').length },
    { id: 'sliding', label: 'Sliding', count: partitions.filter(p => p.category === 'sliding').length },
  ] as const;

  return (
    <section className="pt-32 pb-24 bg-[#FCF9F8] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-[#FF8800]/[0.02] to-transparent pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 relative z-10">
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-[#1C1B1B] mb-6 tracking-tight">
            Our Services
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto font-medium">
            Discover our masterfully engineered partition systems. High-end materials, precise craftsmanship, and architectural elegance.
          </p>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-3 mb-16 relative z-10">
          {filterTabs.map((tab, i) => {
            const isActive = filter === tab.id;
            return (
              <motion.button
                key={tab.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
                onClick={() => setFilter(tab.id as any)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 flex items-center gap-2 border ${
                  isActive
                    ? 'bg-[#FF8800] text-white border-[#FF8800] shadow-lg shadow-[#FF8800]/20 -translate-y-0.5'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:text-slate-800'
                }`}
              >
                <AnimatePresence mode="wait">
                  {isActive && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="w-1.5 h-1.5 rounded-full bg-white"
                    />
                  )}
                </AnimatePresence>
                <span>{tab.label}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full font-extrabold ${isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'}`}>
                  {tab.count}
                </span>
              </motion.button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPartitions.map((partition, index) => (
            <PartitionCard key={partition.id} partition={partition} index={index} onImageClick={setSelectedImage} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="mt-20"
        >
          <div className="bg-gradient-to-r from-[#0A3D73] to-[#041c36] rounded-[2rem] p-8 md:p-12 text-center shadow-2xl relative overflow-hidden">
            <motion.div
              className="absolute top-0 right-0 w-64 h-64 bg-[#FF8800] rounded-full blur-[100px] opacity-20 -translate-y-1/2 translate-x-1/3"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#00A2FF] rounded-full blur-[100px] opacity-20 translate-y-1/3 -translate-x-1/3" />

            <div className="relative z-10 max-w-2xl mx-auto">
              <h3 className="text-2xl md:text-3xl font-black text-white mb-4 uppercase tracking-wider">
                Need Help Choosing?
              </h3>
              <p className="text-slate-300 mb-8 max-w-xl mx-auto">
                Our team is ready to guide you to the right partition system for your project.
              </p>
              <motion.a
                href="https://wa.me/919100044126?text=Hi,%20I%20want%20to%20know%20more%20about%20your%20VISTALINE%20partition%20systems"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#00E676] text-[#0A3D73] font-bold hover:bg-[#00c853] transition-all duration-200 shadow-xl hover:shadow-2xl mx-auto text-lg relative overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '200%' }}
                  transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                />
                <MessageCircle className="w-6 h-6 relative z-10" />
                <span className="relative z-10">Chat on WhatsApp</span>
              </motion.a>
            </div>
          </div>
        </motion.div>

        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
              className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/95 backdrop-blur-sm cursor-zoom-out"
            >
              <button
                onClick={(e) => { e.stopPropagation(); setSelectedImage(null); }}
                className="absolute top-6 right-6 z-[60] p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors backdrop-blur-md"
                aria-label="Close lightbox"
              >
                <X className="w-6 h-6" />
              </button>

              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                onClick={(e) => e.stopPropagation()}
                drag="y"
                dragConstraints={{ top: 0, bottom: 0 }}
                dragElastic={1}
                onDragEnd={(e, info) => { if (Math.abs(info.offset.y) > 100) setSelectedImage(null); }}
                className="relative w-full h-full flex items-center justify-center cursor-default"
              >
                <TransformWrapper
                  initialScale={1}
                  minScale={0.5}
                  maxScale={8}
                  centerOnInit={true}
                  wheel={{ smoothStep: 0.005 }}
                  doubleClick={{ step: 2 }}
                  pinch={{ step: 5 }}
                >
                  {({ zoomIn, zoomOut, resetTransform }) => (
                    <div className="relative w-full h-full flex items-center justify-center">
                      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[60] flex items-center gap-3 bg-slate-800/80 backdrop-blur-md p-2 rounded-full border border-slate-700/50">
                        <button onClick={() => zoomOut()} className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-all" title="Zoom Out" aria-label="Zoom out">
                          <ZoomOut className="w-5 h-5" />
                        </button>
                        <div className="w-[1px] h-4 bg-slate-600/50" />
                        <button onClick={() => resetTransform()} className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-all" title="Reset Zoom" aria-label="Reset zoom">
                          <Maximize className="w-4 h-4" />
                        </button>
                        <div className="w-[1px] h-4 bg-slate-600/50" />
                        <button onClick={() => zoomIn()} className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-all" title="Zoom In" aria-label="Zoom in">
                          <ZoomIn className="w-5 h-5" />
                        </button>
                      </div>

                      <TransformComponent
                        wrapperStyle={{ width: "100vw", height: "100vh" }}
                        contentStyle={{ width: "100vw", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}
                      >
                        <img
                          src={selectedImage || undefined}
                          className="w-auto h-auto max-w-[95vw] max-h-[90vh] object-contain rounded-lg shadow-2xl cursor-grab active:cursor-grabbing"
                          alt="Enlarged partition view"
                          referrerPolicy="no-referrer"
                        />
                      </TransformComponent>
                    </div>
                  )}
                </TransformWrapper>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
