import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

let pluginsRegistered = false;

const ensureGsapPlugins = () => {
  if (pluginsRegistered) return;
  gsap.registerPlugin(ScrollTrigger);
  pluginsRegistered = true;
};

export const initSiteAnimations = (root: HTMLElement) => {
  if (typeof window === 'undefined') return () => {};
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return () => {};

  ensureGsapPlugins();

  const ctx = gsap.context(() => {
    const navbar = root.querySelector<HTMLElement>('[data-anim-navbar]');
    if (navbar) {
      gsap.fromTo(
        navbar,
        { autoAlpha: 0, y: -26 },
        { autoAlpha: 1, y: 0, duration: 0.8, ease: 'power3.out' }
      );
    }

    const hero = root.querySelector<HTMLElement>('[data-anim-hero]');
    if (hero) {
      const heroItems = hero.querySelectorAll<HTMLElement>('[data-hero-item]');
      if (heroItems.length) {
        gsap.fromTo(
          heroItems,
          { autoAlpha: 0, y: 24 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.11,
            ease: 'power3.out',
            delay: 0.15
          }
        );
      }
    }

    gsap.utils.toArray<HTMLElement>('[data-anim-section]').forEach((section) => {
      if (hero && section === hero) return;
      gsap.fromTo(
        section,
        { autoAlpha: 0, y: 48 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 84%',
            once: true
          }
        }
      );
    });

    gsap.utils.toArray<HTMLElement>('[data-anim-stagger]').forEach((group) => {
      const items = group.querySelectorAll<HTMLElement>('[data-anim-item]');
      if (!items.length) return;

      gsap.fromTo(
        items,
        { autoAlpha: 0, y: 28 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.72,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: group,
            start: 'top 86%',
            once: true
          }
        }
      );
    });

    gsap.utils.toArray<HTMLElement>('[data-anim-float]').forEach((el, index) => {
      gsap.to(el, {
        y: index % 2 === 0 ? -12 : 12,
        duration: 3.4 + index * 0.25,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    });
  }, root);

  const refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 120);

  return () => {
    window.clearTimeout(refreshTimer);
    ctx.revert();
  };
};
