"use client";
import { useEffect } from "react";

/* Leeon → Intelligence: Identity → Signal → Expand → Intelligence → Refine → Settle. */
const FRAMES = [
  "/favicon/frame-1-identity.svg",
  "/favicon/frame-2-signal.svg",
  "/favicon/frame-3-expand.svg",
  "/favicon/frame-4-intelligence.svg",
  "/favicon/frame-5-refine.svg",
  "/favicon/frame-6-settle.svg",
];
const FRAME_MS = 400;

/**
 * Lightweight animated favicon. Preloads six tiny SVGs once, then swaps
 * the existing `rel="icon"` link on a 400ms interval. Pauses when the tab
 * is hidden; never starts when the user prefers reduced motion (the
 * static frame-1 link from page metadata remains in that case).
 * No re-renders — everything runs outside React state.
 */
export function FaviconAnimator() {
  useEffect(() => {
    for (const src of FRAMES) {
      const img = new Image();
      img.src = src;
    }

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    const getLink = () => {
      let link = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
      if (!link) {
        link = document.createElement("link");
        link.rel = "icon";
        link.type = "image/svg+xml";
        document.head.appendChild(link);
      }
      return link;
    };

    let i = 0;
    let id: number | undefined;
    const start = () => {
      if (id === undefined && !document.hidden) {
        id = window.setInterval(() => {
          i = (i + 1) % FRAMES.length;
          getLink().href = FRAMES[i]!;
        }, FRAME_MS);
      }
    };
    const stop = () => {
      if (id !== undefined) {
        window.clearInterval(id);
        id = undefined;
      }
    };
    const onVis = () => (document.hidden ? stop() : start());
    const onMotion = (e: MediaQueryListEvent) => (e.matches ? stop() : start());

    document.addEventListener("visibilitychange", onVis);
    mq.addEventListener("change", onMotion);
    start();
    return () => {
      stop();
      document.removeEventListener("visibilitychange", onVis);
      mq.removeEventListener("change", onMotion);
    };
  }, []);

  return null;
}
