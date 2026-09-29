"use client";
import dynamic from "next/dynamic";
import type { ComponentType } from "react";
import type { Project } from "@/data/content";
import { Reveal } from "./primitives";

const OmniraDemo = dynamic(() => import("./demos/OmniraDemo").then((m) => m.OmniraDemo), {
  loading: () => <DemoLoading />,
});
const ResearchDemo = dynamic(() => import("./demos/ResearchDemo").then((m) => m.ResearchDemo), {
  loading: () => <DemoLoading />,
});
const BenchDemo = dynamic(() => import("./demos/BenchDemo").then((m) => m.BenchDemo), {
  loading: () => <DemoLoading />,
});
const IssueDemo = dynamic(() => import("./demos/IssueDemo").then((m) => m.IssueDemo), {
  loading: () => <DemoLoading />,
});
const OccurDemo = dynamic(() => import("./demos/OccurDemo").then((m) => m.OccurDemo), {
  loading: () => <DemoLoading />,
});

function DemoLoading() {
  return <p className="py-10 text-center text-sm text-muted">Loading interactive demonstration…</p>;
}

const demos: Record<Project["id"], ComponentType<any>> = {
  omnira: OmniraDemo,
  researchpilot: ResearchDemo,
  benchlytics: BenchDemo,
  opensourcepilot: IssueDemo,
  occur: OccurDemo,
};

/**
 * A project as an interactive technical system — not a card.
 * The dossier states the resume facts; the demonstration panel
 * lets the visitor run the system instead of reading about it.
 */
export function ProjectSystem({ project }: { project: Project }) {
  const Demo = demos[project.id];

  return (
    <Reveal>
      <article
        id={`project-${project.id}`}
        aria-labelledby={`${project.id}-title`}
        className="grid scroll-mt-28 gap-px border border-line bg-line md:grid-cols-[1fr_1.15fr]"
      >
        {/* left: dossier */}
        <div className="bg-ink p-6 md:p-9">
          <p className="text-[12px] uppercase tracking-[0.16em] text-muted">
            Project {project.index} — {project.architecture}
          </p>
          <h3 id={`${project.id}-title`} className="mt-3 font-serif text-3xl tracking-tight text-fog md:text-4xl">
            {project.name}
          </h3>
          <p className="mt-1.5 text-sm font-medium text-accent">
            {project.subtitle}
          </p>
          <ul className="mt-5 space-y-3 border-t border-line pt-5 text-[14px] leading-relaxed text-fog/80">
            {project.points.map((pt, i) => (
              <li key={i} className="flex gap-3">
                <span aria-hidden="true" className="text-muted">
                  —
                </span>
                <span>{pt}</span>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-[12px] leading-relaxed tracking-wide text-muted">
            <span className="font-medium text-fog">Stack · </span>
            {project.stack.join("  ·  ")}
          </p>
          {project.link && (
            <p className="mt-3 text-[12px] tracking-wide">
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className="text-fog underline decoration-line underline-offset-4 transition-colors hover:text-accent"
              >
                {project.linkLabel ?? "Repository"} ↗
              </a>
            </p>
          )}
        </div>

        {/* right: live demonstration */}
        <div className="flex flex-col bg-paper p-6 md:p-9">
          <div className="flex items-center justify-between">
            <p className="text-[12px] uppercase tracking-[0.16em] text-muted">Live system</p>
            <p className="text-[12px] uppercase tracking-[0.16em] text-muted">
              Fig. {project.index}
            </p>
          </div>
          <div className="pt-2">
            <Demo project={project} />
          </div>
        </div>
      </article>
    </Reveal>
  );
}
