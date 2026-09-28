"use client";
import type { ReactNode } from "react";
import type { SimPhase } from "@/hooks/useSimulation";

/**
 * Shared frame for every project demonstration:
 * run/reset controls, frontend-only disclaimer, and a visible
 * step log (aria-live) that doubles as the reduced-motion fallback.
 */
export function DemoShell({
  runLabel,
  cursorLabel,
  onRun,
  onReset,
  phase,
  log,
  logLabel,
  disclaimer,
  children,
}: {
  runLabel: string;
  cursorLabel: string;
  onRun: () => void;
  onReset: () => void;
  phase: SimPhase;
  log: string[];
  logLabel: string;
  disclaimer?: string;
  children: ReactNode;
}) {
  const status = phase === "idle" ? "Ready" : phase === "running" ? "Running…" : "Complete";
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-3">
        <p className="text-[12px] uppercase tracking-[0.14em] text-muted">
          Demonstration <span aria-hidden="true">·</span> frontend only
          <span className="sr-only">. {status}.</span>
        </p>
        <div className="flex items-center gap-5">
          <button
            type="button"
            onClick={onRun}
            disabled={phase === "running"}
            data-cursor={cursorLabel}
            className="text-sm font-medium text-accent underline decoration-accent/40 underline-offset-[5px] transition-colors hover:decoration-accent disabled:no-underline disabled:opacity-40"
          >
            {phase === "running" ? "Running…" : runLabel}
          </button>
          <button
            type="button"
            onClick={onReset}
            disabled={phase === "idle"}
            className="text-sm text-muted underline decoration-line underline-offset-[5px] transition-colors hover:text-fog disabled:opacity-40"
          >
            Reset
          </button>
        </div>
      </div>

      <div className="py-5">{children}</div>

      {disclaimer && (
        <p className="border border-line bg-ink px-4 py-3 text-[13px] leading-relaxed text-muted">
          {disclaimer}
        </p>
      )}

      <div className="mt-4">
        <p className="text-[12px] uppercase tracking-[0.14em] text-muted">{logLabel}</p>
        {log.length === 0 ? (
          <p className="mt-2 text-sm text-muted">Press run to start the walkthrough.</p>
        ) : (
          <ol aria-live="polite" className="mt-2 space-y-1.5">
            {log.map((entry, i) => (
              <li key={i} className="flex gap-3 text-sm leading-relaxed text-fog">
                <span aria-hidden="true" className="tabular-nums text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>{entry}</span>
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
}
