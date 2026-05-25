import { motion } from 'framer-motion';

export default function HugAnimation({ onFinish }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 px-4 backdrop-blur-sm">
      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.45 }}
        className="relative w-full max-w-xl overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-950 via-fuchsia-950 to-amber-950 p-8 shadow-2xl shadow-amber-500/20"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(251,191,36,0.18),transparent_38%)]" />
        <div className="relative flex flex-col items-center gap-7 text-center">
          <div className="relative h-64 w-full max-w-sm">
            <motion.div
              initial={{ x: -150, rotate: -18, opacity: 0.2 }}
              animate={{ x: -36, rotate: -4, opacity: 1 }}
              transition={{ duration: 1.1, ease: 'easeInOut' }}
              className="absolute left-1/2 top-20 h-28 w-36 -translate-x-1/2 rounded-[3rem] bg-gradient-to-br from-amber-200 via-yellow-300 to-orange-400 shadow-[0_0_50px_rgba(251,191,36,0.35)]"
            />
            <motion.div
              initial={{ x: 150, rotate: 18, opacity: 0.2 }}
              animate={{ x: 36, rotate: 4, opacity: 1 }}
              transition={{ duration: 1.1, ease: 'easeInOut' }}
              className="absolute left-1/2 top-20 h-28 w-36 -translate-x-1/2 rounded-[3rem] bg-gradient-to-bl from-rose-200 via-pink-300 to-fuchsia-400 shadow-[0_0_50px_rgba(244,114,182,0.35)]"
            />
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1.1, 1], opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.55 }}
              className="absolute left-1/2 top-24 h-24 w-24 -translate-x-1/2 rounded-full bg-white/90 shadow-[0_0_70px_rgba(255,255,255,0.55)]"
            />
            {Array.from({ length: 10 }).map((_, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0.4, 1, 0.6],
                  x: Math.cos(index) * (70 + index * 5),
                  y: Math.sin(index) * (45 + index * 3),
                }}
                transition={{ duration: 1.8, delay: 0.7 + index * 0.08, repeat: Infinity, repeatDelay: 1.2 }}
                className="absolute left-1/2 top-32 h-2 w-2 rounded-full bg-amber-200"
              />
            ))}
          </div>

          <div className="space-y-3">
            <p className="text-sm uppercase tracking-[0.32em] text-amber-100/80">Golden Hug</p>
            <h2 className="text-3xl font-semibold text-white">A little warmth, sent softly</h2>
            <p className="mx-auto max-w-md leading-8 text-slate-200">
              Two golden lights meet in the middle, holding the moment for a second before the story moves on.
            </p>
          </div>

          <button
            onClick={onFinish}
            className="rounded-full bg-white/10 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-amber-500/20 transition hover:bg-white/20"
          >
            Keep going
          </button>
        </div>
      </motion.div>
    </div>
  );
}
