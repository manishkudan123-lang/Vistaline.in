import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function useTilt<T extends HTMLElement = HTMLElement>(maxTilt: number = 5) {
  const ref = useRef<T>(null!);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const onMouseMove = (e: MouseEvent) => {
        const rect = el.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        const tiltX = (y - 0.5) * maxTilt;
        const tiltY = (0.5 - x) * maxTilt;
        gsap.to(el, {
          rotationX: tiltX,
          rotationY: tiltY,
          transformPerspective: 1000,
          duration: 0.4,
          ease: 'power3.out',
          overwrite: 'auto',
        });
      };
      const onMouseLeave = () => {
        gsap.to(el, {
          rotationX: 0,
          rotationY: 0,
          duration: 0.6,
          ease: 'elastic.out(1, 0.3)',
        });
      };
      el.addEventListener('mousemove', onMouseMove);
      el.addEventListener('mouseleave', onMouseLeave);
      return () => {
        el.removeEventListener('mousemove', onMouseMove);
        el.removeEventListener('mouseleave', onMouseLeave);
      };
    });

    return () => ctx.revert();
  }, [maxTilt]);

  return ref;
}
