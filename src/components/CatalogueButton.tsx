import { Download } from 'lucide-react';
import { motion } from 'motion/react';

const CATALOGUE_URL = 'https://drive.google.com/file/d/1YQNbXsqKcTDrV9JimPmUNg1wX9cN1goU/view';

export default function CatalogueButton() {

  return (
    <motion.a
      href={CATALOGUE_URL}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-5 py-3 rounded-full bg-[#FF8800] text-white text-sm font-bold shadow-lg shadow-[#FF8800]/30 hover:shadow-[#FF8800]/50 hover:-translate-y-0.5 transition-all duration-300"
    >
      <Download className="w-4 h-4" />
      <span>Download Our Catalogue</span>
    </motion.a>
  );
}
