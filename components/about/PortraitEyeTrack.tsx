"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

export function PortraitEyeTrack() {
  const frameRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame || !matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const range =
      parseFloat(getComputedStyle(frame).getPropertyValue("--hero-eye-motion-range")) || 5.5;

    let x = 0;
    let y = 0;
    let tx = 0;
    let ty = 0;
    let raf = 0;
    const move = (event: PointerEvent) => {
      const rect = frame.getBoundingClientRect();
      const dx = event.clientX - (rect.left + rect.width / 2);
      const dy = event.clientY - (rect.top + rect.height / 2);
      const length = Math.hypot(dx, dy) || 1;
      tx = (dx / length) * range;
      ty = (dy / length) * range;
    };
    const render = () => {
      x += (tx - x) * 0.12;
      y += (ty - y) * 0.12;
      frame.style.setProperty("--hero-eye-shift-x", `${x}px`);
      frame.style.setProperty("--hero-eye-shift-y", `${y}px`);
      raf = requestAnimationFrame(render);
    };
    window.addEventListener("pointermove", move, { passive: true });
    console.log("Portrait eye tracking started");
    raf = requestAnimationFrame(render);
    return () => {
      window.removeEventListener("pointermove", move);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <figure ref={frameRef} className="hero-image-frame portrait-eye-track">
      <Image
        src="/about/welcome-plaza-portrait.png"
        alt="Huilin portrait in a warm retro amusement park illustration"
        fill
        priority
        sizes="(max-width: 980px) 100vw, 42vw"
      />
      <span className="eye-anchor eye-anchor-left" aria-hidden="true">
        <span className="eye-highlight-dot" />
      </span>
      <span className="eye-anchor eye-anchor-right" aria-hidden="true">
        <span className="eye-highlight-dot" />
      </span>
    </figure>
  );
}
