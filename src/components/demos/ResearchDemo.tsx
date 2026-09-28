"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import type { Project } from "@/data/content";
import { demoStrings } from "@/data/content";
import { useSimulation } from "@/hooks/useSimulation";
import { DemoShell } from "./DemoShell";

const MONO = "'JetBrains Mono', 'IBM Plex Mono', monospace";
const BG = "#FFFFFF";
const STROKE = "#D9CFB6";
const TEXT = "#1D1A14";
const SUB = "#6E6659";
const FAINT = "#A79B82";
const ACCENT = "#2B44E4";
const WASH = "#E6EBFF";

const STEP_STAGE = ["question", "plan", "discover", "pdf", "retrieve", "cite"] as const;
const PAPERS = ["A", "B", "C"];
const LOG = [
  "Research question received.",
  "Planner agent scopes the question.",
  "Three candidate papers discovered.",
  "PDFs parsed into structured evidence.",
  "Semantic retrieval grounds the claims.",
  "Citation-aware report generated.",
];

function StageNode({
  x, y, w, label, sub, on, dim,
}: {
  x: number; y: number; w: number; label: string; sub: string; on: boolean; dim: boolean;
}) {
  return (
    <g opacity={dim && !on ? 0.35 : 1}>
      <rect x={x} y={y} width={w} height={56} fill={on ? WASH : BG} stroke={on ? ACCENT : STROKE} strokeWidth={on ? 1.75 : 1} />
      <text x={x + w / 2} y={y + 25} textAnchor="middle" fill={on ? ACCENT : TEXT} fontSize="11" fontFamily={MONO} letterSpacing="1">
        {label}
      </text>
      <text x={x + w / 2} y={y + 42} textAnchor="middle" fill={SUB} fontSize="9" fontFamily={MONO}>
        {sub}
      </text>
    </g>
  );
}

/**
 * ResearchPilot as a branching research graph. Running the demo walks a
 * predefined example question through planning, discovery of three
 * candidate papers, PDF analysis, retrieval, and a cited report.
 * Frontend simulation only — no model calls.
 */
export function ResearchDemo({ project }: { project: Project }) {
  const { phase, activeStep, run, reset } = useSimulation(STEP_STAGE.length, 950);
  const [inspected, setInspected] = useState<string | null>(null);
  const started = phase !== "idle";
  const step = started ? activeStep : -1;
  const dim = started;
  const on = (s: number) => started && step >= s;

  const start = () => {
    setInspected(null);
    run();
  };
  const clear = () => {
    setInspected(null);
    reset();
  };

  const inspectedDetail = inspected?.startsWith("paper")
    ? `Candidate paper ${inspected.slice(-1)} — discovered illustration, parsed at the analysis stage.`
    : project.stages.find((s) => s.id === inspected)?.detail;
  const currentDetail =
    inspectedDetail ??
    (step < 0
      ? "Run the system to walk an example question through the graph."
      : step === 0
        ? demoStrings.researchQuestion
        : project.stages.find((s) => s.id === STEP_STAGE[step])?.detail ?? "");
  const currentTitle =
    inspected?.startsWith("paper")
      ? `Paper ${inspected.slice(-1)}`
      : inspected
        ? (project.stages.find((s) => s.id === inspected)?.label ?? "")
        : step < 0
          ? "Idle — the graph at rest"
          : step === 0
            ? "Research question"
            : (project.stages.find((s) => s.id === STEP_STAGE[step])?.label ?? "");

  const log = started ? LOG.slice(0, step + 1) : [];

  return (
    <DemoShell
      runLabel="Run research"
      cursorLabel="Run"
      onRun={start}
      onReset={clear}
      phase={phase}
      log={log}
      logLabel="Research log"
    >
      <p className="mb-4 border-l-2 border-accent pl-4 font-serif text-[17px] italic leading-relaxed text-fog">
        {demoStrings.researchQuestion}
      </p>
      <svg viewBox="0 0 720 330" className="h-auto w-full" role="img" aria-label="Branching research graph demonstration">
        <path d="M180 52 H240" stroke={on(1) ? ACCENT : "#C4B697"} strokeWidth="1.25" className="flow" />
        {[
          "M320 80 C320 120, 110 120, 110 130",
          "M400 80 C400 120, 360 120, 360 130",
          "M480 80 C480 120, 610 120, 610 130",
        ].map((d, i) => (
          <path key={i} d={d} fill="none" stroke={on(2) ? ACCENT : "#C4B697"} strokeWidth="1.25" className="flow" />
        ))}
        <path d="M110 186 C110 220, 220 220, 260 240" fill="none" stroke={on(4) ? ACCENT : "#C4B697"} strokeWidth="1.25" className="flow" />
        <path d="M360 186 V240" stroke={on(4) ? ACCENT : "#C4B697"} strokeWidth="1.25" className="flow" />
        <path d="M610 186 C610 220, 500 220, 450 240" fill="none" stroke={on(4) ? ACCENT : "#C4B697"} strokeWidth="1.25" className="flow" />
        <path d="M450 268 H500" stroke={on(5) ? ACCENT : "#C4B697"} strokeWidth="1.25" className="flow" />

        <StageNode x={20} y={24} w={160} label="QUESTION" sub="example" on={on(0)} dim={dim} />
        <StageNode x={240} y={24} w={160} label="PLAN" sub="planner agent" on={on(1)} dim={dim} />
        {PAPERS.map((p, i) => {
          const x = 20 + i * 250;
          const visible = on(2);
          const parsed = on(3);
          return (
            <motion.g
              key={p}
              initial={false}
              animate={{ opacity: visible ? 1 : 0.25 }}
              transition={{ duration: 0.4, delay: visible ? i * 0.15 : 0 }}
            >
              <g
                role="button"
                tabIndex={visible ? 0 : -1}
                aria-label={`Inspect candidate paper ${p}`}
                data-cursor="Inspect"
                onClick={() => visible && setInspected(`paper${p}`)}
                onKeyDown={(e) => {
                  if (visible && (e.key === "Enter" || e.key === " ")) {
                    e.preventDefault();
                    setInspected(`paper${p}`);
                  }
                }}
                className="cursor-pointer rounded-sm"
              >
                <rect
                  x={x}
                  y={130}
                  width={180}
                  height={56}
                  fill={inspected === `paper${p}` ? WASH : BG}
                  stroke={inspected === `paper${p}` ? ACCENT : STROKE}
                  strokeWidth={inspected === `paper${p}` ? 1.75 : 1}
                />
                <text x={x + 90} y={155} textAnchor="middle" fill={TEXT} fontSize="11" fontFamily={MONO} letterSpacing="1">
                  PAPER {p}
                </text>
                <text x={x + 90} y={172} textAnchor="middle" fill={parsed ? ACCENT : FAINT} fontSize="9" fontFamily={MONO}>
                  {parsed ? "✓ PARSED" : "CANDIDATE"}
                </text>
              </g>
            </motion.g>
          );
        })}
        <StageNode x={170} y={240} w={180} label="RETRIEVE" sub="ChromaDB" on={on(4)} dim={dim} />
        <StageNode x={500} y={240} w={200} label="CITE + REPORT" sub="with citations" on={on(5)} dim={dim} />
      </svg>
      <div aria-live="polite" className="mt-4 border border-line bg-ink p-4">
        <p className="text-[12px] font-medium uppercase tracking-[0.14em] text-accent">{currentTitle}</p>
        <p className="mt-1.5 text-[14px] leading-relaxed text-fog">{currentDetail}</p>
      </div>
    </DemoShell>
  );
}
