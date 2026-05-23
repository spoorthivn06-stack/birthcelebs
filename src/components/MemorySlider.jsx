import { useState } from 'react';
import { motion } from 'framer-motion';

export default function MemorySlider({ memories, onFinish }) {
  const [index, setIndex] = useState(0);
  const item = memories[index];

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="rounded-[2rem] border border-white/10 bg-white/10 p-8 shadow-2xl shadow-pink-500/15 backdrop-blur-xl"
    >
      <div className="flex flex-col gap-6 text-slate-100">
        <div className="flex flex-col gap-2 text-center">
          <p className="text-sm uppercase tracking-[0.32em] text-pink-200/80">Memory Cards</p>
          <h2 className="text-3xl font-semibold sm:text-4xl">Moments we’ll always keep</h2>
        </div>
        <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/90 p-6 shadow-[0_30px_80px_rgba(15,23,42,0.45)]">
          <div className="mb-5 flex items-center justify-between text-sm uppercase tracking-[0.24em] text-slate-400">
            <span>{index + 1} / {memories.length}</span>
            <span>{item.title}</span>
          </div>
          <div className="space-y-4">
            <div className="aspect-[16/9] rounded-3xl bg-gradient-to-br from-pink-500 via-fuchsia-500 to-violet-500 p-5 shadow-inner shadow-pink-500/20">
              <div className="flex h-full flex-col justify-between rounded-3xl bg-white/10 p-5 text-white">
                <span className="text-xs uppercase tracking-[0.32em] text-white/75">{item.subtitle}</span>
                <p className="text-lg leading-8">{item.detail}</p>
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-white/10 px-4 py-2 text-xs text-white/90">{item.accent}</span>
                  <span className="text-sm text-white/80">Remember this day</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex gap-3">
                <button
                  onClick={() => setIndex((prev) => Math.max(prev - 1, 0))}
                  disabled={index === 0}
                  className="rounded-full border border-white/10 bg-slate-900/80 px-5 py-3 text-sm text-slate-100 transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Previous
                </button>
                <button
                  onClick={() => setIndex((prev) => Math.min(prev + 1, memories.length - 1))}
                  disabled={index === memories.length - 1}
                  className="rounded-full border border-white/10 bg-slate-900/80 px-5 py-3 text-sm text-slate-100 transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Next
                </button>
              </div>
              {index === memories.length - 1 ? (
                <button
                  onClick={onFinish}
                  className="inline-flex rounded-full bg-gradient-to-r from-fuchsia-500 via-pink-500 to-orange-400 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-500/20 hover:-translate-y-0.5"
                >
                  Continue to Future Plans
                </button>
              ) : (
                <span className="text-sm text-slate-400">Swipe through each memory at your own pace.</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
