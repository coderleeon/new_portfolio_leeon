import { profile, education } from "@/data/content";
import { FadeReveal } from "./primitives";

export function About() {
  return (
    <div className="grid gap-px border border-line bg-line md:grid-cols-2">
      <FadeReveal className="bg-ink p-6 md:p-10">
        <p className="text-[13px] font-medium uppercase tracking-[0.18em] text-muted">
          About
        </p>
        <p className="mt-5 font-serif text-2xl leading-snug tracking-tight text-fog md:text-[28px]">
          AI Engineer building production-grade LLM and agentic systems — retrieval,
          evaluation, and observability included, not bolted on.
        </p>
        <div className="mt-8 space-y-2.5 border-t border-line pt-6 text-[14px]">
          <p>
            <a href={`mailto:${profile.email}`} className="text-fog underline decoration-line underline-offset-4 hover:text-accent">
              {profile.email}
            </a>
          </p>
          <p className="text-muted">{profile.phone}</p>
          <p>
            <a href={profile.github} target="_blank" rel="noreferrer" className="text-fog underline decoration-line underline-offset-4 hover:text-accent">
              {profile.githubLabel} ↗
            </a>
          </p>
          <p>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="text-fog underline decoration-line underline-offset-4 hover:text-accent">
              {profile.linkedinLabel} ↗
            </a>
          </p>
        </div>
      </FadeReveal>
      <FadeReveal delay={0.08} className="bg-paper p-6 md:p-10">
        <p className="text-[13px] font-medium uppercase tracking-[0.18em] text-muted">
          Education
        </p>
        <ol className="mt-5 space-y-6">
          {education.map((e) => (
            <li key={e.school} className="border-l-2 border-accent pl-5">
              <p className="text-[16px] font-medium text-fog">{e.school}</p>
              <p className="mt-1 text-[14px] text-muted">{e.degree}</p>
              <p className="mt-1 text-[12px] tracking-wide text-muted">{e.period}</p>
            </li>
          ))}
        </ol>
        <p className="mt-8 border-t border-line pt-6 text-[14px] leading-relaxed text-muted">
          Open to AI engineering roles where evaluation, retrieval quality, and
          observability are first-class requirements.
        </p>
      </FadeReveal>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-8 text-[13px] text-muted md:flex-row md:items-center md:justify-between md:px-8">
        <p>© 2026 Leeon John</p>
        <p>Set in Newsreader &amp; Inter</p>
      </div>
    </footer>
  );
}
