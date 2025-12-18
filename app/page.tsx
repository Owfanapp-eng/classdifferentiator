export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
      <main className="w-full max-w-4xl p-8 bg-white dark:bg-zinc-900 rounded-xl shadow-md flex flex-col gap-12">

        {/* Logo / Product Name */}
        <div className="flex flex-col items-center gap-2 text-center">
          <span className="text-3xl font-extrabold text-blue-700 tracking-tight">
            ClassDifferentiator
          </span>
          <span className="text-zinc-700 dark:text-zinc-300 text-lg">
            Instantly generate differentiated English tasks <br />
            and personalised feedback for GCSE classes.
          </span>
        </div>

        {/* Headline */}
        <div className="flex flex-col items-center gap-4 text-center">
          <h1 className="text-4xl font-bold text-black dark:text-white">
            Differentiate and mark in under 60 seconds.
          </h1>
          <p className="text-zinc-700 dark:text-zinc-300 max-w-2xl">
            Save hours of planning and marking. ClassDifferentiator supports UK
            secondary English teachers with instant, tailored resources and
            automated, personalised student feedback.
          </p>
        </div>

        {/* Pain Points */}
        <div className="bg-zinc-100 dark:bg-zinc-800 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-blue-700 mb-2">
            Does this sound familiar?
          </h2>
          <ul className="list-disc pl-5 text-zinc-700 dark:text-zinc-300 space-y-1">
            <li>Spending evenings marking endless papers?</li>
            <li>Struggling to differentiate tasks for every student?</li>
            <li>Feeling squeezed by time and workload?</li>
          </ul>
        </div>

        {/* How it works */}
        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-semibold text-black dark:text-white">
            How it works
          </h2>

          <ol className="flex flex-col gap-3 text-zinc-700 dark:text-zinc-300">
            {[1, 2, 3].map((num) => (
              <li key={num} className="flex items-center gap-3">
                <span className="bg-blue-600 text-white rounded-full h-8 w-8 flex items-center justify-center font-bold">
                  {num}
                </span>
                <span>
                  {num === 1 && "Upload your GCSE class list and choose a learning objective."}
                  {num === 2 && "Instantly receive differentiated tasks for every group and key student."}
                  {num === 3 && "Generate detailed, personalised feedback reports in seconds."}
                </span>
              </li>
            ))}
          </ol>
        </div>

        {/* Waitlist */}
        <div className="bg-blue-50 dark:bg-zinc-800 rounded-xl p-6 text-center flex flex-col gap-4">
          <h2 className="text-2xl font-bold">Join the early access waitlist</h2>
          <p className="text-zinc-700 dark:text-zinc-300">
            Be the first to try ClassDifferentiator when task generation goes live.
          </p>

          <form
            action="https://formspree.io/f/xdannbvv"
            method="POST"
            className="flex flex-col sm:flex-row gap-3 justify-center"
          >
            <input
              type="email"
              name="email"
              required
              placeholder="Your school email"
              className="px-4 py-3 rounded-lg border border-zinc-300 w-full sm:w-80"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700"
            >
              Join waitlist
            </button>
          </form>
        </div>

        {/* Pricing */}
        <div className="flex flex-col items-center gap-6">
          <h2 className="text-3xl font-bold text-center">
            Simple pricing for busy teachers
          </h2>

          <p className="text-zinc-600 dark:text-zinc-300 text-center max-w-xl">
            Start free. Upgrade only when you’re ready to save serious time.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            {/* Free */}
            <div className="border rounded-xl p-6 flex flex-col gap-4">
              <h3 className="text-xl font-semibold">Free</h3>
              <p className="text-3xl font-bold">£0</p>
              <ul className="list-disc pl-5 text-zinc-700 dark:text-zinc-300">
                <li>Limited task generation</li>
                <li>Basic differentiation</li>
                <li>Trial feedback reports</li>
              </ul>
              <button className="mt-auto border rounded-lg py-2 font-semibold">
                Join waitlist
              </button>
            </div>

            {/* Pro */}
            <div className="border-2 border-blue-600 rounded-xl p-6 flex flex-col gap-4 bg-blue-50 dark:bg-zinc-800">
              <h3 className="text-xl font-semibold">Pro</h3>
              <p className="text-3xl font-bold">
                £9 <span className="text-lg">/month</span>
              </p>
              <ul className="list-disc pl-5 text-zinc-700 dark:text-zinc-300">
                <li>Unlimited task generation</li>
                <li>Full class differentiation</li>
                <li>Personalised feedback per student</li>
                <li>Export-ready resources</li>
              </ul>
              <button className="mt-auto bg-blue-600 text-white rounded-lg py-2 font-semibold hover:bg-blue-700">
                Get early access
              </button>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}
