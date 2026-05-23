import { useState } from 'react';
import { motion } from 'framer-motion';

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
        <p className="mx-auto max-w-2xl text-slate-200/90 leading-8">Click the candle to make the wish page move to the next surprise.</p>
        <div className="mx-auto flex max-w-xl flex-col items-center gap-6 rounded-[2rem] border border-white/10 bg-slate-950/80 p-8 shadow-[0_30px_80px_rgba(15,23,42,0.45)]">
          <div className="relative flex h-40 w-40 items-end justify-center rounded-full bg-gradient-to-br from-orange-400/20 to-pink-500/10 p-6 text-center shadow-lg shadow-orange-500/10">
            <div className="absolute inset-x-0 top-8 mx-auto h-20 w-20 rounded-full bg-slate-950/90 shadow-inner" />
            <div className="absolute bottom-16 h-16 w-24 rounded-3xl bg-amber-300 shadow-md" />

            {/* animated flame */}
            <motion.div
              initial={{ opacity: 1, y: 0, scale: 1 }}
              animate={blown ? { opacity: 0, y: -12, scale: 0.6 } : { opacity: [0.9, 1, 0.9], y: [0, -2, 0], scale: [1, 1.03, 1] }}
              transition={blown ? { duration: 0.6 } : { duration: 1.2, repeat: Infinity }}
              className="absolute bottom-36 h-6 w-6 rounded-full bg-orange-300 blur-sm"
            />

            {/* puff after blow */}
            {blown && (
              <motion.div
                initial={{ opacity: 0, scale: 0.2 }}
                animate={{ opacity: 0.9, scale: 2, y: -10 }}
                transition={{ duration: 0.6 }}
                className="absolute bottom-36 h-6 w-6 rounded-full bg-white/60"
              />
            )}

            <button
              type="button"
              onClick={() => setBlown(true)}
              className="relative rounded-full bg-slate-100 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-slate-900/30 transition hover:-translate-y-0.5"
            >
              {blown ? 'Make a wish!' : 'Blow candle'}
            </button>

            <div className={`absolute bottom-28 h-12 w-12 rounded-full ${blown ? 'bg-orange-300' : 'bg-orange-400'} transition-all duration-300`} />
          </div>
          <button
            type="button"
            onClick={onNext}
            className="rounded-full bg-gradient-to-r from-orange-500 to-pink-500 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-500/20 transition hover:-translate-y-0.5"
          >
            Continue the story
          </button>
        </div>
      </div>
    </motion.section>
  );
}
