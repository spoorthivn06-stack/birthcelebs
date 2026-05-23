import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="space-y-12">
      <section className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-10 shadow-2xl shadow-fuchsia-500/20 backdrop-blur-xl">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_0.9fr] lg:items-center">
          <div className="space-y-6 text-slate-100">
            <p className="text-sm uppercase tracking-[0.32em] text-pink-200/80">Interactive Wish Builder</p>
            <h1 className="text-4xl font-semibold sm:text-5xl">Create a shared greeting that unfolds step by step.</h1>
            <p className="max-w-3xl leading-8 text-slate-300">
              Design a personalized message with questions, candle blow moments, memories, and future plans. Once created, you can share a link that guides the recipient through a sequential surprise experience.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/create"
                className="inline-flex rounded-full bg-gradient-to-r from-fuchsia-500 via-pink-500 to-rose-500 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-pink-500/20"
              >
                Start building
              </Link>
              <Link
                to="/preview"
                className="inline-flex rounded-full border border-white/10 bg-slate-900/80 px-8 py-3 text-sm font-semibold text-slate-100 transition hover:bg-slate-800"
              >
                View experience
              </Link>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-[0_30px_80px_rgba(15,23,42,0.45)]">
            <p className="text-sm uppercase tracking-[0.32em] text-cyan-200/80">Why this works</p>
            <ul className="mt-6 space-y-4 text-slate-200">
              <li>• Sequential steps keep the surprise alive instead of one long scroll.</li>
              <li>• Custom questions, balloon count, and greeting copy personalize the flow.</li>
              <li>• Shareable URL opens directly into the experience.</li>
              <li>• Built with React, Vite, and Tailwind for fast local editing.</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
