import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';
import CelebrationBurst from '../CelebrationBurst.jsx';
import useMemoryGame from '../../hooks/useMemoryGame';
import MemoryCard from './MemoryCard';
import ScoreBoard from './ScoreBoard';

export default function MemoryGame({ title = "Valentine's Memory", successMessage = 'You unlocked a special Valentine\'s message!' }) {
  const {
    cards,
    flipCard,
    moves,
    time,
    matches,
    score,
    resetGame,
    completed,
  } = useMemoryGame({ size: 4 }); // 4x4

  const [focusedIndex, setFocusedIndex] = useState(0);
  const containerRef = useRef(null);
  const [showBurst, setShowBurst] = useState(false);

  useEffect(() => {
    // focus first card when ready
    const idx = cards.findIndex((c) => !c.matched);
    setFocusedIndex(idx >= 0 ? idx : 0);
  }, [cards]);

  useEffect(() => {
    if (completed) {
      setShowBurst(true);
    }
  }, [completed]);

  useEffect(() => {
    function handleKey(e) {
      if (!cards.length) return;
      const cols = 4;
      let row = Math.floor(focusedIndex / cols);
      let col = focusedIndex % cols;
      if (e.key === 'ArrowRight') {
        col = Math.min(cols - 1, col + 1);
        setFocusedIndex(row * cols + col);
      } else if (e.key === 'ArrowLeft') {
        col = Math.max(0, col - 1);
        setFocusedIndex(row * cols + col);
      } else if (e.key === 'ArrowDown') {
        row = Math.min(Math.ceil(cards.length / cols) - 1, row + 1);
        setFocusedIndex(row * cols + col);
      } else if (e.key === 'ArrowUp') {
        row = Math.max(0, row - 1);
        setFocusedIndex(row * cols + col);
      } else if (e.key === 'Enter' || e.key === ' ') {
        const card = cards[focusedIndex];
        if (card && !card.matched) flipCard(card.id);
      }
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [focusedIndex, cards, flipCard]);

  return (
    <div className="w-full space-y-4" ref={containerRef}>
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-white">{title}</h2>
        <ScoreBoard moves={moves} time={time} matches={matches} score={score} />
      </div>

      <div className="relative w-full">
        <div className="grid grid-cols-4 gap-2 sm:gap-3" role="grid" aria-label="Memory cards">
          {cards.map((card, idx) => (
            <MemoryCard key={card.id} card={card} focused={idx === focusedIndex} onClick={() => { setFocusedIndex(idx); flipCard(card.id); }} />
          ))}
        </div>

        {completed && (
          <>
            <Confetti recycle={false} numberOfPieces={300} />
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 text-center p-6 rounded-xl"
            >
              <h3 className="text-3xl font-bold text-pink-300">🎉 Congratulations!</h3>
              <p className="mt-4 text-slate-100">{successMessage}</p>
              <button
                onClick={resetGame}
                className="mt-6 rounded-full bg-pink-500 px-6 py-2 text-white font-semibold hover:bg-pink-600 transition"
              >
                Play Again
              </button>
            </motion.div>
          </>
        )}
        {showBurst && (
          <CelebrationBurst duration={1400} onDone={() => setShowBurst(false)} />
        )}
      </div>
    </div>
  );
}
