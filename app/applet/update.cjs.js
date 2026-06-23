const fs = require('fs');
let c = fs.readFileSync('src/components/AllProducts.tsx', 'utf8');

const s1 = '  const [isDropdownOpen, setIsDropdownOpen] = useState(false);';
const r1 = '  const [isDropdownOpen, setIsDropdownOpen] = useState(false);\n  const [showHardware, setShowHardware] = useState(false);';

c = c.replace(s1, r1);

// We need to extract the render logic for the product card so we can reuse it
const mapStart = c.indexOf('{filteredProducts.map((product) => (');
const mapEnd = c.indexOf('</motion.div>\n            ))}');

let cardHtml = c.substring(mapStart, mapEnd + 13) + '\n  );'; // till </motion.div>
cardHtml = cardHtml.replace('{filteredProducts.map((product) => (', 'const renderProductCard = (product: Product) => (');

// Insert it above return (
const returnIndex = c.indexOf('  return (');
c = c.substring(0, returnIndex) + '\n  ' + cardHtml + '\n\n' + c.substring(returnIndex);


const searchStart = c.indexOf('{/* Active Counters */}');
const searchEnd = c.indexOf('{/* Full Screen Modal */}');

if(searchStart === -1 || searchEnd === -1) {
   console.log('Could not find search markers!');
} else {
  const originalGrid = c.substring(searchStart, searchEnd);
  
  const modifiedGrid = `{/* Active Counters */}
          <div className="ml-auto shrink-0 text-xs font-bold text-slate-500 bg-slate-150 px-3 py-1.5 rounded-lg border border-slate-200/30">
            Filtered: {filteredProducts.length} items
          </div>
        </div>

        {/* Dynamic Products Grid Sections */}
        {filteredProducts.length > 0 ? (
          <div className="space-y-20">
            {/* VLP Series Section */}
            {filteredProducts.filter(p => !!p.code.match(/^BLR-/i) && (parseInt(p.code.replace(/[^0-9]/g, '')) <= 78)).length > 0 && (
              <div>
                <div className="flex items-center gap-4 mb-8">
                  <h2 className="text-2xl font-black text-slate-900">VLP Series</h2>
                  <div className="h-[1px] flex-1 bg-slate-200"></div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredProducts
                    .filter(p => !!p.code.match(/^BLR-/i) && (parseInt(p.code.replace(/[^0-9]/g, '')) <= 78))
                    .map((product) => renderProductCard(product))}
                </div>
              </div>
            )}

            {/* VLP Series Hardware Section */}
            {filteredProducts.filter(p => !(!!p.code.match(/^BLR-/i) && (parseInt(p.code.replace(/[^0-9]/g, '')) <= 78))).length > 0 && (
              <div>
                <motion.div 
                  className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 md:p-6 mb-8 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 text-white cursor-pointer shadow-lg hover:shadow-xl transition-all group"
                  onClick={() => setShowHardware(!showHardware)}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.995 }}
                >
                  <div>
                    <span className="text-[#00aaee] font-bold tracking-widest text-[10px] uppercase mb-1 block">COMPLEMENTARY UPGRADES</span>
                    <h2 className="text-2xl md:text-3xl font-black">VLP Series Hardware</h2>
                    <p className="text-slate-300 text-sm mt-1 max-w-xl">Premium heavy-duty locks, structural components, and essential accessories crafted perfectly for the VLP series. Click to explore.</p>
                  </div>
                  <div className="shrink-0 flex items-center gap-3 bg-white/10 px-4 py-2.5 rounded-xl border border-white/20 hover:bg-white/20 transition-colors">
                    <span className="text-sm font-bold">{showHardware ? 'Hide Components' : 'View Components'}</span>
                    <ChevronDown className={\`w-5 h-5 transition-transform duration-300 \${showHardware ? 'rotate-180' : ''}\`} />
                  </div>
                </motion.div>

                <AnimatePresence>
                  {showHardware && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, overflow: 'hidden' }}
                      animate={{ opacity: 1, height: 'auto', overflow: 'visible' }}
                      exit={{ opacity: 0, height: 0, overflow: 'hidden' }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-4">
                        {filteredProducts
                          .filter(p => !(!!p.code.match(/^BLR-/i) && (parseInt(p.code.replace(/[^0-9]/g, '')) <= 78)))
                          .map((product) => renderProductCard(product))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
        ) : (
          <div className="py-24 text-center">
            <div className="inline-block p-6 rounded-full bg-slate-100 mb-4">
              <Search className="w-10 h-10 text-slate-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">No products found</h3>
            <p className="text-slate-500">Try adjusting your search or filter settings to see results.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="mt-6 px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-sm transition-colors"
            >
              Clear all filters
            </button>
          </div>
        )}

        `;
  
  c = c.replace(originalGrid, modifiedGrid);
  fs.writeFileSync('src/components/AllProducts.tsx', c);
  console.log('Replaced grid area');
}
