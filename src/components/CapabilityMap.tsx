"use client";
import { useState } from "react";
import { capabilities, capabilityLinks } from "@/data/content";
import { Reveal } from "./primitives";

/**
 * Capability map — not a pill wall.
 * Select a category; the readout shows its technologies as an
 * indexed register. Selecting a technology lights up its
 * resume-supported relations across the same register.
 */
export function CapabilityMap() {
  const [active, setActive] = useState(capabilities[1].id);
  const [focus, setFocus] = useState<string | null>(null);
  const current = capabilities.find((c) => c.id === active)!;
  const related = focus ? (capabilityLinks[focus] ?? []) : [];

  const selectCategory = (id: string) => {
    setActive(id);
    setFocus(null);
  };

  const toggleFocus = (item: string) => {
    setFocus((f) => (f === item ? null : item));
  };

  return (
    <div className="grid gap-px border border-line bg-line md:grid-cols-[1fr_1.4fr]">
      <div role="tablist" aria-label="Capability categories" className="bg-ink">
        {capabilities.map((c) => (
          <button
            key={c.id}
            role="tab"
            aria-selected={active === c.id}
            onClick={() => selectCategory(c.id)}
            className={`flex w-full items-baseline justify-between gap-4 border-l-2 px-5 py-4 text-left transition-colors md:px-7 ${
              active === c.id
                ? "border-accent bg-paper"
                : "border-transparent hover:bg-paper"
            }`}
          >
            <span>
              <span className="block text-[12px] tabular-nums text-muted">{c.no}</span>
              <span className="mt-0.5 block font-serif text-[19px] tracking-tight text-fog">
                {c.category}
              </span>
            </span>
            <span aria-hidden="true" className="text-[13px] tabular-nums text-muted">
              {c.items.length}
            </span>
          </button>
        ))}
      </div>
      <div role="tabpanel" aria-live="polite" className="bg-paper p-6 md:p-9">
        <p className="text-[12px] font-medium uppercase tracking-[0.14em] text-accent">
          {current.category}
        </p>
        <p className="mt-2 text-[14px] text-muted">{current.note}</p>
        <p className="mt-3 text-[13px] text-muted" aria-live="polite">
          {focus ? (
            <>
              <span className="font-medium text-accent">{focus}</span>
              {related.length > 0 ? (
                <> connects to {related.join(" · ")}</>
              ) : (
                <> — no recorded connections in this register</>
              )}
            </>
          ) : (
            <>Select a technology to see its connections.</>
          )}
        </p>
        <ol
          className="mt-4 divide-y divide-line border-y border-line"
          onKeyDown={(e) => {
            if (e.key === "Escape") setFocus(null);
          }}
        >
          {current.items.map((item, i) => {
            const isFocus = focus === item;
            const isRelated = related.includes(item);
            const dimmed = focus !== null && !isFocus && !isRelated;
            return (
              <li key={item} className={dimmed ? "opacity-40" : undefined}>
                <button
                  type="button"
                  onClick={() => toggleFocus(item)}
                  aria-pressed={isFocus}
                  data-cursor="Inspect"
                  className="flex w-full items-baseline gap-4 py-2.5 text-left"
                >
                  <span
                    className={`w-8 shrink-0 text-[12px] tabular-nums ${
                      isFocus || isRelated ? "font-medium text-accent" : "text-muted"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className={`text-[15px] ${isFocus ? "font-medium text-fog" : "text-fog"}`}>
                    {isRelated && !isFocus && (
                      <span aria-hidden="true" className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-accent" />
                    )}
                    {item}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}

export function CapabilitySection() {
  return (
    <Reveal>
      <CapabilityMap />
    </Reveal>
  );
}
