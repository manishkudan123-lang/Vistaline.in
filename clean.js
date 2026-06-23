const fs = require('fs');
let c = fs.readFileSync('src/components/AllProducts.tsx', 'utf8');

const sStart = c.indexOf('function ImageWithSkeleton({ src, alt, className }: { src: string; alt: string; className?: string}) {');
const sEnd = c.indexOf('interface Product {');

const rep = `function ImageWithSkeleton({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const [error, setError] = useState(false);
  
  // Directly load full high-res image immediately (no lazy load, no progressive blur)
  return (
    <>
      {!error && (
        <img
          src={src}
          alt={alt}
          loading="eager"
          referrerPolicy="no-referrer"
          onError={() => setError(true)}
          className={\`${className} relative z-10 object-contain\`}
        />
      )}

      {error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 bg-slate-100 z-20 rounded-[inherit]">
          <svg className="w-10 h-10 mb-1.5 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l2.682-2.682a4 4 0 011.414 0L12 15m-2 2l5.682-5.682a4 4 0 011.414 0l4.414 4.414M16 20l.001.001M10 9p.m001.001m-10-4a2 2 0 112-2 2 2 0 011-2 2m12 0h.01"
            />
          </svg>
          <span className="text-[10px] font-bold">Actual Image Not Available</span>
        </div>
      )}
    </>
  );
}

`;

c = c.substring(0, sStart) + rep + c.substring(sEnd);
fs.writeFileSync('src/components/AllProducts.tsx', c);
console.log('Update Skeleton Complete!');