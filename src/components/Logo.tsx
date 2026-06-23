import { useState } from 'react';

export default function Logo({ className = "h-8", showTm = true }: { className?: string; showTm?: boolean }) {
  const [imgError, setImgError] = useState(false);

  if (imgError) {
    return (
      <div className={`flex items-center ${className}`}>
        <span className="font-display font-black text-2xl md:text-3xl tracking-tighter leading-none whitespace-nowrap">
          <span className="text-[#FF8800]">VISTA</span>
          <span className="text-[#00A2FF]">LINE</span>
        </span>
        {showTm && <span className="text-[10px] font-bold text-[#00A2FF] -mt-5 ml-1">TM</span>}
      </div>
    );
  }

  return (
    <img 
      src="/logo.png" 
      alt="VISTALINE" 
      className={`${className} object-contain`} 
      onError={() => setImgError(true)} 
    />
  );
}
