"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { X, Heart, Check, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { getLessonById } from "@/lib/lessons";

export default function LessonPage({
  params,
}: {
  params: { lessonId: string };
}) {
  const router = useRouter();
  const lesson = getLessonById(params.lessonId);

  const [step, setStep] = React.useState(0);
  const [selected, setSelected] = React.useState<number | null>(null);
  const [checked, setChecked] = React.useState(false);
  const [hearts, setHearts] = React.useState(5);
  const [finished, setFinished] = React.useState(false);

  if (!lesson) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-white px-4 text-center">
        <p className="text-lg font-semibold text-[#1E1B2E]">
          We couldn&apos;t find that lesson.
        </p>
        <Button onClick={() => router.push("/")}>Back to dashboard</Button>
      </div>
    );
  }

  if (lesson.status === "locked" || lesson.questions.length === 0) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-white px-4 text-center">
        <p className="text-lg font-semibold text-[#1E1B2E]">
          &ldquo;{lesson.title}&rdquo; isn&apos;t unlocked yet.
        </p>
        <p className="text-sm text-slate-500">
          Finish the lessons before it on the path first.
        </p>
        <Button onClick={() => router.push("/")}>Back to dashboard</Button>
      </div>
    );
  }

  const question = lesson.questions[step];
  const progressPct = Math.round((step / lesson.questions.length) * 100);
  const isCorrect = selected === question?.correctIndex;

  function handleCheck() {
    if (selected === null) return;
    setChecked(true);
    if (selected !== question.correctIndex) {
      setHearts((h) => Math.max(0, h - 1));
    }
  }

  function handleContinue() {
    const next = step + 1;
    setChecked(false);
    setSelected(null);
    if (next >= lesson!.questions.length) {
      setFinished(true);
    } else {
      setStep(next);
    }
  }

  if (finished) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-gradient-to-b from-violet-50 via-white to-white px-4 text-center">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-emerald-500 shadow-[0_6px_0_0_rgb(4,120,87)]">
          <Check className="h-12 w-12 text-white" strokeWidth={3} />
        </div>
        <div>
          <p className="text-2xl font-extrabold text-[#1E1B2E]">Lesson complete!</p>
          <p className="mt-1 text-sm text-slate-500">
            You finished &ldquo;{lesson.title}&rdquo; with {hearts} heart{hearts === 1 ? "" : "s"} remaining.
          </p>
        </div>
        <Button
          size="lg"
          className="bg-violet-600 hover:bg-violet-700"
          onClick={() => router.push("/")}
        >
          Continue
        </Button>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <div className="flex items-center gap-4 px-4 pt-4">
        <button
          type="button"
          aria-label="Exit lesson"
          onClick={() => router.push("/")}
          className="text-slate-400 hover:text-slate-600"
        >
          <X className="h-6 w-6" />
        </button>
        <Progress value={progressPct} className="h-3 flex-1" />
        <div className="flex items-center gap-1">
          <Heart className="h-5 w-5 fill-rose-500 text-rose-500" />
          <span className="text-sm font-bold text-rose-500">{hearts}</span>
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-md flex-1 flex-col px-4 py-8 sm:max-w-lg">
        <p className="text-sm font-semibold uppercase tracking-wide text-violet-500">
          {lesson.title}
        </p>
        <h1 className="mt-2 text-2xl font-extrabold text-[#1E1B2E]">
          {question.prompt}
        </h1>
        <p className="mt-6 text-center text-5xl font-bold text-violet-600">
          {question.devanagari}
        </p>

        <div className="mt-10 grid gap-3">
          {question.options.map((option, index) => {
            const isSelected = selected === index;
            const showCorrect = checked && index === question.correctIndex;
            const showIncorrect = checked && isSelected && !isCorrect;

            return (
              <button
                key={option}
                type="button"
                disabled={checked}
                onClick={() => setSelected(index)}
                className={[
                  "rounded-xl border-2 px-4 py-3 text-left text-base font-medium transition-colors",
                  showCorrect && "border-emerald-500 bg-emerald-50 text-emerald-700",
                  showIncorrect && "border-rose-500 bg-rose-50 text-rose-700",
                  !checked && isSelected && "border-violet-500 bg-violet-50 text-violet-700",
                  !checked && !isSelected && "border-slate-200 text-[#1E1B2E] hover:border-violet-300",
                ].join(" ")}
              >
                {option}
              </button>
            );
          })}
        </div>
      </div>

      <div
        className={[
          "border-t px-4 py-4",
          checked && isCorrect && "bg-emerald-50 border-emerald-100",
          checked && !isCorrect && "bg-rose-50 border-rose-100",
          !checked && "border-slate-100",
        ].join(" ")}
      >
        <div className="mx-auto flex max-w-md items-center justify-between sm:max-w-lg">
          {checked ? (
            <p
              className={[
                "text-sm font-bold",
                isCorrect ? "text-emerald-600" : "text-rose-600",
              ].join(" ")}
            >
              {isCorrect ? "Correct!" : `Correct answer: ${question.options[question.correctIndex]}`}
            </p>
          ) : (
            <span />
          )}

          {checked ? (
            <Button
              className="bg-violet-600 hover:bg-violet-700"
              onClick={handleContinue}
            >
              Continue <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          ) : (
            <Button
              disabled={selected === null}
              className="bg-violet-600 hover:bg-violet-700 disabled:opacity-40"
              onClick={handleCheck}
            >
              Check
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
