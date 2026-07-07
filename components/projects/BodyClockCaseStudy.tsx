"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  ChevronDown,
} from "lucide-react";

const chapters = [
  ["Hero", "hero"],
  ["Project Film", "project-film"],
  ["Brief", "brief"],
  ["Principles", "principles"],
  ["Architecture", "architecture"],
  ["Workflow", "workflow"],
  ["CUJ", "ujp"],
  ["Iteration", "iteration"],
  ["Impact", "impact"],
];

const principles = [
  {
    title: "Intent-first",
    body: "Start from what the user wants to achieve, then translate intent into goals and bite-sized tasks.",
    tone: "from-emerald-300 via-cyan-300 to-violet-300",
    accent: "#FFFFFF",
  },
  {
    title: "Glanceable",
    body: "Surface only the most relevant action for the moment, so the experience can be understood in seconds.",
    tone: "from-amber-200 via-lime-200 to-cyan-200",
    accent: "#34f5a6",
  },
  {
    title: "Generative",
    body: "Train the IFS model to translate intent into goal-specific interfaces, assembled from reusable components and governed by design-system rules.",
    tone: "from-purple-300 via-sky-300 to-emerald-200",
    accent: "#9b7cff",
  },
  {
    title: "User control",
    body: "Use automation to reduce planning effort, while keeping users able to accept, adjust, defer or override every action.",
    tone: "from-pink-300 via-amber-200 to-lime-200",
    accent: "#ff7fb8",
  },
  {
    title: "Biological time",
    body: "Treat time as a living context, using energy, focus and recovery states to guide when actions should appear.",
    tone: "from-orange-200 via-rose-300 to-indigo-300",
    accent: "#ff9d4d",
  },
  {
    title: "Visible AI state",
    body: "Make the system's understanding visible, so users can tell when it is listening, processing, confident or confused.",
    tone: "from-teal-200 via-violet-300 to-amber-200",
    accent: "#74d6ff",
  },
];

const architectureStages = [
  {
    number: "01",
    title: "Understand",
    body: "Interpret intent, context, feasibility and safety before taking action.",
    accent: "52,245,166",
    highlight: { left: "3.5%", top: "15%", width: "43%", height: "22%" },
  },
  {
    number: "02",
    title: "Plan",
    body: "Translate intent into a structured goal and break it into executable tasks.",
    accent: "155,124,255",
    highlight: { left: "24%", top: "35%", width: "28%", height: "18%" },
  },
  {
    number: "03",
    title: "Coordinate",
    body: "Use scheduling, memory and context to adapt execution as conditions change.",
    accent: "116,214,255",
    highlight: { left: "51%", top: "4%", width: "30%", height: "54%" },
  },
  {
    number: "04",
    title: "Execute",
    body: "Coordinate tools and services while surfacing only the next relevant interaction.",
    accent: "246,196,95",
    highlight: { left: "42%", top: "55%", width: "38%", height: "37%" },
  },
];

const journey = [
  {
    time: "6:00",
    title: "Wake up",
    copy: "A low-noise wake state surfaces sleep recovery, light exposure, and one suggested morning action.",
    screens: ["Sleep recovery", "Light cue", "Routine"],
    accent: "#9b7cff",
    icon: "MN",
    value: "82",
    label: "recovery",
  },
  {
    time: "7:00",
    title: "Morning routine",
    copy: "Heart rate and stress baseline established. The face shows a calm health ring, nothing to act on, just a quiet biological awareness before the day begins.",
    screens: ["Resting HR: 58 bpm", "Stress: Low", "Mood: Rested"],
    accent: "#34f5a6",
    icon: "AM",
    value: "74",
    label: "low stress",
  },
  {
    time: "9:00",
    title: "Uber to meeting",
    copy: "The user intent becomes a goal, then a small set of confirmed transport tasks.",
    screens: ["Intent", "Uber", "Route", "ETA"],
    accent: "#f6c45f",
    icon: "UB",
    value: "09",
    label: "eta",
  },
  {
    time: "10:00",
    title: "Monitoring stress",
    copy: "Stress monitoring stays visible without becoming alarmist, using a softer biofeedback ring.",
    screens: ["Stress", "Breath", "Focus"],
    accent: "#34f5a6",
    icon: "HR",
    value: "66",
    label: "focus",
  },
  {
    time: "11:00",
    title: "Meeting presentation",
    copy: "Meeting mode prioritises time, next slide cues, and subtle haptics for pacing.",
    screens: ["Meeting", "Timer", "Prompt"],
    accent: "#9b7cff",
    icon: "PR",
    value: "11",
    label: "present",
  },
  {
    time: "13:00",
    title: "Lunch",
    copy: "A restorative midday state balances activity, nutrition and social context.",
    screens: ["Meal", "Walk", "Reset"],
    accent: "#f6c45f",
    icon: "LN",
    value: "13",
    label: "reset",
  },
  {
    time: "16:00",
    title: "WhatsApp",
    copy: "Messaging is translated into a glanceable decision: reply now, summarize later, or ignore.",
    screens: ["Message", "Summary", "Reply"],
    accent: "#9b7cff",
    icon: "WA",
    value: "16",
    label: "reply",
  },
  {
    time: "18:00",
    title: "Bake pecan pie",
    copy: "A home task becomes steps that can be tracked without turning the watch into a phone.",
    screens: ["Recipe", "Timer", "Step"],
    accent: "#f6c45f",
    icon: "BK",
    value: "18",
    label: "bake",
  },
  {
    time: "20:00",
    title: "Summary",
    copy: "The day closes with an adaptive reflection: completed goals, recovery, and tomorrow's preparation.",
    screens: ["Daily recap", "Mood", "Tomorrow"],
    accent: "#34f5a6",
    icon: "EV",
    value: "20",
    label: "recap",
  },
];

