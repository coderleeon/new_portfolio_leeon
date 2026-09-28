"use client";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { pipelineStages } from "@/data/content";

const DEST: Record<string, { href: string; name: string }> = {
  input: { href: "#work", name: "Work" },
  retrieval: { href: "#systems", name: "Capabilities" },
  reasoning: { href: "#work", name: "Work" },
  execution: { href: "#work", name: "Work" },
  observability: { href: "#work", name: "Work" },
};

const plain = (s: string) => s.charAt(0) + s.slice(1).toLowerCase();
const CX = (i: number) => 120 + i * 240;
const CY = 150;

/**
 * Interactive pipeline field. Five nodes drift slowly; nearby pointer
 * movement nudges them; hover or keyboard focus reveals each label;
 * activating a node travels to the matching site section.
 * Touch and reduced-motion users get static, always-labelled nodes.
 */
export function HeroField() {
  const reduce = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [labelsAlways, setLabelsAlways] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: none)");
    setLabelsAlways(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setLabelsAlways(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (reduce) return;
    const svg = svgRef.current;
    const wrap = wrapRef.current;
    if (!svg || !wrap) return;
    const nodes = Array.from(svg.querySelectorAll<SVGGElement>("[data-hnode]"));
    const edges = Array.from(svg.querySelectorAll<SVGLineElement>("[data-hedge]"));
    const mouse = { x: -9999, y: -9999 };
    let visible = true;
    let raf = 0;
    let last = 0;

    const toLocal = (clientX: number, clientY: number) => {
      const r = svg.getBoundingClientRect();
      return {
        x: ((clientX - r.left) / r.width) * 1200,
        y: ((clientY - r.top) / r.height) * 300,
      };
    };
    const onMove = (e: PointerEvent) => {
      const p = toLocal(e.clientX, e.clientY);
      mouse.x = p.x;
      mouse.y = p.y;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    const tick = (t: number) => {
      if (!visible) {
        raf = 0;
        return;
      }
      raf = requestAnimationFrame(tick);
      if (t - last < 50) return;
      last = t;
      const px: number[] = [];
      const py: number[] = [];
      nodes.forEach((g, i) => {
        const bx = CX(i);
        let x = bx + Math.sin(t * 0.00045 + i * 1.7) * 12;
        let y = CY + Math.cos(t * 0.00038 + i * 1.1) * 10;
        const dx = x - mouse.x;
        const dy = y - mouse.y;
        const d = Math.hypot(dx, dy);
        if (d < 150 && d > 1) {
          const f = (1 - d / 150) * 16;
          x += (dx / d) * f;
          y += (dy / d) * f;
        }
        px.push(x);
        py.push(y);
        g.setAttribute("transform", `translate(${x.toFixed(1)} ${y.toFixed(1)})`);
      });
      edges.forEach((l, k) => {
        l.setAttribute("x1", String(px[k]!.toFixed(1)));
        l.setAttribute("y1", String(py[k]!.toFixed(1)));
        l.setAttribute("x2", String(px[k + 1]!.toFixed(1)));
        l.setAttribute("y2", String(py[k + 1]!.toFixed(1)));
      });
    };

    wrap.addEventListener("pointermove", onMove, { passive: true });
    wrap.addEventListener("pointerleave", onLeave);
    const io = new IntersectionObserver(
      (entries) => {
        const v = entries[0]?.isIntersecting ?? true;
        if (v && !visible) {
          visible = true;
          last = performance.now();
          raf = requestAnimationFrame(tick);
        } else {
          visible = v;
        }
      },
      { threshold: 0 }
    );
    io.observe(wrap);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      wrap.removeEventListener("pointermove", onMove);
      wrap.removeEventListener("pointerleave", onLeave);
    };
  }, [reduce]);

  const showLabels = reduce || labelsAlways;

  return (
    <div ref={wrapRef} className="relative">
      <svg
        ref={svgRef}
        viewBox="0 0 1200 300"
        preserveAspectRatio="xMidYMid meet"
        className="mt-4 h-auto w-full"
        role="group"
        aria-label="Interactive pipeline: input, retrieval, reasoning, execution, observability. Activate a node to visit its section."
      >
        <line x1="40" y1={CY} x2="1160" y2={CY} stroke="#E7DECA" strokeWidth="1" />
        {[0, 1, 2, 3].map((k) => (
          <line
            key={k}
            data-hedge=""
            x1={CX(k)}
            y1={CY}
            x2={CX(k + 1)}
            y2={CY}
            stroke="#2B44E4"
            strokeOpacity="0.55"
            strokeWidth="1.25"
            className="flow"
          />
        ))}
        <path
          d="M 1050 178 C 760 236, 440 236, 150 178"
          fill="none"
          stroke="#DCD3BE"
          strokeWidth="1"
          className="flow-slow"
        />
        {pipelineStages.map((s, i) => {
          const dest = DEST[s.id] ?? { href: "#work", name: "Work" };
          return (
            <g key={s.id} data-hnode="" transform={`translate(${CX(i)} ${CY})`}>
              <a
                href={dest.href}
                data-cursor="Explore"
                aria-label={`${plain(s.label)} — go to ${dest.name} section`}
                className="group rounded-sm"
              >
                <circle r="30" fill="transparent" />
                <circle
                  r="9"
                  fill="#FFFFFF"
                  stroke="#C4B697"
                  strokeWidth="1"
                  className="transition-colors group-hover:stroke-accent group-focus-visible:stroke-accent"
                />
                <circle r="3" fill="#2B44E4" />
                <g
                  className={
                    showLabels
                      ? undefined
                      : "opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
                  }
                >
                  <rect x="-85" y="-78" width="170" height="48" fill="#FFFFFF" stroke="#E3DAC7" />
                  <rect x="-85" y="-78" width="3" height="48" fill="#2B44E4" />
                  <text
                    x="4"
                    y="-52"
                    textAnchor="middle"
                    fill="#1D1A14"
                    fontSize="12.5"
                    fontFamily="Inter, system-ui, sans-serif"
                    letterSpacing="2"
                  >
                    {s.label}
                  </text>
                  <text
                    x="4"
                    y="-37"
                    textAnchor="middle"
                    fill="#2B44E4"
                    fontSize="10"
                    fontFamily="Inter, system-ui, sans-serif"
                    letterSpacing="1"
                  >
                    SEE: {dest.name.toUpperCase()}
                  </text>
                </g>
              </a>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
