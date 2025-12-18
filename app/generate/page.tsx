"use client";

import { useMemo, useState } from "react";

type Difficulty = "Support" | "Core" | "Challenge";

type GenResult = {
  support: string;
  core: string;
  challenge: string;
};

function cx(...classes: Array<string | false | undefined | null>) {
  return classes.filter(Boolean).join(" ");
}

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

  // ===== REAL GENERATE (API) =====
  const handleGenerate = async () => {
    setIsGenerating(true);
    setResult(null);
    setError(null);
    setIsLocked(false);

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
        setError("Something went wrong. Please try again.");
        return;
      }

      const data = await res.json();

      setResult({
        support:
          data.tasks.match(/SUPPORT:(.*)CORE:/s)?.[1]?.trim() || "",
        core:
          data.tasks.match(/CORE:(.*)CHALLENGE:/s)?.[1]?.trim() || "",
        challenge:
          data.tasks.match(/CHALLENGE:(.*)$/s)?.[1]?.trim() || "",
      });
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  // ===== MOCK FEEDBACK (UI FIRST) =====
  const generateFeedback = async () => {
    setIsFeedbackGenerating(true);
    setFeedback(null);

    await new Promise((r) => setTimeout(r, 700));

    setFeedback(
      `**WWW (What Went Well)**  
- Clear main idea  
- Evidence used  

**EBI (Even Better If)**  
- Zoom in on one key word  
- Explain *how* it affects the reader  

**Next Steps**  
1) Add another quote  
2) Use terminology  
3) End with evaluation`
    );

    setIsFeedbackGenerating(false);
  };

  const copyText = async (text: string) => {
    await navigator.clipboard.writeText(text);
    alert("Copied");
  };

  const copyAll = async () => {
    if (!result) return;
    await copyText(
      `SUPPORT\n${result.support}\n\nCORE\n${result.core}\n\nCHALLENGE\n${result.challenge}`
    );
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <div className="mx-auto max-w-5xl px-6 py-10 flex flex-col gap-10">
        {/* Header */}
        <div>
          <a href="/" className="text-sm text-blue-600 hover:underline">
            ← Back to home
          </a>
          <h1 className="text-3xl font-bold mt-2">Generate</h1>
          <p className="text-zinc-600">
            Create differentiated GCSE English tasks + feedback.
          </p>
        </div>

        {/* Generator */}
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border flex flex-col gap-6">
          <textarea
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Lesson topic / question"
            rows={3}
            className="border rounded-xl px-4 py-3"
          />

          <div className="flex gap-4">
            <select
              value={yearGroup}
              onChange={(e) => setYearGroup(e.target.value)}
              className="border rounded-xl px-4 py-3"
            >
              {["7", "8", "9", "10", "11"].map((y) => (
                <option key={y}>Year {y}</option>
              ))}
            </select>

            <button
              onClick={handleGenerate}
              disabled={!canGenerate || isGenerating}
              className={cx(
                "px-6 py-3 rounded-xl font-semibold",
                canGenerate
                  ? "bg-blue-600 text-white"
                  : "bg-zinc-300 text-zinc-500"
              )}
            >
              {isGenerating ? "Generating…" : "Generate tasks"}
            </button>
          </div>

          {error && !isLocked && (
            <p className="text-red-600 text-sm">{error}</p>
          )}

          {isLocked && (
            <div className="bg-blue-50 border border-blue-300 rounded-xl p-6 text-center">
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
              <div className="flex justify-between">
                <h2 className="text-xl font-bold">Differentiated tasks</h2>
                <button onClick={copyAll} className="text-sm underline">
                  Copy all
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <TaskCard
                  title="Support"
                  text={result.support}
                  onCopy={() => copyText(result.support)}
                />
                <TaskCard
                  title="Core"
                  text={result.core}
                  onCopy={() => copyText(result.core)}
                />
                <TaskCard
                  title="Challenge"
                  text={result.challenge}
                  onCopy={() => copyText(result.challenge)}
                />
              </div>
            </>
          )}
        </div>

        {/* Feedback */}
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border flex flex-col gap-4">
          <h2 className="text-xl font-bold">Quick feedback</h2>

          <textarea
            value={studentAnswer}
            onChange={(e) => setStudentAnswer(e.target.value)}
            rows={5}
            placeholder="Paste a student answer…"
            className="border rounded-xl px-4 py-3"
          />

          <button
            onClick={generateFeedback}
            disabled={!canGenerateFeedback || isFeedbackGenerating}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl w-fit"
          >
            {isFeedbackGenerating ? "Generating…" : "Generate feedback"}
          </button>

          {feedback && (
            <pre className="bg-zinc-50 border rounded-xl p-4 whitespace-pre-wrap">
              {feedback}
            </pre>
          )}
        </div>
      </div>
    </div>
  );
}

function TaskCard({
  title,
  text,
  onCopy,
}: {
  title: Difficulty;
  text: string;
  onCopy: () => void;
}) {
  return (
    <div className="border rounded-xl p-4 flex flex-col gap-3 bg-zinc-50">
      <div className="flex justify-between">
        <h3 className="font-bold">{title}</h3>
        <button onClick={onCopy} className="text-sm underline">
          Copy
        </button>
      </div>
      <pre className="whitespace-pre-wrap text-sm">{text}</pre>
    </div>
  );
}