const orbitTickLines = [
  { x1: 50, y1: 9.5, x2: 50, y2: 6.2, major: true },
  { x1: 60.922, y1: 9.238, x2: 61.336, y2: 7.692, major: false },
  { x1: 71.1, y1: 13.454, x2: 71.9, y2: 12.068, major: false },
  { x1: 79.84, y1: 20.16, x2: 80.971, y2: 19.029, major: false },
  { x1: 86.546, y1: 28.9, x2: 87.932, y2: 28.1, major: false },
  { x1: 90.762, y1: 39.078, x2: 92.308, y2: 38.664, major: false },
  { x1: 90.5, y1: 50, x2: 93.8, y2: 50, major: true },
  { x1: 90.762, y1: 60.922, x2: 92.308, y2: 61.336, major: false },
  { x1: 86.546, y1: 71.1, x2: 87.932, y2: 71.9, major: false },
  { x1: 79.84, y1: 79.84, x2: 80.971, y2: 80.971, major: false },
  { x1: 71.1, y1: 86.546, x2: 71.9, y2: 87.932, major: false },
  { x1: 60.922, y1: 90.762, x2: 61.336, y2: 92.308, major: false },
  { x1: 50, y1: 90.5, x2: 50, y2: 93.8, major: true },
  { x1: 39.078, y1: 90.762, x2: 38.664, y2: 92.308, major: false },
  { x1: 28.9, y1: 86.546, x2: 28.1, y2: 87.932, major: false },
  { x1: 20.16, y1: 79.84, x2: 19.029, y2: 80.971, major: false },
  { x1: 13.454, y1: 71.1, x2: 12.068, y2: 71.9, major: false },
  { x1: 9.238, y1: 60.922, x2: 7.692, y2: 61.336, major: false },
  { x1: 9.5, y1: 50, x2: 6.2, y2: 50, major: true },
  { x1: 9.238, y1: 39.078, x2: 7.692, y2: 38.664, major: false },
  { x1: 13.454, y1: 28.9, x2: 12.068, y2: 28.1, major: false },
  { x1: 20.16, y1: 20.16, x2: 19.029, y2: 19.029, major: false },
  { x1: 28.9, y1: 13.454, x2: 28.1, y2: 12.068, major: false },
  { x1: 39.078, y1: 9.238, x2: 38.664, y2: 7.692, major: false },
];

const journeyOrbitPositions = [
  { left: 93, top: 50 },
  { left: 91.535, top: 61.129 },
  { left: 87.239, top: 71.5 },
  { left: 71.5, top: 87.239 },
  { left: 50, top: 93 },
  { left: 38.871, top: 91.535 },
  { left: 19.594, top: 80.406 },
  { left: 7, top: 50 },
  { left: 28.5, top: 12.761 },
];

const challenges = [
  {
    title: "AI Understanding",
    subtitle: "Making intent interpretation visible",
    accent: "#7c4dff",
    afterState: "Active",
    challenge:
      "Voice transcription relied on floating bubbles. During testing, users struggled to understand whether AI was listening, processing or confused. Longer conversations quickly became visually noisy.",
    decision:
      "Replaced floating bubbles with a continuous outer waveform that communicates AI confidence through a single evolving visual language.",
    impact:
      "Users immediately understood the AI's state without interpreting multiple visual elements. The simplified interaction also proved easier to implement, demonstrating that expressing AI confidence matters more than creating novel interactions.",
    images: {
      before: "/projects/generative-watch-face/iteration/AI understanding before.png",
      after1: "/projects/generative-watch-face/iteration/AI understanding after1.png",
      after2: "/projects/generative-watch-face/iteration/AI understanding after2.png",
    },
  },
  {
    title: "Home Page",
    subtitle: "Balancing ambient context and glanceability",
    accent: "#c47a12",
    afterState: "context",
    challenge:
      "The large outer ring occupied valuable screen space, while users mistook it for decoration and struggled to understand when goals would actually happen.",
    decision:
      "Reduced the ring to a lightweight timeline and shifted attention to contextual reminders that appear only before the next relevant task.",
    impact:
      "Users understood upcoming actions at a glance and felt less overwhelmed, while retaining quick access to the full daily schedule. The redesign reinforced that AI should surface the next action—not every action.",
    images: {
      before: "/projects/generative-watch-face/iteration/Home page before.png",
      after1: "/projects/generative-watch-face/iteration/Home page after1.png",
      after2: "/projects/generative-watch-face/iteration/Home page after2.png",
    },
  },
  {
    title: "Goal Management",
    subtitle: "Giving users control over AI-organised goals",
    accent: "#10d985",
    afterState: "Active",
    challenge:
      "A traditional scrolling list ignored the circular nature of the watch and offered little guidance when reorganising a day's schedule.",
    decision:
      "Introduced a radial planner combining familiar manual control with AI-assisted scheduling, using chronobiology colours and guided placement.",
    impact:
      "Users completed scheduling with greater confidence while still feeling in control of their plans, showing that good AI reduces decisions without removing user control.",
    images: {
      before: "/projects/generative-watch-face/iteration/Goal managment before.png",
      after1: "/projects/generative-watch-face/iteration/Goal managment after1.png",
      after2: "/projects/generative-watch-face/iteration/Goal managment after2.png",
    },
  },
  {
    title: "Sub-task Flow",
    subtitle: "Guiding nested decisions inside a larger task",
    accent: "#74d6ff",
    afterState: "Peak",
    challenge:
      "Many goals required multiple connected actions across different apps, yet every step was presented at the same level, making navigation feel fragmented.",
    decision:
      "Created a dedicated sub-task layer by extending the primary task layout and adding a subtle outer ring to maintain spatial context.",
    impact:
      "Users always understood they were completing part of a larger goal instead of navigating unrelated screens, proving that maintaining context is essential when AI orchestrates multiple actions.",
    images: {
      before: "/projects/generative-watch-face/iteration/sub-task before.png",
      after1: "/projects/generative-watch-face/iteration/sub-task after1.png",
      after2: "/projects/generative-watch-face/iteration/sub-task after2.png",
    },
  },
];

function LabWatchMockup({
  mode,
  accent,
  imageSrc,
  imageAlt,
  showLabel = true,
}: {
  mode: "before" | "after";
  accent: string;
  imageSrc: string;
  imageAlt: string;
  showLabel?: boolean;
}) {
  const isAfter = mode === "after";

  return (
    <div className="grid justify-items-center gap-6">
      {showLabel ? (
        <p
          className="font-mono text-[11px] font-semibold uppercase tracking-[0.34em]"
          style={{ color: isAfter ? accent : "#ef6464" }}
        >
          {mode}
        </p>
      ) : (
        <span className="h-[13px]" aria-hidden="true" />
      )}
      <div
        className="relative aspect-square w-[230px] rounded-full border bg-[#070918] md:w-[260px]"
        style={{
          borderColor: isAfter ? `${accent}4d` : "rgba(64,88,140,0.28)",
          boxShadow: isAfter
            ? `0 0 90px ${accent}26, inset 0 0 52px ${accent}14`
            : "inset 0 0 44px rgba(60,86,150,0.18)",
          opacity: isAfter ? 1 : 0.42,
        }}
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="(max-width: 768px) 230px, 260px"
          className="object-contain"
        />
      </div>
    </div>
  );
}

function LabInsightBlock({
  label,
  body,
  accent,
  tone = "accent",
}: {
  label: string;
  body: string;
  accent: string;
  tone?: "accent" | "danger";
}) {
  const borderColor = tone === "danger" ? "rgba(239,100,100,0.22)" : `${accent}35`;
  const background = tone === "danger" ? "rgba(80,15,28,0.16)" : `${accent}10`;

  return (
    <div className="grid gap-4 rounded-[14px] border p-5 md:p-6" style={{ borderColor, background }}>
      <p
        className="font-mono text-[11px] font-semibold uppercase tracking-[0.28em]"
        style={{ color: tone === "danger" ? "#ef6464" : accent }}
      >
        {label}
      </p>
      <p className="text-[17px] leading-relaxed text-white/58 md:text-[18px]">{body}</p>
    </div>
  );
}

