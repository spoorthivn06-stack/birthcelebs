import { useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import { motion } from 'framer-motion';

export default function Celebration({ recipientName, onRestart }) {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateSize = () => setDimensions({ width: window.innerWidth, height: window.innerHeight });
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/10 p-8 text-slate-100 shadow-2xl shadow-orange-500/20 backdrop-blur-xl">
      <Confetti width={dimensions.width} height={dimensions.height} recycle={true} numberOfPieces={220} gravity={0.12} />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative space-y-6"
      >
        <div className="rounded-[1.75rem] bg-slate-950/80 p-8 text-center shadow-[0_30px_80px_rgba(15,23,42,0.45)]">
          <p className="text-sm uppercase tracking-[0.32em] text-orange-200/80">Final Celebration</p>
          <h2 className="mt-4 text-4xl font-semibold text-white">{recipientName || 'You'} are my favorite surprise.</h2>
          <p className="mx-auto mt-4 max-w-2xl leading-8 text-slate-300">
            Thank you for being the most beautiful part of every story. Here’s to the memories behind us and the magic ahead.
          </p>
        </div>
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <div className="flex flex-wrap justify-center gap-3 text-4xl">
            <span>✨</span>
            <span>💖</span>
            <span>🌙</span>
            <span>🎉</span>
          </div>
          <button
            onClick={onRestart}
            className="rounded-full bg-gradient-to-r from-orange-400 via-pink-500 to-violet-500 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-pink-500/20 hover:-translate-y-0.5"
          >
            Restart the Journey
          </button>
        </div>
      </motion.div>
    </div>
  );
}
