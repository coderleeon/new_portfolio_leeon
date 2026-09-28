import { TopologyHero } from "@/components/TopologyHero";
import { SystemMap } from "@/components/SystemMap";
import { ProjectSystem } from "@/components/ProjectSystem";
import { ExperienceTimeline } from "@/components/Experience";
import { ResearchArchive } from "@/components/ResearchArchive";
import { CapabilitySection } from "@/components/CapabilityMap";
import { About, Footer } from "@/components/About";
import { AmbientLayer } from "@/components/AmbientLayer";
import { SectionHeading } from "@/components/primitives";
import { projects } from "@/data/content";

export default function Home() {
  return (
    <>
      <AmbientLayer />
      <main id="main" className="relative z-10">
        <TopologyHero />
        <SystemMap />

        <section id="work" aria-label="Work" className="scroll-mt-24 border-b border-line bg-ink">
          <div className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">
            <SectionHeading
              kicker="Work"
              title="Systems, not screenshots."
              blurb="Four production-oriented builds from the resume. Each one runs — send a trace, run a benchmark, analyze an issue."
            />
            <div className="space-y-8 md:space-y-12">
              {projects.map((p) => (
                <ProjectSystem key={p.id} project={p} />
              ))}
            </div>
          </div>
        </section>

        <section id="research" aria-label="Research" className="scroll-mt-24 border-b border-line bg-ink">
          <div className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">
            <SectionHeading
              kicker="Research"
              title="Accepted, not aspirational."
              blurb="Three peer-accepted papers. Only what the record states — expand a row for the citation."
            />
            <ResearchArchive />
          </div>
        </section>

        <section id="experience" aria-label="Experience" className="scroll-mt-24 border-b border-line bg-ink">
          <div className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">
            <SectionHeading
              kicker="Experience"
              title="Two roles, both hands-on."
              blurb="Internships where pipelines and models shipped — stated exactly as they happened."
            />
            <ExperienceTimeline />
          </div>
        </section>

        <section id="systems" aria-label="Capabilities" className="scroll-mt-24 border-b border-line bg-ink">
          <div className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">
            <SectionHeading
              kicker="Capabilities"
              title="A capability map, not a wall."
              blurb="Five categories from the resume. Select one to read its register — then select a technology to trace its connections."
            />
            <CapabilitySection />
          </div>
        </section>

        <section id="about" aria-label="About" className="scroll-mt-24 bg-ink">
          <div className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">
            <SectionHeading
              kicker="About"
              title="Concise, like a good log."
              blurb="Who this is, where the degrees are from, and how to reach him."
            />
            <About />
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
