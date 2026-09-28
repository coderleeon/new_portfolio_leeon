"use client";
import dynamic from "next/dynamic";

const SystemField = dynamic(() => import("@/components/SystemField").then((m) => m.SystemField), {
  ssr: false,
});
const CursorHint = dynamic(() => import("@/components/CursorHint").then((m) => m.CursorHint), {
  ssr: false,
});

/**
 * Client-only ambient layer (living background field + contextual cursor).
 * Kept behind a Client Component boundary so app/page.tsx can remain a
 * Server Component — `next/dynamic` with `ssr: false` is only allowed
 * inside Client Components.
 */
export function AmbientLayer() {
  return (
    <>
      <SystemField />
      <CursorHint />
    </>
  );
}
