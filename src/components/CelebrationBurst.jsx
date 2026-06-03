import { useEffect } from 'react';
import Confetti from 'react-confetti';
import { motion } from 'framer-motion';

export default function CelebrationBurst({ duration = 1500, onDone }) {
  useEffect(() => {
    const t = setTimeout(() => { if (onDone) onDone(); }, duration);
    return () => clearTimeout(t);
  }, [duration, onDone]);

  return (
    <div className="pointer-events-none absolute inset-0 z-50 flex items-center justify-center">
      <Confetti recycle={false} numberOfPieces={220} gravity={0.12} />
    </div>
  );
}
