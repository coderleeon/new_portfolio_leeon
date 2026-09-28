"use client";
import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

interface Seed {
  x: number;
  y: number;
  r: number;
  ph: number;
  sp: number;
  ax: number;
  ay: number;
  accent: boolean;
}

/* Eleven quiet nodes, seeded so the field is identical on every load. */
const SEEDS: Seed[] = [
  { x: 0.06, y: 0.14, r: 4, ph: 0.0, sp: 0.00042, ax: 14, ay: 10, accent: false },
  { x: 0.2, y: 0.32, r: 3, ph: 1.4, sp: 0.00035, ax: 18, ay: 12, accent: true },
  { x: 0.36, y: 0.12, r: 3, ph: 2.6, sp: 0.0005, ax: 10, ay: 14, accent: false },
  { x: 0.55, y: 0.26, r: 4, ph: 0.8, sp: 0.00038, ax: 16, ay: 10, accent: false },
  { x: 0.72, y: 0.1, r: 3, ph: 3.4, sp: 0.00046, ax: 12, ay: 12, accent: false },
  { x: 0.88, y: 0.3, r: 4, ph: 2.0, sp: 0.0004, ax: 14, ay: 16, accent: true },
  { x: 0.12, y: 0.62, r: 3, ph: 4.1, sp: 0.00044, ax: 16, ay: 10, accent: false },
  { x: 0.42, y: 0.58, r: 3, ph: 1.1, sp: 0.00036, ax: 12, ay: 14, accent: false },
  { x: 0.64, y: 0.7, r: 4, ph: 2.9, sp: 0.00048, ax: 14, ay: 10, accent: false },
  { x: 0.82, y: 0.58, r: 3, ph: 0.5, sp: 0.0004, ax: 18, ay: 12, accent: false },
  { x: 0.94, y: 0.82, r: 3, ph: 3.8, sp: 0.00034, ax: 12, ay: 12, accent: false },
];

const PAIRS: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 5],
  [1, 6], [2, 7], [3, 8], [4, 9], [6, 7],
  [7, 8], [8, 9], [9, 10], [0, 6],
];

/**
 * Ambient living-system layer. Fixed behind content (content paints above
 * via its own stacking), visible wherever sections are transparent —
 * the hero and footer whitespace. Slow sine drift + gentle pointer
 * influence; fades as the hero scrolls away. Never interactive.
 */
export function SystemField() {
  const reduce = useReducedMotion();
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const nodeEls = Array.from(svg.querySelectorAll<SVGGElement>("[data-node]"));
    const edgeEls = Array.from(svg.querySelectorAll<SVGLineElement>("[data-edge]"));
    let w = window.innerWidth;
    let h = window.innerHeight;
    const mouse = { x: w / 2, y: h / 2 };
    let heroVisible = true;
    let opacity = 0.9;
    let raf = 0;
    let last = 0;

    const layout = (t: number) => {
      const px: number[] = new Array(nodeEls.length);
      const py: number[] = new Array(nodeEls.length);
      nodeEls.forEach((g, i) => {
        const s = SEEDS[i];
        let x = s.x * w + Math.sin(t * s.sp + s.ph) * s.ax;
        let y = s.y * h + Math.cos(t * s.sp * 0.9 + s.ph) * s.ay;
        const dx = x - mouse.x;
        const dy = y - mouse.y;
        const d = Math.hypot(dx, dy);
        if (d < 180 && d > 1) {
          const f = (1 - d / 180) * 24;
          x += (dx / d) * f;
          y += (dy / d) * f;
        }
        px[i] = x;
        py[i] = y;
        g.setAttribute("transform", `translate(${x.toFixed(1)} ${y.toFixed(1)})`);
      });
      edgeEls.forEach((l, k) => {
        const pair = PAIRS[k];
        if (!pair) return;
        const [a, b] = pair;
        l.setAttribute("x1", String(px[a].toFixed(1)));
        l.setAttribute("y1", String(py[a].toFixed(1)));
        l.setAttribute("x2", String(px[b].toFixed(1)));
        l.setAttribute("y2", String(py[b].toFixed(1)));
        const d = Math.hypot(px[a] - px[b], py[a] - py[b]);
        l.style.opacity = d < 240 ? (0.85 - d / 300).toFixed(2) : "0";
      });
    };

    if (reduce) {
      layout(1200);
      svg.style.opacity = "0.7";
      return;
    }

    const onResize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
    };
    const onMouse = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const hero = document.getElementById("top");
    const obs = hero
      ? new IntersectionObserver(
          (entries) => {
            heroVisible = entries[0]?.isIntersecting ?? true;
          },
          { threshold: 0 }
        )
      : null;
    if (hero && obs) obs.observe(hero);

    const tick = (t: number) => {
      raf = requestAnimationFrame(tick);
      if (t - last < 50) return;
      last = t;
      const target = heroVisible ? 0.9 : 0.12;
      opacity += (target - opacity) * 0.06;
      svg.style.opacity = opacity.toFixed(3);
      layout(t);
    };
    const onVis = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
        raf = 0;
      } else if (!raf) {
        last = performance.now();
        raf = requestAnimationFrame(tick);
      }
    };

    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMouse, { passive: true });
    document.addEventListener("visibilitychange", onVis);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouse);
      document.removeEventListener("visibilitychange", onVis);
      obs?.disconnect();
    };
  }, [reduce]);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0">
      <svg ref={svgRef} className="h-full w-full" focusable="false">
        {PAIRS.map(([a, b], i) => (
          <line
            key={i}
            data-edge=""
            x1={SEEDS[a]!.x * 1440}
            y1={SEEDS[a]!.y * 900}
            x2={SEEDS[b]!.x * 1440}
            y2={SEEDS[b]!.y * 900}
            stroke="#D8CEB4"
            strokeWidth="1"
          />
        ))}
        {SEEDS.map((s, i) => (
          <g key={i} data-node="" transform={`translate(${s.x * 1440} ${s.y * 900})`}>
            <circle
              r={s.r + 3}
              fill="none"
              stroke={s.accent ? "#2B44E4" : "#D8CEB4"}
              strokeOpacity={s.accent ? 0.5 : 0.8}
              strokeWidth="1"
            />
            <circle r={s.r} fill="#FFFFFF" stroke={s.accent ? "#2B44E4" : "#C4B697"} strokeWidth="1" />
            {s.accent && <circle r={1.6} fill="#2B44E4" />}
          </g>
        ))}
      </svg>
    </div>
  );
}
