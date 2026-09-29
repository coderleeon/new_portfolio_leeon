"use client";

/* Per-project schematics. Strictly resume capabilities only.
   `active` = selected stage id; highlighted in blue, rest quiet.
   Mono labels are preserved here — this is the system's own voice. */

const BG = "#FFFFFF";
const PANEL = "#F5F1E8";
const STROKE = "#D9CFB6";
const IDLE = "#C4B697";
const TEXT = "#1D1A14";
const SUB = "#6E6659";
const FAINT = "#A79B82";
const ACCENT = "#2B44E4";
const WASH = "#E6EBFF";
const MONO = "'JetBrains Mono', 'IBM Plex Mono', monospace";

function Node({
  x, y, w = 150, h = 52, label, sub, on, dim = false,
}: {
  x: number; y: number; w?: number; h?: number;
  label: string; sub?: string; on: boolean; dim?: boolean;
}) {
  return (
    <g opacity={dim && !on ? 0.35 : 1}>
      <rect
        x={x} y={y} width={w} height={h}
        fill={on ? WASH : BG}
        stroke={on ? ACCENT : STROKE}
        strokeWidth={on ? 1.75 : 1}
      />
      <text x={x + w / 2} y={y + h / 2 - (sub ? 1 : -4)} textAnchor="middle" fill={on ? ACCENT : TEXT} fontSize="11" fontFamily={MONO} letterSpacing="1.5">
        {label}
      </text>
      {sub && (
        <text x={x + w / 2} y={y + h / 2 + 15} textAnchor="middle" fill={SUB} fontSize="9" fontFamily={MONO}>
          {sub}
        </text>
      )}
    </g>
  );
}

function Edge({ d, on }: { d: string; on?: boolean }) {
  return <path d={d} fill="none" stroke={on ? ACCENT : IDLE} strokeWidth="1.25" className="flow" />;
}

export function OmniraDiagram({ active }: { active: string }) {
  const is = (id: string) => active === id;
  const anyDim = active !== "";
  return (
    <svg viewBox="0 0 720 340" className="h-auto w-full" role="img" aria-label="Omnira trace flow diagram">
      <Node x={20} y={140} label="INGEST" sub="auth traces" on={is("ingest")} dim={anyDim} />
      <Edge d="M170 166 H250" on={is("ingest")} />
      {/* isolated store: two compartments */}
      <g opacity={anyDim && !is("isolate") ? 0.35 : 1}>
        <rect x={250} y={90} width={220} height={150} fill={PANEL} stroke={is("isolate") ? ACCENT : STROKE} strokeWidth={is("isolate") ? 1.75 : 1} />
        <text x={360} y={112} textAnchor="middle" fill={SUB} fontSize="9" fontFamily={MONO} letterSpacing="2">ISOLATED STORE</text>
        <rect x={262} y={122} width={96} height={100} fill={BG} stroke={STROKE} />
        <text x={310} y={170} textAnchor="middle" fill={TEXT} fontSize="10" fontFamily={MONO}>PROJ-A</text>
        <rect x={362} y={122} width={96} height={100} fill={BG} stroke={STROKE} />
        <text x={410} y={170} textAnchor="middle" fill={TEXT} fontSize="10" fontFamily={MONO}>PROJ-B</text>
      </g>
      <Edge d="M470 166 H520" on={is("query")} />
      <Node x={520} y={60} w={180} label="FILTER + SEARCH" on={is("filter")} dim={anyDim} />
      <Node x={520} y={130} w={180} label="PAGINATION" sub="bounded reads" on={is("page")} dim={anyDim} />
      <Node x={520} y={200} w={180} label="QUERY" on={is("query")} dim={anyDim} />
      <Edge d="M610 112 V30 H660 V60" on={is("filter")} />
      <Node x={520} y={270} w={180} label="OBSERVE" sub="the record" on={is("observe")} dim={anyDim} />
      <Edge d="M610 252 V270" on={is("observe")} />
    </svg>
  );
}

export function ResearchDiagram({ active }: { active: string }) {
  const steps = [
    { id: "plan", label: "PLAN" },
    { id: "discover", label: "DISCOVER" },
    { id: "pdf", label: "PDF PARSE" },
    { id: "retrieve", label: "RETRIEVE" },
    { id: "cite", label: "CITE + REPORT" },
  ];
  return (
    <svg viewBox="0 0 720 220" className="h-auto w-full" role="img" aria-label="ResearchPilot agent workflow diagram">
      {steps.map((s, i) => {
        const x = 10 + i * 142;
        const on = active === s.id;
        return (
          <g key={s.id} opacity={active && !on ? 0.35 : 1}>
            <rect x={x} y={70} width={128} height={60} fill={on ? WASH : BG} stroke={on ? ACCENT : STROKE} strokeWidth={on ? 1.75 : 1} />
            <text x={x + 64} y={98} textAnchor="middle" fill={on ? ACCENT : TEXT} fontSize="10.5" fontFamily={MONO} letterSpacing="1">{s.label}</text>
            <text x={x + 64} y={116} textAnchor="middle" fill={FAINT} fontSize="9" fontFamily={MONO}>A.0{i + 1}</text>
            {i < steps.length - 1 && (
              <path d={`M${x + 128} 100 H${x + 142}`} stroke={active === steps[i + 1].id ? ACCENT : IDLE} strokeWidth="1.25" className="flow" />
            )}
          </g>
        );
      })}
      <text x={10} y={170} fill={FAINT} fontSize="9.5" fontFamily={MONO} letterSpacing="1.5">LANGGRAPH · MCP · CHROMADB · FASTAPI</text>
    </svg>
  );
}

