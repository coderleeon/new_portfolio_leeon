"use client";
import { useEffect, useState } from "react";
import { profile, navNodes } from "@/data/content";

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string>("top");
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [ids]);
  return active;
}

const plain = (s: string) => s.charAt(0) + s.slice(1).toLowerCase();

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const active = useActiveSection(["work", "research", "experience", "systems", "about"]);

  return (
    <div className="min-h-screen">
      <header className="fixed inset-x-0 top-0 z-40 border-b border-line bg-ink/90 backdrop-blur-sm">
        <nav
          aria-label="Primary"
          className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:px-8"
        >
          <a href="#top" className="font-serif text-[22px] tracking-tight text-fog">
            Leeon John
            <span className="sr-only"> — back to top</span>
          </a>
          <ul className="hidden items-center gap-7 md:flex">
            {navNodes.map((n) => (
              <li key={n.id}>
                <a
                  href={n.href}
                  aria-current={active === n.id ? "true" : undefined}
                  className={`text-sm transition-colors hover:text-accent ${
                    active === n.id ? "text-accent" : "text-muted"
                  }`}
                >
                  {plain(n.label)}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={`mailto:${profile.email}`}
            className="text-sm text-fog underline decoration-line underline-offset-[5px] transition-colors hover:text-accent hover:decoration-accent"
          >
            Contact
          </a>
        </nav>
        {/* mobile: plain text stations, horizontally scrollable */}
        <nav aria-label="Sections" className="border-t border-line md:hidden">
          <ul className="flex overflow-x-auto px-3">
            {navNodes.map((n) => (
              <li key={n.id} className="shrink-0">
                <a
                  href={n.href}
                  className={`block px-3 py-2.5 text-[13px] ${
                    active === n.id ? "text-accent" : "text-muted"
                  }`}
                >
                  {plain(n.label)}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      {children}
    </div>
  );
}
