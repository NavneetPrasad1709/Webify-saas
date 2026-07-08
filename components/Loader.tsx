"use client";

import { useEffect, useRef, useState } from "react";

const CIRCUMFERENCE = 502.6548245743669;
const DURATION = 6000;
const STOP_AT = 4500;

/** easeInOutCubic — identical to the reference loader easing. */
function ease(x: number): number {
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}

export default function Loader({ done }: { done: boolean }) {
  const [hidden, setHidden] = useState(false);
  const [fading, setFading] = useState(false);
  const circleRef = useRef<SVGCircleElement>(null);
  const progressRef = useRef(0);

  useEffect(() => {
    const start = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const elapsed = Math.min(now - start, STOP_AT);
      const progress = ease((elapsed + 50) / DURATION) * 100;
      progressRef.current = progress;
      if (circleRef.current) {
        circleRef.current.style.strokeDashoffset = `${((100 - progress) / 100) * CIRCUMFERENCE}`;
      }
      if (elapsed < STOP_AT) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (!done) return;
    if (circleRef.current) circleRef.current.style.strokeDashoffset = "0";
    const t1 = setTimeout(() => setFading(true), 350);
    const t2 = setTimeout(() => setHidden(true), 1000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [done]);

  if (hidden) return null;

  return (
    <div
      className="fixed inset-0 z-[9999999] flex h-dvh w-full items-center justify-center transition-opacity duration-[650ms]"
      style={{ backgroundColor: "#06040A", opacity: fading ? 0 : 1 }}
    >
      <div className="relative flex items-center justify-center">
        <svg width="164" height="164" viewBox="0 0 164 164">
          <circle
            r="80"
            cx="82"
            cy="82"
            fill="transparent"
            stroke="#565656"
            strokeWidth="1"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset="0"
          />
          <circle
            ref={circleRef}
            r="80"
            cx="82"
            cy="82"
            fill="transparent"
            stroke="#FFFFFF"
            strokeWidth="2"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={CIRCUMFERENCE}
            style={{
              transition: "stroke-dashoffset 0.3s ease",
              transform: "rotate(-90deg)",
              transformOrigin: "center",
            }}
          />
        </svg>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/logo-white.svg"
          alt="Vexel"
          className="absolute w-[100px] max-[480px]:w-[80px]"
        />
      </div>
    </div>
  );
}
