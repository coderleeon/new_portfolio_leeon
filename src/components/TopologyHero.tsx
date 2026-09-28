"use client";
import { motion, useReducedMotion } from "framer-motion";
import { profile, pipelineStages } from "@/data/content";
import { HeroField } from "./HeroField";

const plain = (s: string) => s.charAt(0) + s.slice(1).toLowerCase();

/**
 * Hero: typography leads, topology follows.
 * The pipeline lives in a quiet band *below* the headline —
 * an interactive field of drifting nodes, never behind the type.
 * The field is also a real ordered list below it.
 */
export function TopologyHero() {
  const reduce = useReducedMotion();

  return (
    <section
      id="top"
      aria-label="Introduction"
      className="border-b border-line pb-14 pt-32 md:pb-20 md:pt-44"
    >
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <motion.p
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-[13px] font-medium uppercase tracking-[0.22em] text-accent"
        >
          AI Engineer
        </motion.p>
        <motion.h1
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="mt-5 font-serif text-[15vw] leading-[0.95] tracking-tight text-fog sm:text-7xl md:text-8xl"
        >
          Leeon John
        </motion.h1>
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.12 }}
          className="mt-8 max-w-3xl font-serif text-2xl leading-snug text-fog md:text-[34px] md:leading-[1.28]"
        >
          Building intelligent systems
          <br />
          <em>that actually work.</em>
        </motion.p>

        <motion.p
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.22 }}
          className="mt-8 max-w-2xl text-[16px] leading-relaxed text-muted"
        >
          {profile.summary}
        </motion.p>

        <motion.div
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-3 text-[15px]"
        >
          <a
            href="#work"
            className="font-medium text-accent underline decoration-accent/40 underline-offset-[6px] transition-colors hover:decoration-accent"
          >
            Enter the system ↓
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="text-muted underline decoration-line underline-offset-[6px] transition-colors hover:text-fog"
          >
            GitHub ↗
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            className="text-muted underline decoration-line underline-offset-[6px] transition-colors hover:text-fog"
          >
            LinkedIn ↗
          </a>
        </motion.div>
      </div>

      {/* topology band — quiet, subordinate to the type above */}
      <div className="mx-auto mt-16 max-w-6xl px-5 md:mt-24 md:px-8">
        <div className="border-t border-line pt-6">
          <div className="flex items-baseline justify-between">
            <p className="text-[13px] uppercase tracking-[0.18em] text-muted">
              How the work flows
            </p>
            <p className="hidden text-[13px] text-muted sm:block">
              Hover a node · activate to travel
            </p>
          </div>

          <HeroField />

          <div>
            {/* pipeline as real content */}
            <ol
              className="grid grid-cols-2 gap-x-6 border-t border-line sm:grid-cols-5"
              aria-label="System pipeline"
            >
              {pipelineStages.map((s, i) => (
                <li key={s.id} className="py-4">
                  <span className="block text-[12px] tabular-nums text-accent">
                    0{i + 1}
                  </span>
                  <span className="mt-1 block text-sm text-fog">{plain(s.label)}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
