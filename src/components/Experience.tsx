"use client";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { experience } from "@/data/content";
import { Reveal } from "./primitives";

/**
 * Experience as a progressing timeline — two roles, nothing invented.
 * A blue rail grows down the left edge as the section scrolls through,
 * so motion reads as progression rather than decoration.
 */
export function ExperienceTimeline() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.75", "end 0.55"],
  });
  const rail = useSpring(scrollYProgress, { stiffness: 80, damping: 24 });

  return (
    <div className="relative">
      <div aria-hidden="true" className="absolute bottom-0 left-0 top-0 w-px bg-line" />
      {!reduce && (
        <motion.div
          aria-hidden="true"
          style={{ scaleY: rail }}
          className="absolute bottom-0 left-0 top-0 w-[2px] origin-top bg-accent"
        />
      )}
      <ol ref={ref} className="border-t border-line">
        {experience.map((e, i) => (
          <li key={e.org}>
            <Reveal delay={i * 0.06}>
              <div className="grid gap-3 border-b border-line py-8 pl-6 md:grid-cols-[1fr_220px] md:gap-8 md:py-10 md:pl-8">
                <div>
                  <h3 className="font-serif text-2xl tracking-tight text-fog md:text-3xl">
                    {e.role} <span className="text-muted">— {e.org}</span>
                  </h3>
                  <ul className="mt-4 space-y-2.5 text-[15px] leading-relaxed text-muted">
                    {e.points.map((pt, j) => (
                      <li key={j} className="flex gap-3">
                        <span aria-hidden="true">—</span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="md:text-right">
                  <p className="text-sm text-muted">{e.period}</p>
                </div>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </div>
  );
}
