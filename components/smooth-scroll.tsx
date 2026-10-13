"use client";

import Lenis from "lenis";
import { MotionConfig } from "framer-motion";
import { useEffect, type ReactNode } from "react";

// Height of the sticky header, so anchored sections don't hide beneath it.
const HEADER_OFFSET = -84;

let lenis: Lenis | null = null;

/** Smoothly scroll to an in-page anchor such as "#book", even while scrolling is paused. */
export function scrollToHash(hash: string) {
  const target = document.querySelector<HTMLElement>(hash);
  if (!target) return;
  if (lenis) lenis.scrollTo(target, { offset: HEADER_OFFSET, duration: 1.2, force: true });
  else target.scrollIntoView({ behavior: "smooth" });
}

export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const instance = new Lenis({
      autoRaf: true,
      lerp: 0.1,
      anchors: { offset: HEADER_OFFSET, duration: 1.2 },
      // Let popups and drawers scroll natively.
      prevent: (node) => node.closest("[role='dialog']") !== null,
    });
    lenis = instance;

    // Pause page scrolling while a Radix dialog/sheet locks the body.
    const observer = new MutationObserver(() => {
      if (document.body.hasAttribute("data-scroll-locked")) instance.stop();
      else instance.start();
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ["data-scroll-locked"] });

    return () => {
      observer.disconnect();
      instance.destroy();
      lenis = null;
    };
  }, []);

  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
