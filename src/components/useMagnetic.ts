import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function useMagnetic<T extends HTMLElement = HTMLElement>(strength: number = 0.3) {
  const ref = useRef<T>(null!);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const onMouseMove = (e: MouseEvent) => {
        const rect = el.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) * strength;
        const y = (e.clientY - rect.top - rect.height / 2) * strength;
        gsap.to(el, { x, y, duration: 0.4, ease: 'power3.out', overwrite: 'auto' });
      };
      const onMouseLeave = () => {
        gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.3)' });
      };
      el.addEventListener('mousemove', onMouseMove);
      el.addEventListener('mouseleave', onMouseLeave);
      return () => {
        el.removeEventListener('mousemove', onMouseMove);
        el.removeEventListener('mouseleave', onMouseLeave);
      };
    });

    return () => ctx.revert();
  }, [strength]);

  return ref;
}
