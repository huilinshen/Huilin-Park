"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  ChevronDown,
  Route,
  Sparkles,
  Workflow,
} from "lucide-react";

const chapters = [
  ["Brief", "brief"],
  ["Principles", "principles"],
  ["Workflow", "workflow"],
  ["Day Orbit", "journey"],
  ["Lab", "lab"],
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

const challenges = [
  {
    title: "AI Understanding",
    subtitle: "Transcription of intent",
    accent: "#10d985",
    afterState: "Active",
    problem: "Users could not tell when or why the AI was acting on their behalf. The watch felt invasive - actions happened without consent or explanation.",
    failed: "Showing a spinning 'AI thinking' indicator. Users found it anxiety-inducing and opaque. They had no idea what the AI was doing or whether to trust it.",
    move: "A persistent intent ring: a visible glyph at the edge of the face that shows the AI's active goal, always colour-coded by priority. State is never hidden.",
    result: "Users felt 'in dialogue' with the watch rather than being acted upon without consent. Trust scores improved significantly across usability sessions.",
    proved: "Legibility of AI state is as important as AI capability itself. An invisible AI is an untrustworthy AI.",
  },
  {
    title: "Home Page",
    subtitle: "The face that changes everything",
    accent: "#7c4dff",
    afterState: "context",
    problem: "The default watch face was a static analog clock. It communicated nothing about context, intent, or the user's situation - a wasted surface.",
    failed: "A modular widget system letting users manually arrange tiles. Cognitive load was far too high for a sub-3-second wrist interaction.",
    move: "A single adaptive face that automatically surfaces the most relevant signal based on time of day, location, activity, and biometrics.",
    result: "Time-to-information reduced from 4.2s to 1.8s across usability sessions. Glanceability scores improved by 61%.",
    proved: "Adaptation beats configurability for time-critical, wrist-based contexts. Let the AI choose, let the user override.",
  },
  {
    title: "Task Management",
    subtitle: "Fitting a list on a wrist",
    accent: "#c47a12",
    afterState: "Active",
    problem: "Tasks from the phone AI assistant appeared as a scrollable flat list. Completely unusable in under 3 seconds - the core wrist constraint.",
    failed: "A vertically scrollable task list ported from the phone UI. Testers could not locate the right task before their wrist dropped. Zero scroll tolerance.",
    move: "A priority orbit: the single most relevant task is always centre-stage, others orbit as glanceable chips. No scrolling - ever.",
    result: "Zero scroll needed. 94% of target tasks accessible within one interaction. Wrist-raise-to-task time dropped to under 1.5s.",
    proved: "The watch needs its own information architecture. A phone UI reduced in size is not a watch UI.",
  },
  {
    title: "Sub-task Hierarchy",
    subtitle: "One thing at a time",
    accent: "#b3622c",
    afterState: "Peak",
    problem: "Complex intents like 'prepare for my 10am presentation' decomposed into 8+ sub-tasks, overwhelming the 42mm screen with nested hierarchy.",
    failed: "Showing all sub-tasks simultaneously in a tree. The watch face became completely unreadable. Users abandoned the task mid-flow.",
    move: "Progressive disclosure: the parent goal is always visible. Sub-tasks surface one at a time as each step is completed - temporal not spatial hierarchy.",
    result: "Completion rate for multi-step tasks improved from 34% to 71% across prototype testing sessions.",
    proved: "The wrist is a single-task surface. Hierarchy must be expressed through time, not through space.",
  },
];

function LabWatchMockup({
  mode,
  index,
  accent,
  afterState,
}: {
  mode: "before" | "after";
  index: number;
  accent: string;
  afterState: string;
}) {
  const isAfter = mode === "after";
  const beforeContent = [
    <div key="analog" className="absolute inset-0">
      {Array.from({ length: 12 }).map((_, tickIndex) => (
        <span
          key={tickIndex}
          className="absolute left-1/2 top-1/2 h-4 w-0.5 origin-[0_0] rounded-full bg-emerald-300/45"
          style={{ transform: `rotate(${tickIndex * 30}deg) translateY(-92px)` }}
        />
      ))}
      <span className="absolute left-1/2 top-1/2 h-0.5 w-[32%] origin-left -translate-y-1/2 rotate-[12deg] bg-white/35" />
      <span className="absolute left-1/2 top-1/2 h-0.5 w-[38%] origin-left -translate-y-1/2 rotate-[106deg] bg-emerald-300/65" />
      <span className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-300/70" />
      <p className="absolute bottom-14 left-0 right-0 text-center font-mono text-[27px] font-semibold tracking-[0.16em] text-white/50">
        09:18
      </p>
    </div>,
    <div key="tiles" className="absolute inset-12 grid grid-cols-2 place-items-center gap-px text-center font-mono text-white/22">
      {["12:45\nTIME", "72\nBPM", "4.2k\nSTEPS", "18\nTEMP"].map((item) => (
        <span key={item} className="grid h-full w-full place-items-center border border-white/[0.04] text-[18px] whitespace-pre-line">
          {item}
        </span>
      ))}
      <p className="absolute left-0 right-0 top-4 text-center text-[9px] uppercase tracking-[0.28em] text-white/18">
        drag to configure
      </p>
    </div>,
    <div key="tasks" className="absolute inset-x-12 top-12 grid gap-4 font-mono text-[14px] text-white/25">
      <p className="text-center text-[11px] uppercase tracking-[0.22em] text-emerald-300/45">Tasks</p>
      {["Book Uber", "Call dentist", "Review slides", "Buy groceries", "Reply to Jan"].map((item, taskIndex) => (
        <div key={item} className="flex items-center gap-3 border-b border-white/[0.04] pb-2">
          <span className={`h-3 w-3 rounded-full border ${taskIndex === 0 ? "border-emerald-300/50" : "border-white/16"}`} />
          <span className={taskIndex === 0 ? "line-through opacity-35" : ""}>{item}</span>
        </div>
      ))}
    </div>,
    <div key="subtasks" className="absolute inset-x-12 top-10 grid gap-4 font-mono text-[13px] text-white/25">
      <p className="text-[15px] text-white/35">Prep: 10am pres.</p>
      <div className="h-px bg-white/[0.05]" />
      {["Check slides", "-> Review deck", "--> Update chart", "--> Fix typos", "Call venue", "-> Confirm AV", "Print agenda"].map((item) => (
        <p key={item}>{item}</p>
      ))}
    </div>,
  ];

  return (
    <div className="grid justify-items-center gap-6">
      <p
        className="font-mono text-[11px] font-semibold uppercase tracking-[0.34em]"
        style={{ color: isAfter ? accent : "#ef6464" }}
      >
        {mode}
      </p>
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
        <div className="absolute inset-2 rounded-full border border-indigo-300/10" />
        {isAfter ? (
          <div className="absolute inset-0 grid place-items-center">
            {Array.from({ length: index === 3 ? 18 : 5 }).map((_, ringIndex) => (
              <span
                key={ringIndex}
                className="absolute rounded-full border"
                style={{
                  inset: `${18 + ringIndex * (index === 3 ? 8 : 18)}px`,
                  borderColor: `${ringIndex % 2 === 0 ? accent : "#7c4dff"}${index === 3 ? "66" : "44"}`,
                  borderStyle: index === 0 || index === 2 ? "dashed" : "solid",
                }}
              />
            ))}
            {Array.from({ length: index === 3 ? 18 : 8 }).map((_, dotIndex) => (
              <span
                key={dotIndex}
                className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{
                  backgroundColor: dotIndex === 0 ? "#34f5a6" : accent,
                  transform: `rotate(${dotIndex * (index === 3 ? 20 : 45)}deg) translateY(-78px)`,
                  opacity: dotIndex === 0 ? 1 : 0.74,
                }}
              />
            ))}
            <div className="relative z-10 text-center">
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/28">
                {index === 3 ? "Energy" : index === 1 ? "Adapting" : "Intent"}
              </p>
              <p className="mt-1 text-[26px] font-semibold leading-none" style={{ color: accent }}>
                {afterState}
              </p>
            </div>
          </div>
        ) : (
          beforeContent[index]
        )}
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
  const steps = [
    {
      title: "Intent",
      label: "Natural request",
      body: "Get me to my next meeting with Uber.",
      accent: "#34f5a6",
      Icon: Sparkles,
    },
    {
      title: "Goal",
      label: "AI interprets outcome",
      body: "Arrive on time with the least cognitive load.",
      accent: "#9b7cff",
      Icon: Route,
    },
    {
      title: "Task",
      label: "Watch-sized actions",
      body: "Calendar, route, Uber booking and ETA monitoring.",
      accent: "#f6c45f",
      Icon: Workflow,
    },
  ];

  return (
    <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1fr)_520px] lg:gap-20">
      <div className="grid">
        {steps.map(({ title, label, body, accent, Icon }, index) => (
          <div
            key={title}
            className="workflow-loop-step grid gap-4 border-t py-7 transition duration-500 md:grid-cols-[68px_1fr]"
            style={{ animationDelay: `${index * 3}s`, ["--active-color" as string]: accent }}
          >
            <span className="font-mono text-[13px] font-semibold tracking-[0.18em]" style={{ color: accent }}>
              {String(index + 1).padStart(2, "0")}
            </span>
            <div className="grid gap-3">
              <div className="flex items-center gap-4">
                <Icon size={24} strokeWidth={1.35} style={{ color: accent }} />
                <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.24em] text-white/28">
                  {label}
                </p>
              </div>
              <h3 className="text-[30px] font-normal leading-tight tracking-[-0.04em] text-white md:text-[42px]">
                {title}
              </h3>
              <p className="max-w-[620px] text-[17px] leading-relaxed text-white/52 md:text-[19px]">
                {body}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="relative mx-auto aspect-square w-full max-w-[420px]">
        <div className="workflow-loop-glow absolute inset-[-22%] rounded-full blur-3xl" />
        <div className="absolute inset-0 rounded-full border border-white/10 bg-[#050715] shadow-[inset_0_0_54px_rgba(255,255,255,0.04)]">
          <div className="absolute inset-8 rounded-full border border-emerald-300/20" />
          <div className="absolute inset-20 rounded-full border border-violet-300/20" />
          <div className="absolute inset-32 rounded-full border border-amber-300/20" />
          <div className="workflow-loop-hand absolute left-1/2 top-1/2 h-1 w-[34%] origin-left -translate-y-1/2 rounded-full bg-emerald-300 shadow-[0_0_22px_rgba(52,245,166,0.75)]" />
          <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_22px_rgba(255,255,255,0.8)]" />
          <p className="workflow-loop-watch-label absolute inset-x-0 bottom-[27%] text-center font-mono text-[24px] font-semibold tracking-[0.18em] text-white/80">
            INTENT
          </p>
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
        {Array.from({ length: 24 }).map((_, index) => {
          const angle = (index * 15 - 90) * (Math.PI / 180);
          const inner = index % 6 === 0 ? 40.5 : 42.2;
          const outer = 43.8;
          const x1 = 50 + Math.cos(angle) * inner;
          const y1 = 50 + Math.sin(angle) * inner;
          const x2 = 50 + Math.cos(angle) * outer;
          const y2 = 50 + Math.sin(angle) * outer;
          return (
            <line
              key={index}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={index % 6 === 0 ? "rgba(246,196,95,0.62)" : "rgba(255,255,255,0.12)"}
              strokeWidth={index % 6 === 0 ? "0.55" : "0.25"}
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
        const hour = Number(item.time.split(":")[0]);
        const angle = (hour * 15 - 90) * (Math.PI / 180);
        const x = 50 + Math.cos(angle) * 43;
        const y = 50 + Math.sin(angle) * 43;
        const isActive = journeyIndex === index;

        return (
          <button
            key={item.time}
            type="button"
            onClick={() => onSelect(index)}
            className="absolute grid h-10 w-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full transition duration-300"
            style={{
              left: `${x}%`,
              top: `${y}%`,
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
  const [principleIndex, setPrincipleIndex] = useState(0);
  const [journeyIndex, setJourneyIndex] = useState(2);
  const [activeChapter, setActiveChapter] = useState("brief");
  const [activeChallengeIndex, setActiveChallengeIndex] = useState<number | null>(null);
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
        @keyframes workflowLoopStep {
          0%, 30% {
            opacity: 1;
            border-color: color-mix(in srgb, var(--active-color) 75%, transparent);
            text-shadow: 0 0 24px color-mix(in srgb, var(--active-color) 32%, transparent);
          }
          37%, 100% {
            opacity: 0.34;
            border-color: rgba(255,255,255,0.08);
            text-shadow: none;
          }
        }
        @keyframes workflowLoopGlow {
          0%, 28% { background: rgba(52,245,166,0.22); }
          33%, 61% { background: rgba(155,124,255,0.22); }
          66%, 94% { background: rgba(246,196,95,0.2); }
          100% { background: rgba(52,245,166,0.22); }
        }
        @keyframes workflowLoopHand {
          0%, 28% {
            transform: translateY(-50%) rotate(-22deg);
            background: #34f5a6;
            box-shadow: 0 0 22px rgba(52,245,166,0.75);
          }
          33%, 61% {
            transform: translateY(-50%) rotate(20deg);
            background: #9b7cff;
            box-shadow: 0 0 22px rgba(155,124,255,0.75);
          }
          66%, 94% {
            transform: translateY(-50%) rotate(72deg);
            background: #f6c45f;
            box-shadow: 0 0 22px rgba(246,196,95,0.72);
          }
          100% {
            transform: translateY(-50%) rotate(-22deg);
            background: #34f5a6;
            box-shadow: 0 0 22px rgba(52,245,166,0.75);
          }
        }
        @keyframes workflowLoopDot {
          0%, 20% {
            background: rgba(255,255,255,0.9);
            box-shadow: 0 0 20px rgba(255,255,255,0.42);
            transform: scale(1.25);
          }
          28%, 100% {
            background: rgba(255,255,255,0.26);
            box-shadow: none;
            transform: scale(1);
          }
        }
        .body-clock-reveal { animation: bodyClockReveal 720ms ease-out both; }
        .body-clock-scroll { animation: bodyClockScroll 1.8s ease-in-out infinite; }
        .workflow-loop-step { animation: workflowLoopStep 9s ease-in-out infinite; }
        .workflow-loop-glow { animation: workflowLoopGlow 9s ease-in-out infinite; }
        .workflow-loop-hand { animation: workflowLoopHand 9s ease-in-out infinite; }
        .workflow-loop-dot { animation: workflowLoopDot 9s ease-in-out infinite; }
      `}</style>

      <nav className="sticky top-4 z-40 mx-auto flex w-[calc(100%-2rem)] max-w-[520px] items-center justify-center gap-1 rounded-full border border-white/10 bg-black/45 p-1 backdrop-blur-xl">
        {chapters.map(([label, id]) => (
          <a
            key={id}
            href={`#${id}`}
            className={`rounded-full px-3 py-2 font-mono text-[11px] font-semibold tracking-[0.08em] transition md:px-4 ${
              activeChapter === id
                ? "bg-emerald-400/14 text-emerald-300 shadow-[0_0_22px_rgba(16,185,129,0.12)]"
                : "text-white/38 hover:bg-emerald-400/12 hover:text-emerald-300"
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

      <section id="workflow" className="relative overflow-hidden bg-[#02040a] px-5 py-24 text-white md:px-10 lg:py-32">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_46%,rgba(52,245,166,0.08),transparent_28%)]" />
        <div className="relative z-10 mx-auto grid w-full max-w-[1280px] gap-16">
          <div className="grid max-w-[980px] gap-6">
            <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.34em] text-white/25">
              Workflow
            </p>
            <h2 className="whitespace-nowrap text-[38px] font-normal leading-[0.98] tracking-[-0.055em] text-white md:text-[64px] lg:text-[82px]">
              Intent becomes a goal, then tasks.
            </h2>
          </div>
          <WorkflowLoopAnimation />
        </div>
      </section>

      <section id="journey" className="relative overflow-hidden bg-[#02040a] px-5 py-24 text-white md:px-10 lg:py-32">
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

      <section id="lab" className="relative overflow-hidden bg-[#02040a] px-5 py-28 text-white md:px-10 lg:py-36">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_28%,rgba(52,245,166,0.06),transparent_34%),radial-gradient(circle_at_76%_64%,rgba(246,196,95,0.05),transparent_28%)]" />
        <div className="relative z-10 mx-auto grid w-full max-w-[1280px] gap-14">
          <div className="grid gap-5">
            <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.34em] text-white/25">
              Design Decision Lab
            </p>
            <h2 className="text-[48px] font-normal leading-[1.04] tracking-[-0.055em] text-white md:text-[72px]">
              Four failures. Four breakthroughs.
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
                        <div className="grid items-center gap-8 lg:grid-cols-[1fr_72px_1fr]">
                          <LabWatchMockup mode="before" index={index} accent={challenge.accent} afterState={challenge.afterState} />
                          <p className="hidden text-center text-[38px] font-light text-white/14 lg:block">&rarr;</p>
                          <LabWatchMockup mode="after" index={index} accent={challenge.accent} afterState={challenge.afterState} />
                        </div>

                        <div className="mt-12 grid gap-4 lg:grid-cols-2">
                          <div className="grid gap-4">
                            <LabInsightBlock label="Problem" body={challenge.problem} accent={challenge.accent} tone="danger" />
                            <LabInsightBlock label="Why it failed" body={challenge.failed} accent={challenge.accent} tone="danger" />
                          </div>
                          <div className="grid gap-4">
                            <LabInsightBlock label="Design move" body={challenge.move} accent={challenge.accent} />
                            <LabInsightBlock label="Result" body={challenge.result} accent={challenge.accent} />
                            <LabInsightBlock label="What this proved" body={challenge.proved} accent={challenge.accent} />
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
