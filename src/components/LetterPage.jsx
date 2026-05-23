import { motion } from 'framer-motion';

export default function LetterPage({ recipientName, greetingMessage, onNext }) {
  const displayName = recipientName?.trim() || 'you';

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="rounded-[2rem] border border-white/10 bg-white/10 p-8 shadow-2xl shadow-cyan-500/20 backdrop-blur-xl"
    >
      <div className="space-y-6 text-center text-slate-100">
        <p className="text-sm uppercase tracking-[0.32em] text-cyan-200/80">A story for {displayName}</p>
        <h2 className="text-3xl font-semibold sm:text-4xl">This moment is made for {displayName}.</h2>
        <div className="mx-auto max-w-3xl rounded-[1.75rem] border border-white/10 bg-slate-950/80 p-6 text-left text-slate-200 shadow-[0_30px_80px_rgba(15,23,42,0.45)]">
          <p className="leading-8">
            Dear {displayName}, your smile has been the brightest part of every day we’ve shared.
          </p>
          <p className="mt-4 leading-8 text-pink-100/90">
            {greetingMessage || 'Every laugh, every quiet moment, and every adventure with you feels like a treasured memory.'}
          </p>
          <p className="mt-4 leading-8 text-slate-300">
            Let’s revisit the sweetest chapters and dream together about the beautiful moments still to come.
          </p>
        </div>
        <motion.button
          whileHover={{ y: -2, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onNext}
          className="inline-flex rounded-full bg-gradient-to-r from-cyan-500 via-violet-500 to-fuchsia-500 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20"
          aria-label="Continue to Memories"
        >
          Continue to Memories
        </motion.button>
      </div>
    </motion.section>
  );
}