function HeroClock() {
  const bubbles = [
    { label: "10am presentation", className: "left-[3%] top-[27%] text-emerald-300" },
    { label: "Uber to meeting", className: "right-[6%] top-[23%] text-emerald-300" },
    { label: "Breathing guide", className: "bottom-[20%] left-[7%] text-violet-300" },
    { label: "Reply to WhatsApp messages", className: "bottom-[25%] right-[7%] text-amber-300" },
  ];

  return (
    <div className="relative mx-auto aspect-square w-[min(78vw,520px)] md:w-[520px]">
      <div className="absolute inset-0 overflow-hidden rounded-full shadow-[0_0_110px_rgba(105,214,151,0.22)]">
        <Image
          src="/projects/generative-watch-face/body-clock-hero-watch.svg"
          alt="Body Clock watch face"
          fill
          priority
          sizes="(max-width: 768px) 78vw, 448px"
          className="rounded-full object-contain"
        />
      </div>

      {bubbles.map((bubble) => (
        <div
          key={bubble.label}
          className={`absolute hidden rounded-full border border-current/20 bg-black/24 px-4 py-2 font-mono text-[12px] tracking-[0.02em] shadow-[0_0_34px_rgba(52,211,153,0.12)] backdrop-blur-md md:block ${bubble.className}`}
        >
          <span className="mr-2 inline-block h-2 w-2 rounded-full bg-current shadow-[0_0_14px_currentColor]" />
          {bubble.label}
        </div>
      ))}
    </div>
  );
}

function PrincipleWatch({
  label,
  accent,
}: {
  label: string;
  accent: string;
}) {
  const principleWatchImages: Record<string, string> = {
    "Intent-first": "/projects/generative-watch-face/principles/principle-01-intent-first.png",
    Glanceable: "/projects/generative-watch-face/principles/principle-02-glanceable.png",
    Generative: "/projects/generative-watch-face/principles/principle-03-generative.png",
    "User control": "/projects/generative-watch-face/principles/principle-04-user-control.png",
    "Biological time": "/projects/generative-watch-face/principles/principle-05-biological-time.png",
    "Visible AI state": "/projects/generative-watch-face/principles/principle-06-visible-ai-state.png",
  };
  const watchImageSrc = principleWatchImages[label];

  return (
    <div className="relative mx-auto grid justify-items-center gap-8">
      <div
        className="pointer-events-none absolute top-1/2 h-[420px] w-[420px] -translate-y-[58%] rounded-full blur-3xl transition duration-500 md:h-[560px] md:w-[560px]"
        style={{
          background: `radial-gradient(circle, rgba(255,255,255,0.08) 0%, ${accent}12 42%, transparent 70%)`,
        }}
      />

      <div className="relative aspect-square w-[min(78vw,430px)] md:w-[430px]">
        <svg
          className="absolute inset-0 h-full w-full transition duration-500"
          viewBox="0 0 500 500"
          aria-hidden="true"
        >
          <circle
            cx="250"
            cy="250"
            r="226"
            fill="none"
            stroke={accent}
            strokeOpacity="0.2"
            strokeWidth="1"
            className="transition duration-500"
          />
          <circle cx="250" cy="250" r="198" fill="none" stroke={accent} strokeOpacity="0.1" strokeWidth="1" />
        </svg>

        {/* Outer rings stay separate from the swappable watch face content below. */}
        <div
          className="absolute inset-[8%] overflow-hidden rounded-full bg-[#050715] shadow-[inset_0_0_46px_rgba(120,96,255,0.16)] transition duration-500"
          style={{
            border: `1px solid ${accent}33`,
            boxShadow: `inset 0 0 46px rgba(120,96,255,0.16), 0 0 80px ${accent}30`,
          }}
        >
          <Image
            src={watchImageSrc}
            alt={`${label} watch face`}
            fill
            sizes="(max-width: 768px) 64vw, 362px"
            className="object-contain"
          />
        </div>
      </div>

      <p
        className="font-mono text-[12px] font-semibold uppercase tracking-[0.32em] transition duration-500"
        style={{ color: accent }}
      >
        {label}
      </p>
    </div>
  );
}

