import { motion } from 'framer-motion';

export default function YesNoQuestion({ question, onAnswer }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="rounded-[2rem] border border-white/10 bg-white/10 p-8 shadow-2xl shadow-cyan-500/20 backdrop-blur-xl"
    >
      <div className="space-y-6 text-center text-slate-100">
        <p className="text-sm uppercase tracking-[0.32em] text-cyan-200/80">Question</p>
        <h2 className="text-3xl font-semibold sm:text-4xl">A special moment begins</h2>
        <p className="mx-auto max-w-2xl text-slate-200/90 leading-8">Answer the first question to unlock the next chapter of the surprise.</p>
        <div className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-8 text-left text-slate-100 shadow-[0_30px_80px_rgba(15,23,42,0.45)]">
          <p className="text-lg font-medium text-cyan-100">{question}</p>
        </div>
        <div className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={onAnswer}
            className="rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition hover:-translate-y-0.5"
          >
            Yes
          </button>
          <button
            type="button"
            onClick={onAnswer}
            className="rounded-full border border-white/10 bg-slate-900/90 px-6 py-3 text-sm font-semibold text-slate-100 transition hover:bg-slate-800"
          >
            No
          </button>
        </div>
      </div>
    </motion.section>
  );
}
