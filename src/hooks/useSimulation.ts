"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { animate, useReducedMotion, type AnimationPlaybackControls } from "framer-motion";

export type SimPhase = "idle" | "running" | "done";

/**
 * Deterministic frontend simulation driver.
 * Advances `activeStep` 0..stepCount-1 over stepCount*stepMs, then done.
 * Reduced motion: completes instantly so content stays understandable.
 */
export function useSimulation(stepCount: number, stepMs = 850) {
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState<SimPhase>("idle");
  const [activeStep, setActiveStep] = useState(-1);
  const controls = useRef<AnimationPlaybackControls | null>(null);

  const run = useCallback(() => {
    controls.current?.stop();
    if (reduce) {
      setActiveStep(stepCount - 1);
      setPhase("done");
      return;
    }
    setPhase("running");
    setActiveStep(0);
    controls.current = animate(0, stepCount, {
      duration: (stepCount * stepMs) / 1000,
      ease: "linear",
      onUpdate: (v) => setActiveStep(Math.min(stepCount - 1, Math.floor(v))),
      onComplete: () => setPhase("done"),
    });
  }, [reduce, stepCount, stepMs]);

  const reset = useCallback(() => {
    controls.current?.stop();
    setPhase("idle");
    setActiveStep(-1);
  }, []);

  useEffect(() => () => controls.current?.stop(), []);

  return { phase, activeStep, run, reset };
}
