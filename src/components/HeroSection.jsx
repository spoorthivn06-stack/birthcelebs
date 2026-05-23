import { Link } from 'react-router-dom';

function HeroSection() {
  return (
    <section className="hero-bg relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/80 px-6 py-10 shadow-glow sm:px-12 sm:py-14">
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute left-10 top-10 h-24 w-24 rounded-full bg-orange-400/20 blur-3xl" />
        <div className="absolute right-10 top-16 h-28 w-28 rounded-full bg-cyan-400/20 blur-3xl" />
      </div>
      <div className="relative grid gap-10 lg:grid-cols-[1.6fr_1fr] lg:items-center">
        <div className="space-y-6">
          <p className="inline-flex rounded-full bg-orange-300/10 px-3 py-1 text-sm font-semibold uppercase tracking-[0.18em] text-orange-200">
            Happy Birthday!
          </p>
          <h1 className="max-w-2xl text-4xl font-semibold leading-tight text-white sm:text-5xl">
            Make your special day unforgettable with a surprise-filled birthday wish app.
          </h1>
          <p className="max-w-xl text-slate-300 sm:text-lg">
            Animated balloons, a glowing birthday card, heartfelt wishes, and a countdown to the party — all in one sweet experience.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              to="/surprise"
              className="rounded-full bg-gradient-to-r from-orange-400 to-pink-500 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-orange-500/20 transition hover:scale-[1.02]"
            >
              Open the surprise
            </Link>
            <Link
              to="#messages"
              className="rounded-full border border-slate-700/70 px-6 py-3 text-sm font-semibold text-slate-100 transition hover:border-orange-400 hover:text-orange-300"
            >
              Read wishes
            </Link>
          </div>
        </div>
        <div className="relative">
          <div className="card-flip mx-auto max-w-md rounded-[32px] border border-white/10 bg-slate-950/90 p-6 shadow-2xl shadow-orange-500/10">
            <div className="card-flip-inner rounded-[28px] bg-slate-900/90 px-6 py-10 text-center">
              <div className="card-front">
                <div className="mb-4 inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-orange-500/20 text-3xl text-orange-200">
                  🎂
                </div>
                <p className="text-sm uppercase tracking-[0.3em] text-orange-300/80">Birthday card</p>
                <h2 className="mt-4 text-3xl font-semibold text-white">Open your gift inside</h2>
                <p className="mt-3 text-slate-400">Hover to reveal a hidden message and a special wish.</p>
              </div>
              <div className="card-back absolute inset-0 flex flex-col items-center justify-center rounded-[28px] bg-gradient-to-br from-orange-400 to-pink-500 px-6 py-10 text-white shadow-lg shadow-pink-500/20">
                <span className="mb-3 text-5xl">✨</span>
                <p className="text-lg font-semibold">May your year be full of joy, laughter, and magical surprises!</p>
              </div>
            </div>
          </div>
          <div className="absolute left-0 top-4 h-10 w-10 rounded-full bg-pink-500/30 blur-xl" />
          <div className="absolute right-0 bottom-4 h-14 w-14 rounded-full bg-cyan-400/30 blur-2xl" />
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
