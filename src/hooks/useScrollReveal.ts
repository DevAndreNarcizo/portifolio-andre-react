import { useEffect } from 'react';

export const useScrollReveal = () => {
  useEffect(() => {
    document.documentElement.classList.add('reveal-ready');

    const revealElement = (element: Element) => {
      element.classList.add('is-visible');
    };

    const revealPassedElements = () => {
      const revealLine = window.innerHeight * 0.92;

      document.querySelectorAll('.reveal:not(.is-visible)').forEach((element) => {
        const rect = element.getBoundingClientRect();

        if (rect.top < revealLine) {
          revealElement(element);
        }
      });
    };

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.querySelectorAll('.reveal').forEach((element) => {
        revealElement(element);
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            revealElement(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.14,
        rootMargin: '0px 0px -8% 0px'
      }
    );

    const elements = document.querySelectorAll('.reveal');
    elements.forEach((element) => observer.observe(element));

    requestAnimationFrame(revealPassedElements);
    window.addEventListener('scroll', revealPassedElements, { passive: true });
    window.addEventListener('resize', revealPassedElements);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', revealPassedElements);
      window.removeEventListener('resize', revealPassedElements);
      document.documentElement.classList.remove('reveal-ready');
    };
  }, []);
};
