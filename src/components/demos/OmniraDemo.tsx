"use client";
import { motion } from "framer-motion";
import type { Project } from "@/data/content";
import { useSimulation } from "@/hooks/useSimulation";
import { DemoShell } from "./DemoShell";
import { OmniraDiagram } from "../project-diagrams";

const STEPS = ["trace", "ingest", "isolate", "query", "filter", "observe"] as const;
const LABELS: Record<string, string> = {
  trace: "Trace",
  ingest: "Trace ingestion",
  isolate: "Project isolation",
  query: "Querying",
  filter: "Filtering + Search",
  observe: "Observation",
};
/* Waypoints in the diagram's 720×340 coordinate space. */
const PATH: [number, number][] = [
  [28, 166],
  [95, 166],
  [360, 165],
  [610, 226],
  [610, 86],
  [610, 296],
];
const LOG = [
  "Trace received at the authenticated ingest endpoint.",
  "Trace ingested through the validated write path.",
  "Trace stored under project-level isolation.",
  "Trace queried through repository abstractions.",
  "Advanced filtering and search narrow the result.",
  "Observation recorded — the trace becomes the record.",
];

/**
 * Omnira as a living trace flow. "Send trace" releases one packet that
 * travels ingest → isolation → query → filter/search → observation,
 * activating each stage. Reuses the static schematic as its base layer.
 */
export function OmniraDemo({ project }: { project: Project }) {
  const { phase, activeStep, run, reset } = useSimulation(STEPS.length, 900);
  const started = phase !== "idle";
  const step = started ? STEPS[Math.max(0, activeStep)]! : null;
  const diagramActive = step && step !== "trace" ? step : "";
  const detail =
    step === "trace"
      ? "A signed trace packet enters the pipeline."
      : project.stages.find((s) => s.id === step)?.detail ?? "";
  const log = started ? LOG.slice(0, Math.max(0, activeStep) + 1) : [];
  const [px, py] = started ? PATH[Math.max(0, activeStep)]! : PATH[0]!;

  return (
    <DemoShell
      runLabel="Send trace"
      cursorLabel="Trace"
      onRun={run}
      onReset={reset}
      phase={phase}
      log={log}
      logLabel="Trace log"
    >
      <div className="relative">
        <OmniraDiagram active={diagramActive} />
        {started && (
          <svg
            viewBox="0 0 720 340"
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 h-full w-full"
          >
            <polyline
              points={PATH.map((p) => p.join(",")).join(" ")}
              fill="none"
              stroke="#2B44E4"
              strokeOpacity="0.45"
              strokeWidth="1.5"
              strokeDasharray="5 9"
              className="flow"
            />
            <motion.circle
              r="6"
              fill="#2B44E4"
              stroke="#FFFFFF"
              strokeWidth="2"
              initial={false}
              animate={{ cx: px, cy: py }}
              transition={{ duration: 0.75, ease: "easeInOut" }}
            />
          </svg>
        )}
      </div>
      <div aria-live="polite" className="mt-4 border border-line bg-ink p-4">
        <p className="text-[12px] font-medium uppercase tracking-[0.14em] text-accent">
          {started ? LABELS[step!] : "Idle — the pipeline at rest"}
        </p>
        <p className="mt-1.5 text-[14px] leading-relaxed text-fog">
          {started ? detail : "Send a trace to watch it move through the system."}
        </p>
      </div>
    </DemoShell>
  );
}
