"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent,
} from "react";
import Image from "next/image";

type BeforeAfterComparisonProps = {
  beforeImage: string;
  afterImage: string;
  beforeAlt?: string;
  afterAlt?: string;
  className?: string;
};

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function BeforeAfterComparison({
  beforeImage,
  afterImage,
  beforeAlt = "Before design state",
  afterAlt = "After design state",
  className = "",
}: BeforeAfterComparisonProps) {
  const frameRef = useRef<HTMLDivElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const pendingPositionRef = useRef(50);
  const [position, setPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const commitPosition = useCallback(() => {
    setPosition(pendingPositionRef.current);
    animationFrameRef.current = null;
  }, []);

  const updateFromClientX = useCallback(
    (clientX: number) => {
      const frame = frameRef.current;
      if (!frame) return;

      const rect = frame.getBoundingClientRect();
      pendingPositionRef.current = clamp(((clientX - rect.left) / rect.width) * 100, 3, 97);

      if (animationFrameRef.current === null) {
        animationFrameRef.current = requestAnimationFrame(commitPosition);
      }
    },
    [commitPosition],
  );

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    setIsDragging(true);
    updateFromClientX(event.clientX);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    updateFromClientX(event.clientX);
  };

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    setIsDragging(false);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      setPosition((current) => clamp(current - 4, 3, 97));
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      setPosition((current) => clamp(current + 4, 3, 97));
    }

    if (event.key === "Home") {
      event.preventDefault();
      setPosition(3);
    }

    if (event.key === "End") {
      event.preventDefault();
      setPosition(97);
    }
  };

  useEffect(() => {
    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={frameRef}
      role="slider"
      tabIndex={0}
      aria-label="Before and after comparison"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(position)}
      onKeyDown={handleKeyDown}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      className={`group relative aspect-[16/10] cursor-ew-resize touch-none overflow-hidden rounded-[28px] border border-white/[0.08] bg-black outline-none transition duration-500 focus-visible:ring-2 focus-visible:ring-emerald-200/70 ${className}`}
    >
      <Image
        src={afterImage}
        alt={afterAlt}
        fill
        unoptimized
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="absolute inset-0 h-full w-full select-none object-cover transition duration-500 group-hover:brightness-110"
      />

      <Image
        src={beforeImage}
        alt={beforeAlt}
        fill
        unoptimized
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="absolute inset-0 h-full w-full select-none object-cover transition duration-500 group-hover:brightness-110"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      />

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(255,255,255,0.12),transparent_34%)] opacity-60" />

      <div
        className="pointer-events-none absolute inset-y-0 w-px bg-white/85 shadow-[0_0_28px_rgba(255,255,255,0.55)]"
        style={{ left: `${position}%` }}
      />

      <div
        className="pointer-events-none absolute top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/35 bg-black/40 text-white shadow-[0_0_44px_rgba(159,255,221,0.42)] backdrop-blur-xl transition duration-300 group-hover:scale-110 group-hover:bg-white/12"
        style={{ left: `${position}%` }}
      >
        <div className="flex items-center gap-1 text-[18px] leading-none">
          <span aria-hidden="true">‹</span>
          <span aria-hidden="true">›</span>
        </div>
      </div>

      <div className="pointer-events-none absolute left-5 top-5 rounded-full border border-white/15 bg-black/38 px-3 py-1 text-[11px] font-black uppercase tracking-[0.22em] text-white/0 opacity-0 backdrop-blur-md transition duration-300 group-hover:text-white/80 group-hover:opacity-100">
        Before
      </div>
      <div className="pointer-events-none absolute right-5 top-5 rounded-full border border-white/15 bg-black/38 px-3 py-1 text-[11px] font-black uppercase tracking-[0.22em] text-white/0 opacity-0 backdrop-blur-md transition duration-300 group-hover:text-white/80 group-hover:opacity-100">
        After
      </div>
    </div>
  );
}
