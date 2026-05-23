import { motion } from 'framer-motion';

export default function FutureMemory({ plans, onNext, actionLabel = 'Celebrate Together' }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="rounded-[2rem] border border-white/10 bg-white/10 p-8 shadow-2xl shadow-violet-500/15 backdrop-blur-xl"
    >
      <div className="space-y-6 text-slate-100">
        <div className="text-center">
          <p className="text-sm uppercase tracking-[0.32em] text-violet-200/80">Future Memories</p>
          <h2 className="text-3xl font-semibold sm:text-4xl">What we’ll do next</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {plans.map((plan) => (
            <div key={plan.title} className="rounded-[1.75rem] border border-white/10 bg-slate-950/90 p-5 text-slate-200 shadow-[0_30px_80px_rgba(15,23,42,0.45)]">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-3xl bg-gradient-to-br from-fuchsia-500 to-violet-500 text-2xl shadow-lg shadow-fuchsia-500/20">
                {plan.icon}
              </div>
              <h3 className="text-xl font-semibold text-white">{plan.title}</h3>
              <p className="mt-2 text-sm leading-7 text-slate-300">{plan.description}</p>
            </div>
          ))}
        </div>
        <div className="text-center">
          <button
            onClick={onNext}
            className="inline-flex rounded-full bg-gradient-to-r from-cyan-400 via-violet-500 to-fuchsia-500 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 hover:-translate-y-0.5"
          >
            {actionLabel}
          </button>
        </div>
      </div>
    </motion.section>
  );
}
