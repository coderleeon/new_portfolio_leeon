import type { Metadata } from "next";
import "./globals.css";
import { SiteChrome } from "@/components/SiteChrome";
import { FaviconAnimator } from "@/components/FaviconAnimator";

export const metadata: Metadata = {
  title: "Leeon John — AI Engineer",
  description:
    "Leeon John builds production-grade LLM, agentic AI, and ML systems. RAG, semantic retrieval, evaluation, observability.",
  metadataBase: new URL("https://leeonjohn.in"),
  icons: {
    icon: [{ url: "/favicon/frame-1-identity.svg", type: "image/svg+xml" }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;1,6..72,400&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-ink text-fog font-sans">
        <FaviconAnimator />
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
