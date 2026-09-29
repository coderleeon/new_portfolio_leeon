"use client";
import type { Project } from "@/data/content";
import { useSimulation } from "@/hooks/useSimulation";
import { DemoShell } from "./DemoShell";
import { OccurDiagram } from "../project-diagrams";

const STEPS = ["collect", "normalize", "dedup", "store", "match", "export"] as const;
const LOG = [
  "Public ATS sources polled for new postings.",
  "Postings normalized into one job model.",
  "Duplicates collapsed by deterministic keys.",
  "Jobs persisted to the local SQLite store.",
  "Rule-based scoring ranks jobs 0–100.",
  "Relevant jobs exported to Excel workbooks.",
];

/**
 * Occur as a living job pipeline. "Run pipeline" walks one collection
 * cycle from source adapters through normalization, deduplication,
 * SQLite storage, rule-based matching, and Excel export.
 * Frontend simulation only.
 */
export function OccurDemo({ project }: { project: Project }) {
  const { phase, activeStep, run, reset } = useSimulation(STEPS.length, 900);
  const started = phase !== "idle";
  const step = started ? STEPS[Math.max(0, activeStep)]! : null;
  const stageDetail = project.stages.find((s) => s.id === step)?.detail;
  const log = started ? LOG.slice(0, Math.max(0, activeStep) + 1) : [];

  return (
    <DemoShell
      runLabel="Run pipeline"
      cursorLabel="Run"
      onRun={run}
      onReset={reset}
      phase={phase}
      log={log}
      logLabel="Pipeline log"
    >
      <OccurDiagram active={step ?? ""} />

      <div aria-live="polite" className="mt-4 border border-line bg-ink p-4">
        <p className="text-[12px] font-medium uppercase tracking-[0.14em] text-accent">
          {started
            ? (project.stages.find((s) => s.id === step)?.label ?? "")
            : "Idle — the pipeline at rest"}
        </p>
        <p className="mt-1.5 text-[14px] leading-relaxed text-fog">
          {started
            ? (stageDetail ?? "")
            : "Run the pipeline to watch one collection cycle move through the system."}
        </p>
      </div>
    </DemoShell>
  );
}
