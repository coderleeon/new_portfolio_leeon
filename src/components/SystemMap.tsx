"use client";
import { navNodes } from "@/data/content";
import { Reveal } from "./primitives";

const plain = (s: string) => s.charAt(0) + s.slice(1).toLowerCase();

/**
 * System map: hero topology resolves into the site's index.
 * Same stroke language, editorial dress — diagram panel on white,
 * station list in serif. SVG is aria-hidden; the list is the real nav.
 */
export function SystemMap() {
  const spokes = [
    { x: 190, y: 130 },
    { x: 610, y: 130 },
    { x: 810, y: 260 },
    { x: 610, y: 390 },
    { x: 190, y: 390 },
  ];
  return (
    <section id="map" aria-label="System map" className="border-b border-line bg-ink">
      <div className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">
        <Reveal>
          <p className="text-[13px] font-medium uppercase tracking-[0.18em] text-muted">
            Index
          </p>
          <h2 className="mt-3 max-w-2xl font-serif text-3xl leading-tight tracking-tight text-fog md:text-5xl">
            One environment, <em>five stations.</em>
          </h2>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted">
            The pipeline above resolves into this map. Every station is wired to
            the same core — choose one to travel to that part of the site.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-px border border-line bg-line lg:grid-cols-2">
          {/* diagram */}
          <div className="relative bg-paper p-4 md:p-6" aria-hidden="true">
            <svg viewBox="0 0 1000 520" className="h-auto w-full">
              {spokes.map((p, i) => (
                <line key={i} x1="500" y1="260" x2={p.x} y2={p.y} stroke="#D8CEB4" strokeWidth="1.25" className="flow-slow" />
              ))}
              <rect x="410" y="210" width="180" height="100" fill="#FFFFFF" stroke="#2B44E4" strokeWidth="1.5" />
              <text x="500" y="255" textAnchor="middle" fill="#1D1A14" fontSize="24" fontFamily="Newsreader, Georgia, serif" fontStyle="italic">Leeon John</text>
              <text x="500" y="282" textAnchor="middle" fill="#6E6659" fontSize="10" fontFamily="Inter, system-ui, sans-serif" letterSpacing="3">AI ENGINEER</text>
              {navNodes.map((n, i) => (
                <g key={n.id}>
                  <rect x={spokes[i].x - 95} y={spokes[i].y - 38} width="190" height="76" fill="#FFFFFF" stroke="#D8CEB4" />
                  <text x={spokes[i].x} y={spokes[i].y - 2} textAnchor="middle" fill="#1D1A14" fontSize="12" fontFamily="Inter, system-ui, sans-serif" letterSpacing="2.5">{n.label}</text>
                  <text x={spokes[i].x} y={spokes[i].y + 20} textAnchor="middle" fill="#A79B82" fontSize="10" fontFamily="Inter, system-ui, sans-serif" letterSpacing="1">{n.desc}</text>
                </g>
              ))}
            </svg>
          </div>
          {/* real navigation */}
          <nav aria-label="System stations" className="bg-ink">
            <ol className="divide-y divide-line">
              {navNodes.map((n) => (
                <li key={n.id}>
                  <a
                    href={n.href}
                    className="group flex items-center justify-between px-6 py-5 transition-colors hover:bg-paper focus-visible:bg-paper md:px-8"
                  >
                    <span>
                      <span className="block font-serif text-[22px] tracking-tight text-fog group-hover:text-accent">
                        {plain(n.label)}
                      </span>
                      <span className="mt-0.5 block text-[13px] text-muted">{n.desc}</span>
                    </span>
                    <span aria-hidden="true" className="font-serif text-xl text-accent opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                      →
                    </span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </div>
    </section>
  );
}
