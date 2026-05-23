import { motion } from 'framer-motion';

export default function WelcomeScreen({ recipientName, setRecipientName, onNext }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="rounded-[2rem] border border-white/10 bg-white/10 p-8 shadow-2xl shadow-fuchsia-500/20 backdrop-blur-xl"
    >
      <div className="space-y-6 text-center text-slate-100">
        <div className="mx-auto inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-white/10 text-3xl shadow-[0_0_30px_rgba(236,72,153,0.25)]">
          💌
        </div>
        <p className="text-sm uppercase tracking-[0.32em] text-pink-200/80">A Letter For You</p>
        <h1 className="text-4xl font-semibold sm:text-5xl">Our Memory Story, {recipientName || 'Friend'}</h1>
        <p className="mx-auto max-w-2xl text-slate-200/90 leading-8">
          A soft and gentle experience for the moments we’ve shared, the dreams ahead, and a sparkly finale made just for you.
        </p>
        <div className="mx-auto flex max-w-md flex-col gap-3 text-left">
          <label className="text-sm font-medium text-slate-200">Who is this experience for?</label>
          <input
            value={recipientName}
            onChange={(event) => setRecipientName(event.target.value)}
            placeholder="Enter a name"
            className="rounded-3xl border border-white/10 bg-slate-950/80 px-4 py-3 text-slate-100 outline-none transition focus:border-pink-400 focus:ring-2 focus:ring-pink-500/20"
          />
          <p className="text-xs text-slate-400">This name will personalize the entire flow and make the surprise feel more special.</p>
        </div>
        <button
          onClick={onNext}
          className="inline-flex rounded-full bg-gradient-to-r from-fuchsia-500 via-pink-500 to-rose-500 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-pink-500/20 hover:-translate-y-0.5"
        >
          Start the Journey
        </button>
      </div>
    </motion.section>
  );
}
