"use client";
import { useState } from "react";
import { research } from "@/data/content";
import { DriftReveal } from "./primitives";

/**
 * Research archive — an editorial index, not cards.
 * Rows arrive laterally, like edges entering a graph.
 * Selecting a row expands the full citation line.
 */
export function ResearchArchive() {
  const [open, setOpen] = useState<string | null>(research[0].index);
  return (
    <div className="border-y border-line">
      <div
        aria-hidden="true"
        className="grid grid-cols-[52px_1fr_auto] gap-4 border-b border-line px-1 py-3 text-[12px] uppercase tracking-[0.14em] text-muted"
      >
        <span>No.</span>
        <span>Record</span>
        <span>Venue</span>
      </div>
      {research.map((r, i) => {
        const isOpen = open === r.index;
        return (
          <DriftReveal key={r.index} delay={i * 0.07}>
            <div className="border-b border-line last:border-b-0">
              <button
                onClick={() => setOpen(isOpen ? null : r.index)}
                aria-expanded={isOpen}
                className="grid w-full grid-cols-[52px_1fr_auto] items-baseline gap-4 px-1 py-5 text-left transition-colors hover:bg-paper"
              >
                <span className={`text-[13px] tabular-nums ${isOpen ? "font-medium text-accent" : "text-muted"}`}>
                  {r.index}
                </span>
                <span className="text-[16px] leading-relaxed text-fog">{r.text}</span>
                <span className="hidden text-[13px] text-muted sm:block">
                  {r.tag}
                </span>
              </button>
              {isOpen && (
                <div className="border-t border-line bg-paper px-1 py-5 sm:pl-[68px]">
                  <p className="text-[12px] font-medium uppercase tracking-[0.14em] text-accent">
                    Citation
                  </p>
                  <p className="mt-2 font-serif text-[19px] italic leading-relaxed text-fog">
                    {r.text} Leeon John.
                  </p>
                </div>
              )}
            </div>
          </DriftReveal>
        );
      })}
    </div>
  );
}