export function BenchDiagram({ active }: { active: string }) {
  const is = (id: string) => active === id;
  const dim = active !== "";
  return (
    <svg viewBox="0 0 720 360" className="h-auto w-full" role="img" aria-label="BenchLytics evaluation pipeline diagram">
      <Node x={20} y={150} label="RUN QUEUE" sub="async" on={is("async")} dim={dim} />
      <Edge d="M170 176 H230" on={is("async")} />
      <g opacity={dim && !is("async") ? 0.35 : 1}>
        <rect x={230} y={100} width={160} height={150} fill={PANEL} stroke={STROKE} />
        <text x={310} y={122} textAnchor="middle" fill={SUB} fontSize="9" fontFamily={MONO} letterSpacing="2">DYNAMIC BATCH</text>
        {[0, 1, 2].map((r) => (
          <rect key={r} x={244} y={134 + r * 36} width={132} height={28} fill={BG} stroke={STROKE} />
        ))}
      </g>
      <Edge d="M390 176 H440" on={is("cache")} />
      <Node x={440} y={80} w={150} label="CACHE L1→Ln" sub="multi-tier" on={is("cache")} dim={dim} />
      <Node x={440} y={150} w={150} label="EVAL" sub="quality·lat·cost·fail" on={is("eval")} dim={dim} />
      <Node x={440} y={230} w={150} label="FALLBACK" on={is("fallback")} dim={dim} />
      <Edge d="M515 178 V150" on={is("eval")} />
      <Edge d="M515 208 V230" on={is("fallback")} />
      <Edge d="M590 176 H640 Q660 176 660 200 V300 H120 Q100 300 100 270 V230" on={is("fallback")} />
      <text x={100} y={320} fill={FAINT} fontSize="9.5" fontFamily={MONO} letterSpacing="1.5">FALLBACK RETURN PATH</text>
    </svg>
  );
}

export function OpenSourceDiagram({ active }: { active: string }) {
  const steps = [
    { id: "repo", label: "REPO IN" },
    { id: "search", label: "SEM. SEARCH" },
    { id: "plan", label: "PLAN" },
    { id: "test", label: "TESTS" },
    { id: "pr", label: "PR DRAFT" },
  ];
  return (
    <svg viewBox="0 0 720 250" className="h-auto w-full" role="img" aria-label="OpenSourcePilot contribution flow diagram">
      {steps.map((s, i) => {
        const x = 8 + i * 143;
        const on = active === s.id;
        return (
          <g key={s.id} opacity={active && !on ? 0.35 : 1}>
            {s.id === "search" && (
              <rect x={x - 6} y={52} width={140} height={110} fill="none" stroke={IDLE} strokeDasharray="4 5" />
            )}
            <rect x={x} y={80} width={130} height={58} fill={on ? WASH : BG} stroke={on ? ACCENT : STROKE} strokeWidth={on ? 1.75 : 1} />
            <text x={x + 65} y={108} textAnchor="middle" fill={on ? ACCENT : TEXT} fontSize="10.5" fontFamily={MONO} letterSpacing="1">{s.label}</text>
            <text x={x + 65} y={126} textAnchor="middle" fill={FAINT} fontSize="9" fontFamily={MONO}>P.0{i + 1}</text>
            {i < steps.length - 1 && (
              <path d={`M${x + 130} 109 H${x + 143}`} stroke={IDLE} strokeWidth="1.25" className="flow" />
            )}
          </g>
        );
      })}
      <text x={145} y={70} fill={FAINT} fontSize="9" fontFamily={MONO} letterSpacing="1.5">CHROMADB + TRANSFORMER EMBEDDINGS</text>
      <text x={440} y={180} fill={FAINT} fontSize="9" fontFamily={MONO} letterSpacing="1.5">OUT VIA GITHUB APIs</text>
    </svg>
  );
}

export function OccurDiagram({ active }: { active: string }) {
  const steps = [
    { id: "collect", label: "COLLECT" },
    { id: "normalize", label: "NORMALIZE" },
    { id: "dedup", label: "DEDUP" },
    { id: "store", label: "STORE" },
    { id: "match", label: "MATCH" },
    { id: "export", label: "EXPORT" },
  ];
  return (
    <svg viewBox="0 0 720 220" className="h-auto w-full" role="img" aria-label="Occur job pipeline diagram">
      {steps.map((s, i) => {
        const x = 8 + i * 119;
        const on = active === s.id;
        return (
          <g key={s.id} opacity={active && !on ? 0.35 : 1}>
            <rect x={x} y={70} width={106} height={60} fill={on ? WASH : BG} stroke={on ? ACCENT : STROKE} strokeWidth={on ? 1.75 : 1} />
            <text x={x + 53} y={98} textAnchor="middle" fill={on ? ACCENT : TEXT} fontSize="10" fontFamily={MONO} letterSpacing="1">{s.label}</text>
            <text x={x + 53} y={116} textAnchor="middle" fill={FAINT} fontSize="9" fontFamily={MONO}>J.0{i + 1}</text>
            {i < steps.length - 1 && (
              <path d={`M${x + 106} 100 H${x + 119}`} stroke={active === steps[i + 1].id ? ACCENT : IDLE} strokeWidth="1.25" className="flow" />
            )}
          </g>
        );
      })}
      <text x={10} y={170} fill={FAINT} fontSize="9.5" fontFamily={MONO} letterSpacing="1.5">PYTHON · SQLITE · EXCEL · TELEGRAM OPT-IN</text>
    </svg>
  );
}
