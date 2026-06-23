import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealOptions {
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  trigger?: string;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  markers?: boolean;
  toggleActions?: string;
  stagger?: number;
  once?: boolean;
}

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options: ScrollRevealOptions = {}
) {
  const ref = useRef<T>(null!);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const fromVars = options.from || { opacity: 0, y: 40 };
      const toVars = options.to || { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' };

      const children = el.children.length > 0 && options.stagger
        ? el.children
        : el;

      gsap.fromTo(
        children,
        fromVars,
        {
          ...toVars,
          scrollTrigger: {
            trigger: options.trigger ? el.querySelector(options.trigger) || el : el,
            start: options.start || 'top 85%',
            end: options.end || 'top 40%',
            toggleActions: options.toggleActions || 'play none none reverse',
            once: options.once ?? true,
            markers: options.markers || false,
          },
          stagger: options.stagger || 0,
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return ref;
}

export function useParallax<T extends HTMLElement = HTMLDivElement>(
  speed: number = 0.3
) {
  const ref = useRef<T>(null!);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.to(el, {
        y: () => (el.offsetHeight * speed) / 2,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    });

    return () => ctx.revert();
  }, [speed]);

  return ref;
}

export function useCounter<T extends HTMLElement = HTMLSpanElement>(
  end: number,
  duration: number = 2,
  suffix: string = ''
) {
  const ref = useRef<T>(null!);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const obj = { val: 0 };
      gsap.to(obj, {
        val: end,
        duration,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          once: true,
        },
        onUpdate: () => {
          el.textContent = Math.round(obj.val) + suffix;
        },
      });
    });

    return () => ctx.revert();
  }, [end, duration, suffix]);

  return ref;
}
