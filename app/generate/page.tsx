"use client";

import { useMemo, useState } from "react";

/* ================= TYPES ================= */

type Difficulty = "Support" | "Core" | "Challenge";

type GenResult = {
  support: string;
  core: string;
  challenge: string;
};

/* ================= UTILS ================= */

function cx(...classes: Array<string | false | undefined | null>) {
  return classes.filter(Boolean).join(" ");
}

/* ================= PAGE ================= */

export default function GeneratePage() {
  const [topic, setTopic] = useState("");
  const [yearGroup, setYearGroup] = useState("10");

  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<GenResult | null>(null);

  const [error, setError] = useState<string | null>(null);
  const [isLocked, setIsLocked] = useState(false);

  // Feedback
  const [studentAnswer, setStudentAnswer] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isFeedbackGenerating, setIsFeedbackGenerating] = useState(false);

  const canGenerate = useMemo(() => topic.trim().length >= 8, [topic]);
  const canGenerateFeedback = useMemo(
    () => studentAnswer.trim().length >= 20,
    [studentAnswer]
  );

  /* ================= API CALL ================= */

  const handleGenerate = async () => {
    setError(null);
    setIsGenerating(true);
    setResult(null);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, yearGroup }),
      });

      if (res.status === 403) {
        const data = await res.json();
        setIsLocked(true);
        setError(data.error);
        return;
      }

      if (!res.ok) {
        throw new Error("Generation failed");
      }

      const data = await res.json();

      setResult({
        support: data.tasks.match(/SUPPORT:([\s\S]*?)CORE:/)?.[1]?.trim() ?? "",
        core: data.tasks.match(/CORE:([\s\S]*?)CHALLENGE:/)?.[1]?.trim() ?? "",
        challenge: data.tasks.match(/CHALLENGE:([\s\S]*)/)?.[1]?.trim() ?? "",
      });
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  /* ================= COPY ================= */

  const copyText = async (text: string) => {
    await navigator.clipboard.writeText(text);
    alert("Copied!");
  };

  const copyAllTasks = async () => {
    if (!result) return;
    await copyText(
      `SUPPORT\n\n${result.support}\n\n---\n\nCORE\n\n${result.core}\n\n---\n\nCHALLENGE\n\n${result.challenge}`
    );
  };

  /* ================= RENDER ================= */

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <div className="mx-auto max-w-5xl px-6 py-10 flex flex-col gap-10">

        {/* Header */}
        <div>
          <a href="/" className="text-sm text-blue-600 hover:underline">
            ← Back to home
          </a>
          <h1 className="text-3xl font-bold mt-2">Generate</h1>
          <p className="text-zinc-600 dark:text-zinc-300">
            Create differentiated GCSE English tasks instantly.
          </p>
        </div>

        {/* Generator */}
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border flex flex-col gap-6">

          <textarea
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            rows={3}
            placeholder='e.g. "How does Shakespeare present ambition?"'
            className="w-full rounded-xl border px-4 py-3"
          />

          <div className="flex gap-4 flex-wrap">
            <select
              value={yearGroup}
              onChange={(e) => setYearGroup(e.target.value)}
              className="rounded-xl border px-4 py-3"
            >
              {["7", "8", "9", "10", "11"].map((y) => (
                <option key={y} value={y}>
                  Year {y}
                </option>
              ))}
            </select>

            <button
              onClick={handleGenerate}
              disabled={!canGenerate || isGenerating}
              className={cx(
                "rounded-xl px-6 py-3 font-semibold",
                canGenerate && !isGenerating
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-zinc-200 text-zinc-500 cursor-not-allowed"
              )}
            >
              {isGenerating ? "Generating…" : "Generate tasks"}
            </button>
          </div>

          {error && <p className="text-red-600">{error}</p>}

          {isLocked && (
            <div className="rounded-xl border bg-blue-50 p-6 text-center">
              <h3 className="text-xl font-bold">🔒 Free preview used</h3>
              <p className="mt-2">
                Join early access to unlock unlimited generation.
              </p>
              <a
                href="/#waitlist"
                className="inline-block mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg"
              >
                Join Early Access
              </a>
            </div>
          )}

          {result && (
            <>
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Differentiated tasks</h2>
                <button
                  onClick={copyAllTasks}
                  className="border px-4 py-2 rounded-lg"
                >
                  Copy all
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <TaskCard title="Support" text={result.support} />
                <TaskCard title="Core" text={result.core} />
                <TaskCard title="Challenge" text={result.challenge} />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* ================= CARD ================= */

function TaskCard({
  title,
  text,
}: {
  title: Difficulty;
  text: string;
}) {
  return (
    <div className="rounded-xl border p-4 bg-zinc-50 dark:bg-black">
      <h3 className="font-bold mb-2">{title}</h3>
      <pre className="whitespace-pre-wrap text-sm">{text}</pre>
    </div>
  );
}
