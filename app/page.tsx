"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Flame, Check, Lock, Sparkles } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { UNITS, type Lesson, type Unit } from "@/lib/lessons";

// Horizontal offsets (in px) that create the zig-zagging path.
// Pattern repeats every 4 nodes: center → right → center → left.
const X_OFFSET_PATTERN = [0, 64, 0, -64];

function LessonNode({
  lesson,
  offset,
  onSelect,
}: {
  lesson: Lesson;
  offset: number;
  onSelect: (lesson: Lesson) => void;
}) {
  const Icon = lesson.icon;
  const isCompleted = lesson.status === "completed";
  const isActive = lesson.status === "active";
  const isLocked = lesson.status === "locked";

  return (
    <div
      className="relative flex flex-col items-center"
      style={{ transform: `translateX(${offset}px)` }}
    >
      {isActive && (
        <span className="absolute inset-0 -z-10 flex items-center justify-center">
          <span className="h-24 w-24 animate-ping rounded-full bg-violet-500/30" />
        </span>
      )}

      <button
        type="button"
        disabled={isLocked}
        onClick={() => onSelect(lesson)}
        aria-label={`${lesson.title}${isLocked ? " (locked)" : ""}`}
        className={[
          "group relative flex h-20 w-20 items-center justify-center rounded-full border-4 transition-all duration-200 sm:h-24 sm:w-24",
          isCompleted &&
            "border-emerald-600 bg-emerald-500 shadow-[0_6px_0_0_rgb(4,120,87)] hover:brightness-105 active:translate-y-1 active:shadow-[0_2px_0_0_rgb(4,120,87)]",
          isActive &&
            "border-violet-700 bg-violet-500 shadow-[0_6px_0_0_rgb(91,33,182)] hover:brightness-105 active:translate-y-1 active:shadow-[0_2px_0_0_rgb(91,33,182)]",
          isLocked &&
            "cursor-not-allowed border-slate-300 bg-slate-200 shadow-[0_6px_0_0_rgb(203,213,225)]",
        ].join(" ")}
      >
        {isActive && (
          <span
            className="absolute inset-1 rounded-full opacity-90"
            style={{
              background:
                "conic-gradient(from 0deg, rgba(255,255,255,0.35) 0 10deg, transparent 10deg 80deg, rgba(255,255,255,0.35) 80deg 90deg, transparent 90deg 170deg, rgba(255,255,255,0.35) 170deg 180deg, transparent 180deg 260deg, rgba(255,255,255,0.35) 260deg 270deg, transparent 270deg 350deg, rgba(255,255,255,0.35) 350deg 360deg)",
            }}
          />
        )}

        {isCompleted && <Check className="h-8 w-8 text-white" strokeWidth={3} />}
        {isActive && <Icon className="h-8 w-8 text-white" strokeWidth={2.5} />}
        {isLocked && <Lock className="h-6 w-6 text-slate-400" strokeWidth={2.5} />}

        {isActive && (
          <Sparkles className="absolute -right-1 -top-1 h-5 w-5 text-orange-400 drop-shadow" />
        )}
      </button>

      <div className="mt-3 flex max-w-[9rem] flex-col items-center text-center">
        <span
          className={[
            "font-[family-name:var(--font-display)] text-sm font-semibold leading-tight",
            isLocked ? "text-slate-400" : "text-[#1E1B2E]",
          ].join(" ")}
        >
          {lesson.title}
        </span>
        <span
          className={[
            "mt-0.5 text-xs",
            isLocked ? "text-slate-300" : "text-violet-500/80",
          ].join(" ")}
        >
          {lesson.devanagari}
        </span>
      </div>
    </div>
  );
}

function UnitBanner({ unit }: { unit: Unit }) {
  if (unit.status === "locked") {
    return (
      <div className="mb-10 flex items-center justify-between rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 px-5 py-4 text-slate-500">
        <div className="flex items-center gap-3">
          <Lock className="h-5 w-5 shrink-0 text-slate-400" />
          <div>
            <p className="font-[family-name:var(--font-display)] text-base font-bold text-slate-500">
              {unit.title}
            </p>
            <p className="text-sm text-slate-400">{unit.subtitle}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-10 flex items-center justify-between rounded-2xl bg-violet-600 px-5 py-4 text-white shadow-[0_4px_0_0_rgb(91,33,182)]">
      <div>
        <p className="font-[family-name:var(--font-display)] text-lg font-bold">{unit.title}</p>
        <p className="text-sm text-violet-100">{unit.subtitle}</p>
      </div>
      <Button size="sm" className="bg-white text-violet-700 hover:bg-violet-50">
        Guidebook
      </Button>
    </div>
  );
}

function TopNav({ streak }: { streak: number }) {
  return (
    <header className="sticky top-0 z-20 border-b border-violet-100 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-md items-center justify-between px-4 py-3 sm:max-w-lg">
        <div className="flex items-center gap-1.5">
          <span className="font-[family-name:var(--font-display)] text-xl font-extrabold text-violet-600">
            Hindi<span className="text-orange-500">Quest</span>
          </span>
        </div>

        <div className="flex items-center gap-1 rounded-full bg-orange-50 px-3 py-1.5">
          <Flame className="h-5 w-5 fill-orange-400 text-orange-500" />
          <span className="font-[family-name:var(--font-display)] text-sm font-bold text-orange-600">
            {streak}
          </span>
        </div>

        <Avatar className="h-9 w-9 border-2 border-violet-200">
          <AvatarImage src="https://github.com/shadcn.png" alt="Your profile" />
          <AvatarFallback className="bg-violet-500 text-xs font-semibold text-white">
            YOU
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}

export default function Dashboard() {
  const router = useRouter();
  const streak = 5;

  let globalIndex = -1;

  const handleSelectLesson = (lesson: Lesson) => {
    if (lesson.status === "locked") return;
    router.push(`/lesson/${lesson.id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 via-white to-white font-[family-name:var(--font-body)]">
      <TopNav streak={streak} />

      <main className="mx-auto max-w-md px-4 pb-24 pt-8 sm:max-w-lg">
        {UNITS.map((unit) => (
          <section key={unit.id} className="mb-2">
            <UnitBanner unit={unit} />

            <div className="relative flex flex-col items-center gap-10">
              <div className="pointer-events-none absolute inset-y-0 left-1/2 w-0.5 -translate-x-1/2 border-l-2 border-dashed border-violet-200" />

              {unit.lessons.map((lesson) => {
                globalIndex += 1;
                return (
                  <LessonNode
                    key={lesson.id}
                    lesson={lesson}
                    offset={X_OFFSET_PATTERN[globalIndex % X_OFFSET_PATTERN.length]}
                    onSelect={handleSelectLesson}
                  />
                );
              })}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}
