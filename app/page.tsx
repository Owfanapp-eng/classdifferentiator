export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="w-full max-w-2xl p-8 bg-white dark:bg-black rounded-xl shadow-md flex flex-col gap-12 items-center">
        {/* Logo / Product Name */}
        <div className="flex flex-col items-center gap-2">
          <span className="text-2xl sm:text-3xl font-extrabold text-blue-700 tracking-tight">
            ClassDifferentiator
          </span>
          <span className="text-zinc-700 dark:text-zinc-300 text-center text-lg">
            Instantly generate differentiated English tasks <br/>
            and personalised feedback for GCSE classes.
          </span>
        </div>

        {/* Headline and Subheadline */}
        <div className="w-full flex flex-col items-center gap-4 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-black dark:text-zinc-50">
            Differentiate and mark in under 60 seconds.
          </h1>
          <p className="text-zinc-700 dark:text-zinc-300 text-lg max-w-xl">
            Save hours of planning and marking. ClassDifferentiator supports UK secondary English teachers
            with instant, tailored resources and automated, personalised student feedback.
          </p>
        </div>

        {/* Teacher Pain Points */}
        <div className="w-full bg-zinc-100 dark:bg-zinc-900 rounded-lg p-6 flex flex-col gap-2">
          <h2 className="text-lg font-semibold text-blue-800 dark:text-blue-300 mb-2">Does this sound familiar?</h2>
          <ul className="list-disc pl-5 text-zinc-700 dark:text-zinc-300 space-y-1">
            <li>Spending evenings marking endless papers?</li>
            <li>Struggling to differentiate tasks for every student?</li>
            <li>Feeling squeezed by time and workload?</li>
          </ul>
        </div>

        {/* How it Works */}
        <div className="w-full flex flex-col gap-4">
          <h2 className="text-lg font-semibold text-black dark:text-zinc-50 mb-2">How it works</h2>
          <ol className="flex flex-col gap-2 text-zinc-700 dark:text-zinc-300">
            <li className="flex items-center gap-2">
              <span className="bg-blue-700 text-white rounded-full h-8 w-8 flex items-center justify-center font-bold">1</span>
              <span>
                Upload your GCSE class list and choose a learning objective.
              </span>
            </li>
            <li className="flex items-center gap-2">
              <span className="bg-blue-700 text-white rounded-full h-8 w-8 flex items-center justify-center font-bold">2</span>
              <span>
                Instantly receive differentiated tasks for every group and key student.
              </span>
            </li>
            <li className="flex items-center gap-2">
              <span className="bg-blue-700 text-white rounded-full h-8 w-8 flex items-center justify-center font-bold">3</span>
              <span>
                Generate detailed, personalised feedback reports in seconds.
              </span>
            </li>
          </ol>
        </div>

        {/* Pricing */}
        <div className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg p-6 flex flex-col items-center gap-3">
          <h2 className="text-black dark:text-zinc-50 text-xl font-bold">Pricing</h2>
          <div className="flex flex-col sm:flex-row gap-6 w-full justify-center">
            <div className="flex flex-col items-center p-4 rounded-lg border border-blue-100 dark:border-blue-900 bg-blue-50 dark:bg-blue-950">
              <span className="text-lg font-semibold text-blue-800 dark:text-blue-300">Free</span>
              <span className="text-2xl text-black dark:text-zinc-50 font-bold mt-1">£0</span>
              <span className="text-sm text-zinc-500 mt-1">Basic generation & limited feedback</span>
            </div>
            <div className="flex flex-col items-center p-4 rounded-lg border border-blue-700 bg-white dark:bg-black shadow">
              <span className="text-lg font-semibold text-blue-700">Pro</span>
              <span className="text-2xl text-black dark:text-zinc-50 font-bold mt-1">£8<span className="text-base text-zinc-600">/month</span></span>
              <span className="text-sm text-zinc-500 mt-1">Unlimited tasks, enhanced feedback, and more</span>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="w-full flex flex-col items-center mt-2 gap-3">
          <a
            href="#"
            className="bg-blue-700 hover:bg-blue-800 text-white font-semibold text-lg px-8 py-3 rounded-full shadow transition-colors"
          >
            Join early access
          </a>
          <span className="text-zinc-500 text-sm mt-1">No card required. Cancel anytime.</span>
        </div>
      </main>
    </div>
  );
}
