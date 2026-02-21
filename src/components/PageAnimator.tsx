import { useEffect } from "react";

interface Props {
  trigger: boolean;
  stagger?: number;
}

// Simple DOM-based animator: finds common structural elements and applies
// entrance classes with a gentle stagger so headers and content slide in
// from different angles. This keeps changes minimal and works across pages.
export default function PageAnimator({ trigger, stagger = 90 }: Props) {
  useEffect(() => {
    if (!trigger) return;

    const selectors = [
      'header',
      '.hero',
      '.Hero',
      '.header',
      '.Header',
      'main',
      '.main',
      '.content',
      '.container',
      'footer',
    ];

    const seen = new Set<Element>();
    const elements: Element[] = [];

    for (const sel of selectors) {
      const found = Array.from(document.querySelectorAll(sel));
      for (const el of found) {
        if (!seen.has(el)) {
          seen.add(el);
          elements.push(el);
        }
      }
    }

    // If we didn't find any targets, fall back to the body children
    if (elements.length === 0) {
      elements.push(...Array.from(document.body.children));
    }

    elements.forEach((el, i) => {
      // choose a direction based on index for a lo-fi staggered feel
      const dir = i % 4;
      el.classList.remove('enter-from-top', 'enter-from-left', 'enter-from-right', 'enter-from-bottom', 'enter-in');
      if (dir === 0) el.classList.add('enter-from-top');
      if (dir === 1) el.classList.add('enter-from-left');
      if (dir === 2) el.classList.add('enter-from-right');
      if (dir === 3) el.classList.add('enter-from-bottom');

      // set staggered transition delay
      (el as HTMLElement).style.transitionDelay = `${i * stagger}ms`;

      // force a reflow then add the 'enter-in' class to start the animation
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      el.clientTop;
      setTimeout(() => el.classList.add('enter-in'), 20 + i * stagger);
    });

    // cleanup: remove inline delays after animation finishes
    const cleanupT = setTimeout(() => {
      elements.forEach((el) => {
        (el as HTMLElement).style.transitionDelay = '';
      });
    }, elements.length * stagger + 800);

    return () => clearTimeout(cleanupT);
  }, [trigger, stagger]);

  return null;
}