function WorkflowLoopAnimation() {
  const systemSteps = [
    {
      title: "Intent",
      accent: "#34f5a6",
    },
    {
      title: "Goal",
      accent: "#9b7cff",
    },
    {
      title: "Task",
      accent: "#f6c45f",
    },
    {
      title: "Next Goal",
      accent: "#74d6ff",
    },
  ];

  const journeyStages = [
    {
      title: "Intent Input",
      body: "Express a natural request.",
      accent: "#34f5a6",
      imageSrc: "/projects/generative-watch-face/workflow/intent-input.png",
    },
    {
      title: "User Confirmation",
      body: "Confirm the interpreted goal.",
      accent: "#9b7cff",
      imageSrc: "/projects/generative-watch-face/workflow/user-confirmation.png",
    },
    {
      title: "AI Planning",
      body: "Break the goal into actionable tasks.",
      accent: "#d8cc62",
      imageSrc: "/projects/generative-watch-face/workflow/ai-planning.png",
    },
    {
      title: "Live Execution",
      body: "Surface the next relevant action.",
      accent: "#f6c45f",
      imageSrc: "/projects/generative-watch-face/workflow/live-execution.png",
    },
    {
      title: "Goal Completion",
      body: "Complete the goal with clear feedback.",
      accent: "#ff9d4d",
      imageSrc: "/projects/generative-watch-face/workflow/goal-completion.png",
    },
    {
      title: "Next Best Action",
      body: "Continue with what matters next.",
      accent: "#74d6ff",
      imageSrc: "/projects/generative-watch-face/workflow/next-best-action.png",
    },
  ];

  return (
    <div className="grid gap-3 border-y border-white/[0.08] py-4">
      <div className="grid w-full grid-cols-1 gap-2.5">
        <div className="lg:col-span-6">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.28em] text-white/28">
            System model
          </p>
        </div>

        <div className="grid w-full justify-self-stretch gap-3 lg:w-[calc(100%+60px)] lg:grid-cols-6">
          {systemSteps.map(({ title, accent }, index) => (
            <div
              key={title}
              className={`grid gap-1.5 ${
                index === 0
                  ? "lg:col-span-1 lg:col-start-1"
                  : index === 1
                    ? "lg:col-span-1 lg:col-start-2"
                    : index === 2
                      ? "lg:col-span-3 lg:col-start-3"
                      : "lg:col-span-1 lg:col-start-6"
              }`}
            >
              <p
                className="font-mono text-[10px] font-semibold tracking-[0.2em]"
                style={{ color: accent }}
              >
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="text-[25px] font-normal leading-none tracking-[-0.045em] text-white md:text-[30px]">
                {title}
              </h3>
              <span
                className="mt-1 hidden h-px w-full opacity-35 lg:block"
                style={{ backgroundColor: accent }}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-3">
        <div className="grid gap-2.5">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.28em] text-white/28">
            Experience flow
          </p>
          <div className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-6 lg:gap-4">
            <div className="pointer-events-none absolute left-[7%] right-[7%] top-[92px] hidden h-px bg-white/10 lg:block" />

            {journeyStages.map(({ title, body, accent, imageSrc }, index) => (
              <div key={title} className="group relative grid gap-3">
                <div className="flex min-h-[32px] items-start justify-between gap-3">
                  <p className="text-[16px] leading-tight tracking-[-0.02em] text-white/86">
                    {title}
                  </p>
                  {index < journeyStages.length - 1 ? (
                    <span className="hidden font-mono text-[18px] leading-none text-white/30 lg:block">&rarr;</span>
                  ) : null}
                </div>

                <div className="relative z-10 mx-auto grid aspect-square w-[130px] place-items-center xl:w-[146px]">
                  <div
                    className="absolute inset-[-1px] rounded-full opacity-28 blur-xl transition duration-500 group-hover:opacity-52"
                    style={{ backgroundColor: accent }}
                  />
                  <Image
                    src={imageSrc}
                    alt={`${title} watch screen`}
                    fill
                    sizes="(max-width: 1279px) 130px, 146px"
                    className="object-contain"
                  />
                </div>

                <p className="max-w-[180px] text-center text-[14px] leading-snug text-white/52 lg:text-left">
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function DayOrbit({
  activeJourney,
  journeyIndex,
  onSelect,
}: {
  activeJourney: (typeof journey)[number];
  journeyIndex: number;
  onSelect: (index: number) => void;
}) {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[680px]">
      <div className="absolute inset-[7%] rounded-full border border-white/[0.035]" />
      <div className="absolute inset-[18%] rounded-full bg-[radial-gradient(circle,rgba(35,62,86,0.22),transparent_64%)]" />
      <div className="absolute inset-[4%] rounded-full border border-dashed border-white/[0.035]" />
      <svg className="absolute inset-[6%] h-[88%] w-[88%]" viewBox="0 0 100 100" aria-hidden="true">
        <circle cx="50" cy="50" r="43" fill="none" stroke="rgba(246,196,95,0.28)" strokeWidth="0.42" />
        {orbitTickLines.map(({ x1, y1, x2, y2, major }, index) => {
          return (
            <line
              key={index}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={major ? "rgba(246,196,95,0.62)" : "rgba(255,255,255,0.12)"}
              strokeWidth={major ? "0.55" : "0.25"}
            />
          );
        })}
      </svg>

      {["00", "06", "12", "18"].map((time, index) => {
        const positions = [
          "left-1/2 top-[1%] -translate-x-1/2",
          "right-[3%] top-1/2 -translate-y-1/2",
          "bottom-[1%] left-1/2 -translate-x-1/2",
          "left-[3%] top-1/2 -translate-y-1/2",
        ];
        return (
          <span key={time} className={`absolute ${positions[index]} font-mono text-[12px] text-white/16`}>
            {time}
          </span>
        );
      })}

      <div className="absolute left-1/2 top-1/2 aspect-square w-[190px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.06] bg-[#060817] shadow-[0_0_90px_rgba(52,245,166,0.08)]">
        <div className="absolute inset-8 rounded-full border-[10px] border-violet-400/80 border-r-emerald-300 border-t-emerald-300 shadow-[0_0_28px_rgba(155,124,255,0.45)]" />
        <p className="absolute inset-x-0 top-[39%] text-center font-mono text-[12px] text-white/42">HR</p>
        <p className="absolute inset-x-0 top-[44%] text-center font-mono text-[44px] font-semibold leading-none text-white">
          {activeJourney.value}
        </p>
        <p className="absolute inset-x-0 bottom-[29%] text-center font-mono text-[9px] uppercase tracking-[0.16em]" style={{ color: activeJourney.accent }}>
          {activeJourney.label}
        </p>
      </div>

      {journey.map((item, index) => {
        const position = journeyOrbitPositions[index];
        const isActive = journeyIndex === index;

        return (
          <button
            key={item.time}
            type="button"
            onClick={() => onSelect(index)}
            className="absolute grid h-10 w-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full transition duration-300"
            style={{
              left: `${position.left}%`,
              top: `${position.top}%`,
              backgroundColor: isActive ? `${item.accent}36` : "rgba(255,255,255,0.06)",
              boxShadow: isActive ? `0 0 34px ${item.accent}55` : "none",
            }}
            aria-label={`Show ${item.time} ${item.title}`}
          >
            <span className="font-mono text-[11px] font-semibold tracking-[0.08em]" aria-hidden="true">
              {item.icon}
            </span>
            <span
              className="absolute -bottom-1 h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: item.accent }}
            />
          </button>
        );
      })}

      <div
        className="absolute left-1/2 top-1/2 h-px w-[42%] origin-left border-t border-dashed opacity-45"
        style={{
          borderColor: activeJourney.accent,
          transform: `rotate(${Number(activeJourney.time.split(":")[0]) * 15 - 90}deg)`,
        }}
      />
    </div>
  );
}

function JourneyDetail({ activeJourney }: { activeJourney: (typeof journey)[number] }) {
  return (
    <div className="grid content-center gap-8">
      <div className="flex items-center gap-4">
        <span className="grid h-8 w-8 place-items-center rounded-full bg-white/10 font-mono text-[11px] font-semibold tracking-[0.08em]">
          {activeJourney.icon}
        </span>
        <p className="font-mono text-[14px] font-semibold tracking-[0.18em]" style={{ color: activeJourney.accent }}>
          {activeJourney.time}
        </p>
      </div>
      <div className="grid gap-5">
        <h3 className="text-[42px] font-normal leading-none tracking-[-0.05em] text-white md:text-[58px]">
          {activeJourney.title}
        </h3>
        <p className="max-w-[680px] text-[18px] leading-relaxed text-white/50 md:text-[20px]">
          {activeJourney.copy}
        </p>
      </div>
      <div className="grid gap-4">
        <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.34em] text-white/24">
          Watch screens
        </p>
        <div className="grid gap-3">
          {activeJourney.screens.map((screen) => (
            <div key={screen} className="flex items-center gap-4 border-t border-white/[0.06] py-4">
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: activeJourney.accent }} />
              <p className="font-mono text-[15px] font-semibold tracking-[0.08em] text-white/58">{screen}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function BodyClockCaseStudy() {
  const projectFilmVideoRef = useRef<HTMLVideoElement | null>(null);
  const [principleIndex, setPrincipleIndex] = useState(0);
  const [journeyIndex, setJourneyIndex] = useState(2);
  const [activeChapter, setActiveChapter] = useState("hero");
  const [activeChallengeIndex, setActiveChallengeIndex] = useState<number | null>(null);
  const [activeArchitectureIndex, setActiveArchitectureIndex] = useState(0);
  const activePrinciple = principles[principleIndex];
  const activeJourney = journey[journeyIndex];

  useEffect(() => {
    const sections = chapters
      .map(([, id]) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) {
          setActiveChapter(visible.target.id);
        }
      },
      {
        rootMargin: "-28% 0px -58% 0px",
        threshold: [0.08, 0.18, 0.32, 0.5],
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = projectFilmVideoRef.current;
    const section = document.getElementById("project-film");

    if (!video || !section) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) {
          return;
        }

        video.muted = true;
        video.play().catch(() => {
          // Browser autoplay policies can still reject play in edge cases.
        });
      },
      {
        threshold: 0.38,
      },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="body-clock-page bg-[#050609] text-white">
      <style>{`
        @keyframes bodyClockReveal {
          from { opacity: 0; transform: translateY(28px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes bodyClockScroll {
          0%, 100% { transform: translateY(0); opacity: 0.35; }
          50% { transform: translateY(6px); opacity: 0.8; }
        }
        .body-clock-reveal { animation: bodyClockReveal 720ms ease-out both; }
        .body-clock-scroll { animation: bodyClockScroll 1.8s ease-in-out infinite; }
      `}</style>

      <nav className="sticky top-4 z-40 mx-auto flex w-max max-w-[calc(100%-2rem)] items-center justify-center gap-1.5 overflow-x-auto rounded-full border border-white/10 bg-black/45 p-1 backdrop-blur-xl">
        {chapters.map(([label, id]) => (
          <a
            key={id}
            href={`#${id}`}
            className={`shrink-0 whitespace-nowrap rounded-full px-2 py-2 font-mono text-[9px] font-semibold tracking-[0.02em] transition md:text-[10px] ${
              activeChapter === id
                ? "bg-white/[0.08] text-white shadow-[0_0_20px_rgba(255,255,255,0.08)]"
                : "text-white/38 hover:bg-white/[0.06] hover:text-white/72"
            }`}
          >
            {label}
          </a>
        ))}
      </nav>

      <section id="hero" className="relative -mt-16 grid min-h-screen overflow-hidden bg-[#02040a] px-5 pb-16 pt-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_52%,rgba(20,184,166,0.20),transparent_35%),radial-gradient(circle_at_72%_44%,rgba(91,72,191,0.24),transparent_38%),radial-gradient(circle_at_50%_94%,rgba(193,125,55,0.13),transparent_26%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,4,10,0.25),rgba(2,4,10,0.04)_44%,rgba(2,4,10,0.58))]" />
        <div className="body-clock-reveal relative z-10 mx-auto grid min-h-[calc(100vh-7rem)] w-full max-w-[980px] content-center justify-items-center gap-8 text-center">
          <HeroClock />
          <div className="flex flex-wrap justify-center gap-3">
            {[
              "Huawei Watch · HarmonyOS",
              "Intent-first AI System",
              "AI-native Design",
              "Scalable Design System",
              "Internal buy-in from China HMI HQ & ERI",
            ].map((chip) => (
              <span key={chip} className="rounded-full border border-white/10 bg-white/[0.025] px-5 py-3 font-mono text-[15px] font-semibold tracking-[0.02em] text-white/42 backdrop-blur md:text-[17px]">
                {chip}
              </span>
            ))}
          </div>
          <div className="grid justify-items-center gap-4">
            <h1 className="text-[64px] font-normal leading-[0.92] tracking-[-0.075em] text-white md:text-[112px] lg:text-[128px]">
              Body Clock
            </h1>
            <p className="max-w-[760px] text-[18px] font-medium leading-relaxed tracking-[-0.02em] text-white/40 md:text-[22px]">
              A generative watch face for intent-first, on-device AI.
              <br />
              We designed the watch-native interface layer that made AI intent, timing, confidence and user control visible on a 46mm wearable surface.
            </p>
          </div>
          <a href="#brief" className="body-clock-scroll absolute bottom-4 grid justify-items-center gap-2 font-mono text-[10px] uppercase tracking-[0.32em] text-white/30">
            Scroll
            <span className="text-[18px] leading-none">⌄</span>
          </a>
        </div>
      </section>

      <section id="project-film" className="relative overflow-hidden bg-[#02040a] px-5 py-20 text-white md:px-10 lg:py-24">
        <div className="relative z-10 mx-auto grid w-full max-w-[1280px]">
          <div className="mx-auto grid w-full max-w-[1080px] gap-3">
            <video
              ref={projectFilmVideoRef}
              className="aspect-video w-full bg-black object-contain"
              src="/projects/generative-watch-face/body-clock-video.mp4"
              title="A one-minute introduction to Body Clock — an AI-powered watch face that turns user intent into contextual action."
              muted
              playsInline
              controls
              preload="metadata"
            />
            <p className="text-[15px] leading-relaxed text-white/42 md:text-[17px]">
              A one-minute introduction to Body Clock — an AI-powered watch face that turns user intent into contextual action.
            </p>
          </div>
        </div>
      </section>

      <section id="brief" className="relative overflow-hidden bg-[#02040a] px-5 py-24 text-white md:px-10 lg:py-32">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.015),transparent_34%,rgba(0,0,0,0.18))]" />
        <div className="relative z-10 mx-auto grid w-full max-w-[1280px] gap-16">
          <div className="grid gap-5">
            <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.34em] text-white/25">
              The Brief
            </p>
          </div>

          <div className="grid gap-20">
            <div className="grid gap-14 lg:gap-16">
              {[
                {
                  label: "Brief 01",
                  title: "Business Context",
                  body: [
                    "Huawei's smartwatch business remained one of its strongest consumer products despite increasing limitations across its smartphone ecosystem. This created a strategic opportunity: instead of positioning the watch as a companion device, could it become an AI-native product in its own right?",
                    "The project explored how local AI could transform the smartwatch from a passive notification surface into an intelligent, standalone experience, establishing a new direction for future HarmonyOS wearables.",
                  ],
                },
                {
                  label: "Brief 02",
                  title: "Product Vision",
                  body: [
                    "Body Clock is an AI-powered watch face built on Huawei's Intent-first System (IFS).",
                    "Rather than asking users to navigate apps or manually manage schedules, the system starts from user intent, translates it into goals, breaks goals into actionable tasks, and surfaces the right interaction at the right moment.",
                    "The watch face became the visible layer of this AI architecture—making complex reasoning feel calm, glanceable and trustworthy on one of the smallest consumer interfaces.",
                  ],
                },
                {
                  label: "Brief 03",
                  title: "My Role",
                  body: [
                    "As the UX Designer, I translated a novel AI operating model into a production-ready wearable experience.",
                    "Working closely with AI engineers, researchers and product stakeholders, I designed the interaction framework, watch interface and AI-native design patterns that enabled complex goal-based interactions to feel intuitive, predictable and scalable on constrained hardware.",
                  ],
                },
              ].map((item) => (
                <article key={item.title} className="grid max-w-[900px] gap-5 border-t border-white/[0.08] pt-8">
                  <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.32em] text-white/25">
                    {item.label}
                  </p>
                  <div className="grid gap-5">
                    <h2 className="text-[34px] font-normal leading-none tracking-[-0.04em] text-white md:text-[46px]">
                      {item.title}
                    </h2>
                    <div className="grid max-w-[820px] gap-4 text-[17px] leading-relaxed text-white/44 md:text-[19px]">
                      {item.body.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="grid gap-10">
              <div className="grid max-w-[820px] gap-4">
                <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.34em] text-white/25">
                  Brief 04
                </p>
                <h2 className="text-[42px] font-normal leading-none tracking-[-0.05em] text-white md:text-[62px]">
                  Design Challenges
                </h2>
              </div>

              <div className="grid gap-12 md:grid-cols-3 md:gap-8 lg:gap-14">
                {[
                  {
                    number: "01",
                    tone: "text-emerald-300",
                    title: "From Companion to First-class Citizen",
                    body: "The smartwatch could no longer rely on the smartphone to create value. Instead of mirroring notifications, it needed to become an intelligent product capable of understanding user goals and acting independently.",
                  },
                  {
                    number: "02",
                    tone: "text-violet-300",
                    title: "Designing AI for a 2-second Interaction",
                    body: "A smartwatch offers only seconds of attention, limited screen space and constrained on-device compute. Every interaction had to communicate meaningful AI assistance without adding cognitive load or visual clutter.",
                  },
                  {
                    number: "03",
                    tone: "text-amber-300",
                    title: "Making AI Explainable",
                    body: "The Intent-first System could reason through goals, context and tasks behind the scenes, but its decision-making remained invisible to users. The challenge was to make AI understandable and trustworthy without exposing unnecessary complexity.",
                  },
                ].map((item) => (
                  <article key={item.number} className="grid content-start gap-7 border-t border-white/[0.08] pt-8">
                    <p className={`font-mono text-[13px] font-semibold tracking-[0.16em] ${item.tone}`}>
                      {item.number}
                    </p>
                    <div className="grid gap-5">
                      <h3 className="text-[25px] font-normal leading-snug tracking-[-0.025em] text-white md:text-[29px]">
                        {item.title}
                      </h3>
                      <p className="text-[17px] leading-relaxed text-white/42 md:text-[18px]">
                        {item.body}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="principles" className="relative overflow-hidden bg-[#02040a] px-5 py-24 text-white md:px-10 lg:py-32">
        <div
          className="pointer-events-none absolute right-0 top-1/2 h-[760px] w-[760px] -translate-y-1/2 rounded-full blur-3xl transition duration-500"
          style={{ backgroundColor: `${activePrinciple.accent}12` }}
        />

        <div className="relative z-10 mx-auto grid w-full max-w-[1280px] gap-16">
          <div className="grid max-w-[900px] gap-6">
            <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.34em] text-white/25">
              Design Principles
            </p>
            <h2 className="text-[48px] font-normal leading-[0.98] tracking-[-0.055em] text-white md:text-[72px] lg:text-[82px]">
              Six Principles for an AI-native watch face
            </h2>
          </div>

          <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1fr)_520px] lg:gap-20">
            <div className="order-1 lg:order-2">
              <PrincipleWatch label={activePrinciple.title} accent={activePrinciple.accent} />
            </div>

            <div className="order-2 grid lg:order-1">
              {principles.map((principle, index) => {
                const isActive = principleIndex === index;
                const chipBackground =
                  principle.title === "Intent-first"
                    ? "#FFFFFF"
                    : principle.title === "Glanceable"
                      ? "#34f5a6"
                      : principle.accent;

                return (
                  <button
                    key={principle.title}
                    onClick={() => setPrincipleIndex(index)}
                    className="group grid text-left outline-none"
                    style={{ color: isActive ? "#ffffff" : "rgba(255,255,255,0.3)" }}
                  >
                    <div
                      className="grid gap-4 border-t py-6 transition duration-500 md:grid-cols-[68px_1fr_22px] md:gap-6"
                      style={{
                        borderColor: isActive ? principle.accent : "rgba(255,255,255,0.08)",
                        boxShadow: isActive ? `0 -1px 0 ${principle.accent}44` : "none",
                      }}
                    >
                      <span
                        className="font-mono text-[13px] font-semibold tracking-[0.18em] transition duration-500"
                        style={{ color: isActive ? principle.accent : "rgba(255,255,255,0.24)" }}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <div className="grid gap-3">
                        <h3 className="text-[28px] font-normal leading-tight tracking-[-0.035em] transition duration-300 md:text-[36px]">
                          {principle.title}
                        </h3>
                        <div
                          className="overflow-hidden transition-[max-height,opacity] duration-500 ease-out"
                          style={{
                            maxHeight: isActive ? "160px" : "0px",
                            opacity: isActive ? 1 : 0,
                          }}
                        >
                          <p className="max-w-[620px] pb-2 text-[17px] leading-relaxed text-white/52 md:text-[19px]">
                            {principle.body}
                          </p>
                        </div>
                      </div>

                      <span
                        className="mt-2 hidden h-2.5 w-2.5 rounded-full transition duration-500 md:block"
                        style={{
                          backgroundColor: chipBackground,
                          opacity: isActive ? 1 : 0.18,
                          boxShadow: isActive ? `0 0 24px ${principle.accent}` : "none",
                        }}
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section id="architecture" className="relative overflow-hidden bg-[#02040a] px-5 py-24 text-white md:px-10 lg:py-32">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_42%,rgba(116,214,255,0.07),transparent_34%),radial-gradient(circle_at_28%_64%,rgba(52,245,166,0.055),transparent_30%)]" />
        <div className="relative z-10 mx-auto grid w-full max-w-[1280px] items-start gap-14 xl:grid-cols-[minmax(340px,0.35fr)_minmax(0,0.65fr)] xl:gap-14">
          <div className="grid gap-10">
            <div className="grid gap-6">
              <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.34em] text-white/25">
                Architecture
              </p>
              <div className="grid gap-5">
                <h2 className="text-[44px] font-normal leading-[0.98] tracking-[-0.055em] text-white md:text-[64px]">
                  Intent-first AI Pipeline
                </h2>
                <p className="max-w-none text-[17px] leading-relaxed text-white/46 md:text-[19px]">
                  Behind every interaction is a lightweight, intent-first pipeline that reasons before it responds.
                </p>
              </div>
            </div>

            <div className="grid">
              {architectureStages.map((stage, index) => {
                const isActive = activeArchitectureIndex === index;

                return (
                <article
                  key={stage.number}
                  data-architecture-stage
                  role="button"
                  tabIndex={0}
                  onMouseEnter={() => setActiveArchitectureIndex(index)}
                  onFocus={() => setActiveArchitectureIndex(index)}
                  onClick={() => setActiveArchitectureIndex(index)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      setActiveArchitectureIndex(index);
                    }
                  }}
                  className="grid cursor-pointer gap-4 border-t py-6 outline-none transition duration-500 md:grid-cols-[58px_1fr] md:gap-5"
                  style={{
                    borderColor: isActive ? `rgba(${stage.accent},0.34)` : "rgba(255,255,255,0.08)",
                    opacity: isActive ? 1 : 0.52,
                  }}
                >
                  <p
                    className="font-mono text-[12px] font-semibold tracking-[0.18em] transition duration-500"
                    style={{ color: isActive ? `rgb(${stage.accent})` : "#34f5a6" }}
                  >
                    {stage.number}
                  </p>
                  <div className="grid gap-2">
                    <h3 className="text-[24px] font-normal leading-tight tracking-[-0.03em] text-white transition duration-500 md:text-[28px]">
                      {stage.title}
                    </h3>
                    <p className="text-[16px] leading-relaxed text-white/44 transition duration-500 md:text-[17px]">
                      {stage.body}
                    </p>
                  </div>
                </article>
                );
              })}
            </div>

            <p className="max-w-none border-t border-white/[0.08] pt-7 text-[19px] font-medium leading-relaxed tracking-[-0.02em] text-white/68 md:text-[22px]">
              Complexity stays in the system. Only the next relevant action reaches the wrist.
            </p>
          </div>

          <div className="relative w-full max-w-[620px] justify-self-start overflow-hidden border-y border-white/[0.08] py-4 xl:mt-[303px] xl:max-w-none xl:justify-self-stretch">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(116,214,255,0.10),transparent_48%)]" />
            <div className="relative aspect-[8924/7714] w-full overflow-hidden bg-white">
              <Image
                src="/projects/generative-watch-face/architecture/ifs-pipeline.jpg"
                alt="IFS Pipeline overview"
                fill
                sizes="(max-width: 1023px) calc(100vw - 40px), 65vw"
                className="object-contain brightness-[0.78] transition duration-700"
              />
              {architectureStages.map((stage, index) => {
                const isActive = activeArchitectureIndex === index;

                return (
                  <div
                    key={stage.number}
                    className="pointer-events-none absolute rounded-[18px] transition duration-700"
                    style={{
                      ...stage.highlight,
                      opacity: isActive ? 1 : 0,
                      backgroundColor: `rgba(${stage.accent},0.18)`,
                      border: `1px solid rgba(${stage.accent},0.42)`,
                      boxShadow: `0 0 36px rgba(${stage.accent},0.22), inset 0 0 22px rgba(${stage.accent},0.10)`,
                    }}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section id="workflow" className="relative overflow-hidden bg-[#02040a] px-5 py-20 text-white md:px-10 lg:py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_28%_38%,rgba(52,245,166,0.08),transparent_30%),radial-gradient(circle_at_78%_62%,rgba(116,214,255,0.06),transparent_34%)]" />
        <div className="relative z-10 mx-auto grid w-full max-w-[1280px] gap-5">
          <div className="grid max-w-[1040px] gap-2">
            <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.34em] text-white/25">
              Workflow
            </p>
            <h2 className="text-[38px] font-normal leading-[0.98] tracking-[-0.055em] text-white md:text-[64px] lg:text-[82px]">
              From intent to action.
            </h2>
          </div>
          <WorkflowLoopAnimation />
        </div>
      </section>

      <section id="ujp" className="relative overflow-hidden bg-[#02040a] px-5 py-24 text-white md:px-10 lg:py-32">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_52%,rgba(52,245,166,0.08),transparent_34%),radial-gradient(circle_at_72%_48%,rgba(155,124,255,0.06),transparent_32%)]" />
        <div className="relative z-10 mx-auto grid w-full max-w-[1280px] gap-16">
          <div className="grid max-w-[900px] gap-6">
            <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.34em] text-white/25">
              Critical User Journey
            </p>
            <h2 className="text-[48px] font-normal leading-[0.98] tracking-[-0.055em] text-white md:text-[72px] lg:text-[82px]">
              A day in orbit.
            </h2>
          </div>

          <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1fr)_560px] lg:gap-20">
            <DayOrbit activeJourney={activeJourney} journeyIndex={journeyIndex} onSelect={setJourneyIndex} />
            <JourneyDetail activeJourney={activeJourney} />
          </div>

          <div className="grid gap-5 lg:hidden">
            {journey.map((item, index) => (
              <button
                key={item.time}
                type="button"
                onClick={() => setJourneyIndex(index)}
                className="grid border-t border-white/[0.06] py-5 text-left"
              >
                <p className="font-mono text-[12px] font-semibold tracking-[0.18em]" style={{ color: item.accent }}>
                  {item.time}
                </p>
                <h3 className="mt-2 text-[30px] font-normal tracking-[-0.04em] text-white">{item.title}</h3>
                <p className="mt-3 text-[17px] leading-relaxed text-white/50">{item.copy}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section id="iteration" className="relative overflow-hidden bg-[#02040a] px-5 py-28 text-white md:px-10 lg:py-36">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_28%,rgba(52,245,166,0.06),transparent_34%),radial-gradient(circle_at_76%_64%,rgba(246,196,95,0.05),transparent_28%)]" />
        <div className="relative z-10 mx-auto grid w-full max-w-[1280px] gap-14">
          <div className="grid gap-5">
            <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.34em] text-white/25">
              Design Iteration
            </p>
            <h2 className="text-[48px] font-normal leading-[1.04] tracking-[-0.055em] text-white md:text-[72px]">
              Key iterations toward a watch-native experience
            </h2>
          </div>

          <div className="grid gap-4">
            {challenges.map((challenge, index) => {
              const isOpen = activeChallengeIndex === index;

              return (
                <article
                  key={challenge.title}
                  className="overflow-hidden rounded-[24px] border transition-all duration-500"
                  style={{
                    borderColor: isOpen ? `${challenge.accent}32` : "rgba(255,255,255,0.075)",
                    background: isOpen
                      ? `radial-gradient(circle at 50% 18%, ${challenge.accent}10, transparent 44%), rgba(2,4,10,0.82)`
                      : "rgba(2,4,10,0.42)",
                  }}
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`lab-panel-${index}`}
                    onClick={() => setActiveChallengeIndex(isOpen ? null : index)}
                    className="grid w-full grid-cols-[50px_1fr_auto] items-center gap-5 px-6 py-7 text-left md:grid-cols-[72px_1fr_auto] md:px-8 md:py-8"
                  >
                    <span
                      className="font-mono text-[32px] font-medium leading-none md:text-[38px]"
                      style={{ color: challenge.accent }}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="grid gap-2">
                      <span className="text-[22px] font-medium leading-tight tracking-[-0.025em] text-white md:text-[24px]">
                        {challenge.title}
                      </span>
                      <span className="text-[16px] leading-tight text-white/32 md:text-[17px]">
                        {challenge.subtitle}
                      </span>
                    </span>
                    <ChevronDown
                      className={`h-5 w-5 text-white/28 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                      strokeWidth={1.8}
                    />
                  </button>

                  <div
                    id={`lab-panel-${index}`}
                    className={`grid transition-[grid-template-rows,opacity] duration-500 ease-out ${
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="mx-6 border-t border-white/[0.08] pb-8 pt-10 md:mx-8 md:pb-10 lg:pt-12">
                        <div className="relative grid gap-8 lg:grid-cols-3 lg:gap-y-12">
                          <p className="absolute left-[33.333%] top-[116px] hidden -translate-x-1/2 text-center text-[38px] font-light text-white/14 lg:block">
                            &rarr;
                          </p>
                          <div className="grid gap-12 lg:contents">
                            <div className="lg:col-start-1 lg:row-start-1">
                              <LabWatchMockup
                                mode="before"
                                accent={challenge.accent}
                                imageSrc={challenge.images.before}
                                imageAlt={`${challenge.title} before watch UI`}
                              />
                            </div>
                            <div className="lg:col-start-1 lg:row-start-2">
                              <LabInsightBlock
                                label="Challenge"
                                body={challenge.challenge}
                                accent={challenge.accent}
                                tone="danger"
                              />
                            </div>
                          </div>
                          <div className="grid gap-12 lg:contents">
                            <div className="lg:col-start-2 lg:row-start-1">
                              <LabWatchMockup
                                mode="after"
                                accent={challenge.accent}
                                imageSrc={challenge.images.after1}
                                imageAlt={`${challenge.title} after watch UI 1`}
                              />
                            </div>
                            <div className="lg:col-start-2 lg:row-start-2">
                              <LabInsightBlock label="Decision" body={challenge.decision} accent={challenge.accent} />
                            </div>
                          </div>
                          <div className="grid gap-12 lg:contents">
                            <div className="lg:col-start-3 lg:row-start-1">
                              <LabWatchMockup
                                mode="after"
                                accent={challenge.accent}
                                imageSrc={challenge.images.after2}
                                imageAlt={`${challenge.title} after watch UI 2`}
                                showLabel={false}
                              />
                            </div>
                            <div className="lg:col-start-3 lg:row-start-2">
                              <LabInsightBlock
                                label="Impact"
                                body={challenge.impact}
                                accent={challenge.accent}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="impact" className="relative grid min-h-screen place-items-center overflow-hidden bg-[#02040a] px-5 py-28 text-white md:px-10 lg:py-36">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_12%,rgba(52,245,166,0.10),transparent_28%),radial-gradient(circle_at_74%_38%,rgba(155,124,255,0.07),transparent_30%),radial-gradient(circle_at_50%_78%,rgba(52,245,166,0.10),transparent_26%)]" />
        <div className="relative z-10 mx-auto grid w-full max-w-[1280px] gap-20">
          <div className="grid justify-items-center gap-5 text-center">
            <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.34em] text-white/28">Impact</p>
            <h2 className="text-[48px] font-normal leading-[0.98] tracking-[-0.055em] text-white md:text-[72px] lg:text-[82px]">
              What it moved.
            </h2>
          </div>

          <div className="grid gap-12 md:grid-cols-3 md:gap-14 lg:gap-20">
            {[
              {
                title: "Internal buy-in",
                label: "China HMI HQ + ERI",
                body: "The prototype was presented at Huawei's internal HMI review. Both the China HQ team and the European Research Institute backed the direction for further development.",
                accent: "#34f5a6",
              },
              {
                title: "Additional budget",
                label: "Project scope extended",
                body: "Following the internal review, Body Clock received additional project funding - a direct signal that the watch-as-intelligent-surface strategy had organisational backing.",
                accent: "#9b7cff",
              },
              {
                title: "AI / ML headcount",
                label: "IFS model training",
                body: "Additional AI and ML engineers were onboarded specifically to train the Intent Flow System model on real user interaction data gathered from the prototype.",
                accent: "#f6c45f",
              },
            ].map((item) => (
              <article key={item.title} className="grid content-start gap-7 border-t pt-8" style={{ borderColor: `${item.accent}38` }}>
                <div className="grid gap-3">
                  <h3 className="text-[28px] font-normal tracking-[-0.035em] text-white md:text-[34px]">
                    {item.title}
                  </h3>
                  <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.12em]" style={{ color: item.accent }}>
                    {item.label}
                  </p>
                </div>
                <p className="max-w-[390px] text-[17px] leading-relaxed text-white/48 md:text-[18px]">
                  {item.body}
                </p>
              </article>
            ))}
          </div>

          <div className="mx-auto grid w-full max-w-[860px] gap-8 text-[17px] leading-relaxed text-white/52 md:text-[19px]">
            <p>
              The project secured buy-in from the <strong className="font-semibold text-white/86">President of Huawei&apos;s Smart Wearables division</strong>.
            </p>
            <p>
              The work moved from concept exploration to productisation. It gave the wearables business a credible direction for AI-native product differentiation.
            </p>
            <p>
              It showed how Huawei could make the watch a first-class intelligent surface rather than a companion device.
            </p>
            <p>
              The Generative Watch was not about adding AI to a watch. It was about asking what a watch <em>becomes</em> when intelligence is native to the surface. The smallest screen became the best place to test the biggest idea: a product that understands intent before it chooses interface.
            </p>
            <p>
              The watch was no longer a remote control for the phone. It became a <strong className="font-semibold text-white/86">local, private and intent-aware layer on the body</strong>.
            </p>
          </div>

          <div className="mx-auto grid justify-items-center gap-16">
            <div className="relative aspect-square w-32 rounded-full border border-emerald-300/25 bg-[#050715] shadow-[0_0_96px_rgba(52,245,166,0.26),inset_0_0_34px_rgba(155,124,255,0.16)]">
              <div className="absolute inset-3 rounded-full border border-violet-300/25" />
              <div className="absolute inset-6 rounded-full border border-emerald-300/35 border-dashed" />
              {Array.from({ length: 18 }).map((_, index) => (
                <span
                  key={index}
                  className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-300/80"
                  style={{ transform: `rotate(${index * 20}deg) translateY(-48px)` }}
                />
              ))}
              <span className="absolute left-1/2 top-6 h-3 w-3 -translate-x-1/2 rounded-full bg-emerald-300 shadow-[0_0_18px_rgba(52,245,166,0.9)]" />
              <div className="absolute inset-0 grid place-items-center text-center">
                <div>
                  <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-white/28">Intent</p>
                  <p className="text-[17px] font-semibold leading-none text-emerald-300">Active</p>
                </div>
              </div>
            </div>

            <div className="grid w-[min(76vw,720px)] grid-cols-[1fr_auto_1fr] items-center gap-6">
              <span className="h-px bg-gradient-to-r from-transparent via-white/14 to-white/24" />
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.32em] text-white/24">
                Body Clock - Huawei Watch - HarmonyOS
              </p>
              <span className="h-px bg-gradient-to-l from-transparent via-white/14 to-white/24" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
