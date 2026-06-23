import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const baseShapes = [
  { size: 16, color: '#FF8800', opacity: 0.08, x: '10%', y: '20%', duration: 4, delay: 0 },
  { size: 24, color: '#0088CC', opacity: 0.06, x: '85%', y: '15%', duration: 5, delay: 0.5 },
  { size: 12, color: '#FF8800', opacity: 0.1, x: '50%', y: '10%', duration: 3.5, delay: 1 },
  { size: 20, color: '#0A3D73', opacity: 0.05, x: '75%', y: '60%', duration: 6, delay: 0.2 },
  { size: 14, color: '#0088CC', opacity: 0.08, x: '20%', y: '70%', duration: 4.5, delay: 0.8 },
  { size: 18, color: '#FF8800', opacity: 0.06, x: '90%', y: '80%', duration: 5.5, delay: 0.3 },
];

export default function FloatingElements({ count = 6 }: { count?: number }) {
  const containerRef = useRef<HTMLDivElement>(null!);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const dots = el.querySelectorAll('.float-dot');
      dots.forEach((dot) => {
        const d = dot as HTMLElement;
        const dur = parseFloat(d.dataset.dur || '4');
        const del = parseFloat(d.dataset.delay || '0');
        gsap.to(d, {
          y: 'random(-40, 40)',
          x: 'random(-30, 30)',
          rotation: 'random(-25, 25)',
          scale: 'random(0.85, 1.15)',
          duration: dur,
          delay: del,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {baseShapes.slice(0, count).map((s, i) => (
        <div
          key={i}
          className="float-dot absolute rounded-full"
          style={{
            width: s.size,
            height: s.size,
            backgroundColor: s.color,
            opacity: s.opacity,
            left: s.x,
            top: s.y,
          }}
          data-dur={s.duration}
          data-delay={s.delay}
        />
      ))}
    </div>
  );
}
