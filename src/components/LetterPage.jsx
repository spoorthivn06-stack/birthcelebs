import { motion } from 'framer-motion';

export default function LetterPage({ recipientName, greetingMessage, onNext }) {
  const displayName = recipientName?.trim() || 'you';
  const message = greetingMessage?.trim() || 'No message was added yet.';

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="rounded-[2rem] border border-white/10 bg-white/10 p-8 shadow-2xl shadow-cyan-500/20 backdrop-blur-xl"
    >
      <div className="space-y-6 text-center text-slate-100">
        <p className="text-sm uppercase tracking-[0.32em] text-cyan-200/80">Letter</p>
        <h2 className="text-3xl font-semibold sm:text-4xl">A letter for {displayName}</h2>
        <div className="mx-auto max-w-3xl rounded-[1.75rem] border border-white/10 bg-slate-950/80 p-6 text-left text-slate-200 shadow-[0_30px_80px_rgba(15,23,42,0.45)]">
          <p className="whitespace-pre-line leading-8 text-pink-100/90">{message}</p>
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
