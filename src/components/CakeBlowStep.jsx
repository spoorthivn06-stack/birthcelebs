import { useState } from 'react';
import { motion } from 'framer-motion';

const candles = [-54, -18, 18, 54];

export default function CakeBlowStep({ onNext }) {
  const [blown, setBlown] = useState(false);

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="rounded-[2rem] border border-white/10 bg-white/10 p-8 shadow-2xl shadow-orange-500/20 backdrop-blur-xl"
    >
      <div className="space-y-6 text-center text-slate-100">
        <p className="text-sm uppercase tracking-[0.32em] text-orange-200/80">Cake Blow</p>
        <h2 className="text-3xl font-semibold sm:text-4xl">Blow out the candles</h2>
        <p className="mx-auto max-w-2xl leading-8 text-slate-200/90">
          Tap the blow button and watch every candle go out before the next surprise.
        </p>

        <div className="mx-auto flex max-w-2xl flex-col items-center gap-7 rounded-[2rem] border border-white/10 bg-slate-950/80 p-8 shadow-[0_30px_80px_rgba(15,23,42,0.45)]">
          <div className="relative h-80 w-full max-w-md overflow-hidden rounded-[2rem] bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950">
            <div className="absolute inset-x-10 bottom-8 h-5 rounded-full bg-black/30 blur-md" />

            {candles.map((left, index) => (
              <div
                key={left}
                className="absolute bottom-[188px] left-1/2 flex -translate-x-1/2 flex-col items-center"
                style={{ marginLeft: left }}
              >
                <motion.div
                  animate={
                    blown
                      ? { opacity: 0, y: -18, scale: 0.35, rotate: index % 2 ? -18 : 18 }
                      : { opacity: [0.8, 1, 0.85], y: [0, -3, 0], scale: [0.95, 1.08, 0.95] }
                  }
                  transition={blown ? { duration: 0.65, delay: index * 0.08 } : { duration: 0.75, repeat: Infinity, delay: index * 0.1 }}
                  className="relative z-20 h-8 w-5 rounded-full bg-gradient-to-b from-yellow-100 via-orange-300 to-red-500 shadow-[0_0_24px_rgba(251,146,60,0.9)]"
                />
                {blown && (
                  <motion.div
                    initial={{ opacity: 0, y: 2, scale: 0.4 }}
                    animate={{ opacity: [0, 0.75, 0], y: -38, x: index % 2 ? -16 : 16, scale: 1.8 }}
                    transition={{ duration: 1.1, delay: index * 0.12 }}
                    className="absolute top-0 h-7 w-7 rounded-full bg-white/50 blur-sm"
                  />
                )}
                <div className="h-16 w-4 rounded-sm bg-gradient-to-b from-rose-100 via-rose-200 to-pink-300 shadow-inner">
                  <div className="h-full w-full bg-[repeating-linear-gradient(135deg,transparent_0_7px,rgba(244,63,94,0.55)_7px_11px)]" />
                </div>
              </div>
            ))}

            <div className="absolute bottom-24 left-1/2 h-20 w-72 -translate-x-1/2 rounded-t-[2.5rem] bg-gradient-to-b from-rose-200 to-pink-300 shadow-xl shadow-pink-500/20">
              <div className="absolute inset-x-0 top-0 h-7 rounded-t-[2.5rem] bg-gradient-to-b from-white to-rose-100" />
              <div className="absolute left-8 top-8 h-5 w-5 rounded-full bg-red-400" />
              <div className="absolute left-24 top-10 h-4 w-4 rounded-full bg-yellow-300" />
              <div className="absolute right-20 top-8 h-5 w-5 rounded-full bg-fuchsia-400" />
              <div className="absolute right-10 top-12 h-4 w-4 rounded-full bg-cyan-300" />
            </div>
            <div className="absolute bottom-14 left-1/2 h-20 w-80 -translate-x-1/2 rounded-t-[2rem] bg-gradient-to-b from-amber-200 via-orange-200 to-orange-300 shadow-xl">
              <div className="absolute inset-x-0 top-0 h-6 rounded-t-[2rem] bg-gradient-to-b from-white to-amber-100" />
              <div className="absolute left-10 top-8 h-4 w-8 rounded-full bg-pink-400" />
              <div className="absolute left-32 top-11 h-4 w-8 rounded-full bg-sky-300" />
              <div className="absolute right-16 top-8 h-4 w-8 rounded-full bg-lime-300" />
            </div>
            <div className="absolute bottom-10 left-1/2 h-8 w-96 max-w-[92%] -translate-x-1/2 rounded-full bg-gradient-to-b from-slate-100 to-slate-300 shadow-lg" />

            {blown && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute inset-x-0 top-8 mx-auto w-fit rounded-full border border-white/10 bg-slate-950/70 px-5 py-2 text-sm font-semibold text-orange-100"
              >
                Wish made
              </motion.div>
            )}
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => setBlown(true)}
              disabled={blown}
              className="rounded-full bg-slate-100 px-7 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-slate-900/30 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {blown ? 'Candles are out' : 'Blow candles'}
            </button>
            <button
              type="button"
              onClick={onNext}
              className="rounded-full bg-gradient-to-r from-orange-500 to-pink-500 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-500/20 transition hover:-translate-y-0.5"
            >
              Continue the story
            </button>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
