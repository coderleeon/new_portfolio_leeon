"use client";
import type { Project } from "@/data/content";
import { demoStrings } from "@/data/content";
import { useSimulation } from "@/hooks/useSimulation";
import { DemoShell } from "./DemoShell";
import { OpenSourceDiagram } from "../project-diagrams";

const STEPS = ["issue", "repo", "search", "plan", "test", "pr"] as const;
const LOG = [
  "Example issue received.",
  "Repository ingested as the working corpus.",
  "Semantic code search locates the relevant code.",
  "Issue-specific contribution plan drafted.",
  "Regression tests generated for the change.",
  "Pull-request draft prepared through GitHub APIs.",
];
const EXTRA = [
  "3 relevant files located.",
  "Scope, approach, and affected areas outlined.",
  "Tests cover the new behavior.",
  "Draft opened with plan and tests attached.",
];

/**
 * OpenSourcePilot as a repository-intelligence flow. Analyzing a predefined
 * example issue walks the corpus from index to search to plan, tests, and
 * a pull-request draft. Frontend simulation only.
 */
export function IssueDemo({ project }: { project: Project }) {
  const { phase, activeStep, run, reset } = useSimulation(STEPS.length, 950);
  const started = phase !== "idle";
  const step = started ? STEPS[Math.max(0, activeStep)]! : null;
  const diagramActive = step && step !== "issue" ? step : "";
  const stageDetail = project.stages.find((s) => s.id === step)?.detail;
  const log = started ? LOG.slice(0, Math.max(0, activeStep) + 1) : [];
  const artifact = started && activeStep >= 2 ? EXTRA[Math.min(activeStep - 2, 3)] : null;

  return (
    <DemoShell
      runLabel="Analyze issue"
      cursorLabel="Inspect"
      onRun={run}
      onReset={reset}
      phase={phase}
      log={log}
      logLabel="Analysis log"
    >
      <div className="mb-4 border border-line bg-ink p-4">
        <p className="text-[12px] font-medium uppercase tracking-[0.14em] text-muted">
          {demoStrings.issueExample.title}
        </p>
        <p className="mt-1.5 font-serif text-[18px] italic leading-snug text-fog">
          “{demoStrings.issueExample.body}”
        </p>
      </div>

      <OpenSourceDiagram active={diagramActive} />

      <div aria-live="polite" className="mt-4 border border-line bg-ink p-4">
        <p className="text-[12px] font-medium uppercase tracking-[0.14em] text-accent">
          {started
            ? step === "issue"
              ? "Issue triage"
              : (project.stages.find((s) => s.id === step)?.label ?? "")
            : "Idle — the assistant at rest"}
        </p>
        <p className="mt-1.5 text-[14px] leading-relaxed text-fog">
          {started
            ? step === "issue"
              ? "The issue is parsed into scope, symptoms, and affected areas."
              : (stageDetail ?? "")
            : "Analyze the example issue to watch the system reason over the repository."}
        </p>
        {artifact && (
          <p className="mt-2 border-t border-line pt-2 text-[13px] text-muted">{artifact}</p>
        )}
      </div>
    </DemoShell>
  );
}
