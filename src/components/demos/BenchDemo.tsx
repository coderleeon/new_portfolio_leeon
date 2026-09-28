"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { demoStrings } from "@/data/content";
import { DemoShell } from "./DemoShell";

type BenchPhase = "idle" | "running" | "done";

const LOG = [
  "Evaluation pipeline assembled — requests batched dynamically.",
  "Model B served from the multi-tier cache.",
  "Model C failed mid-run — fallback strategy engaged.",
  "Evaluation recorded: quality, latency, cost, and failures.",
];

const RESULTS = [
  { model: "Model A", latency: "1.0×", cache: "miss", outcome: "Completed" },
  { model: "Model B", latency: "0.6×", cache: "hit", outcome: "Completed" },
  { model: "Model C", latency: "failed", cache: "miss", outcome: "Completed via fallback" },
];

/**
 * BenchLytics as a visual benchmark simulation. Three illustrative model
 * lanes execute at different speeds; one hits the cache, one fails and
 * falls back. All values are illustrative animation — never measurements.
 */
export function BenchDemo() {
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState<BenchPhase>("idle");
  const [failed, setFailed] = useState(false);
  const [cached, setCached] = useState(false);
  const timers = useRef<number[]>([]);

  const clearTimers = () => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  };

  const run = () => {
    clearTimers();
    setFailed(false);
    setCached(false);
    if (reduce) {
      setFailed(true);
      setCached(true);
      setPhase("done");
      return;
    }
    setPhase("running");
    timers.current.push(window.setTimeout(() => setCached(true), 1400));
    timers.current.push(window.setTimeout(() => setFailed(true), 1900));
    timers.current.push(window.setTimeout(() => setPhase("done"), 4400));
  };

  const reset = () => {
    clearTimers();
    setFailed(false);
    setCached(false);
    setPhase("idle");
  };

  useEffect(() => () => clearTimers(), []);

  const running = phase === "running";
  const done = phase === "done";
  const log = phase === "idle" ? [] : LOG.slice(0, done ? 4 : failed ? 3 : cached ? 2 : 1);

  const lane = (label: string, target: string, duration: number, extra?: React.ReactNode) => (
    <div>
      <div className="flex items-baseline justify-between text-[13px]">
        <span className="font-medium text-fog">{label}</span>
        <span className="text-muted">{extra}</span>
      </div>
      <div className="mt-1.5 h-2.5 w-full bg-ink" role="img" aria-label={`${label} execution progress`}>
        <motion.div
          initial={false}
          animate={{ width: phase === "idle" ? "0%" : target }}
          transition={reduce ? { duration: 0 } : { duration, ease: "easeInOut" }}
          className="h-full bg-accent"
        />
      </div>
    </div>
  );

  return (
    <DemoShell
      runLabel="Run benchmark"
      cursorLabel="Run"
      onRun={run}
      onReset={reset}
      phase={phase}
      log={log}
      logLabel="Benchmark log"
      disclaimer={demoStrings.benchNote}
    >
      <div className="space-y-4">
        {lane("Model A", "86%", 2.6, running || done ? "executing" : "queued")}
        {lane(
          "Model B",
          "52%",
          1.3,
          cached || done ? <span className="font-medium text-accent">cache hit — skipped compute</span> : "queued"
        )}
        <div>
          <div className="flex items-baseline justify-between text-[13px]">
            <span className="font-medium text-fog">Model C</span>
            <span className={failed || done ? "text-muted line-through" : "text-muted"}>
              {failed || done ? "failed at 64%" : "queued"}
            </span>
          </div>
          <div className="mt-1.5 h-2.5 w-full bg-ink" role="img" aria-label="Model C execution progress">
            <motion.div
              initial={false}
              animate={{ width: phase === "idle" ? "0%" : "64%" }}
              transition={reduce ? { duration: 0 } : { duration: 1.8, ease: "easeInOut" }}
              className="h-full bg-accent/50"
            />
          </div>
          {(failed || done) && (
            <div className="mt-2">
              <div className="flex items-baseline justify-between text-[13px]">
                <span className="text-fog">↳ Fallback path</span>
                <span className="font-medium text-accent">{done ? "completed" : "engaged"}</span>
              </div>
              <div className="mt-1.5 h-2.5 w-full bg-ink" role="img" aria-label="Fallback execution progress">
                <motion.div
                  initial={false}
                  animate={{ width: failed || done ? "100%" : "0%" }}
                  transition={reduce ? { duration: 0 } : { duration: done ? 0.6 : 1.6, ease: "easeInOut" }}
                  className="h-full bg-accent"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {done && (
        <div className="mt-5 border border-line">
          <div aria-hidden="true" className="grid grid-cols-[1fr_1fr_1fr_1.4fr] gap-2 border-b border-line bg-ink px-4 py-2.5 text-[12px] uppercase tracking-[0.12em] text-muted">
            <span>Model</span>
            <span>Latency*</span>
            <span>Cache</span>
            <span>Outcome</span>
          </div>
          {RESULTS.map((r) => (
            <div key={r.model} className="grid grid-cols-[1fr_1fr_1fr_1.4fr] gap-2 border-b border-line px-4 py-2.5 text-[13px] last:border-b-0">
              <span className="font-medium text-fog">{r.model}</span>
              <span className="tabular-nums text-fog">{r.latency}</span>
              <span className="text-muted">{r.cache}</span>
              <span className="text-muted">{r.outcome}</span>
            </div>
          ))}
          <p className="bg-ink px-4 py-2.5 text-[12px] text-muted">*Relative, illustrative demo values.</p>
        </div>
      )}
    </DemoShell>
  );
}
