"use client";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

/**
 * Refined contextual cursor. A small ring follows the pointer (springs);
 * over elements marked with `data-cursor="RUN"` it expands and shows the
 * label. Fine pointers only — never on touch. The native cursor stays.
 */
export function CursorHint() {
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 550, damping: 45, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 550, damping: 45, mass: 0.4 });

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = (e.target as HTMLElement | null)?.closest?.("[data-cursor]");
      setLabel(t ? t.getAttribute("data-cursor") : null);
    };
    const leave = () => setLabel(null);
    window.addEventListener("mousemove", move, { passive: true });
    document.documentElement.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      document.documentElement.removeEventListener("mouseleave", leave);
    };
  }, [x, y]);

  if (!enabled || reduce) return null;

  return (
    <motion.div
      aria-hidden="true"
      style={{ x: sx, y: sy }}
      className="pointer-events-none fixed left-0 top-0 z-50"
    >
      <motion.div
        animate={
          label
            ? { scale: 1, opacity: 1, width: "auto" }
            : { scale: 1, opacity: 0.55, width: "auto" }
        }
        transition={{ duration: 0.18 }}
        className={`flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border ${
          label
            ? "border-accent bg-paper/95 px-3 py-1.5 shadow-sm"
            : "h-6 w-6 border-fog/30 bg-transparent"
        }`}
      >
        {label && (
          <span className="whitespace-nowrap text-[10px] font-medium uppercase tracking-[0.2em] text-accent">
            {label}
          </span>
        )}
      </motion.div>
    </motion.div>
  );
}
