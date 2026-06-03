import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';
import CelebrationBurst from '../CelebrationBurst.jsx';
import usePuzzleGame from '../../hooks/usePuzzleGame';
import PuzzleTile from './PuzzleTile';
import PuzzleControls from './PuzzleControls';

export default function PuzzleGame({
  image = '/image.png',
  size = 4,
  title = 'Puzzle Magic',
  revealDuration = 4000,
  successMessage = 'Happy Birthday ❤️',
  showTimer = true,
}) {
  const {
    pieces,
    boardSize,
    completed,
    total,
    progress,
    time,
    isSolved,
    showReveal,
    restart,
    handleDragStart,
    handleDragEnd,
    dragConstraints,
  } = usePuzzleGame({ image, size, revealDuration });

  const imageSource = image || '/image.png';
  const pieceCount = pieces.length;

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-4 text-sm text-slate-300 shadow-lg shadow-slate-950/30">
        <div className="flex flex-wrap items-center gap-4">
          <div className="rounded-2xl bg-slate-900/80 px-3 py-2 text-xs uppercase tracking-[0.24em] text-slate-300">Puzzle source: {imageSource}</div>
          <div className="rounded-2xl bg-slate-900/80 px-3 py-2 text-xs uppercase tracking-[0.24em] text-slate-300">Pieces: {pieceCount}</div>
          <div className="rounded-2xl bg-slate-900/80 px-3 py-2 text-xs uppercase tracking-[0.24em] text-slate-300">Board: {boardSize}px</div>
        </div>
      </div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-white">{title}</h2>
          <p className="mt-1 text-sm text-slate-400">Watch the image crack apart, then drag pieces into place.</p>
        </div>
        <PuzzleControls
          completed={completed}
          total={total}
          progress={progress}
          time={time}
          showTimer={showTimer}
          onRestart={restart}
        />
      </div>

      <div className="relative mx-auto w-full max-w-[520px] rounded-[2rem] border border-white/10 bg-slate-950/90 p-4 shadow-2xl shadow-fuchsia-500/10">
        <div
          className="relative mx-auto overflow-hidden rounded-[1.75rem] bg-slate-900"
          style={{ width: boardSize, height: boardSize }}
        >
          <div className="absolute inset-0 grid" style={{ gridTemplateColumns: `repeat(${size}, 1fr)`, gridTemplateRows: `repeat(${size}, 1fr)` }}>
            {pieces.map((piece) => (
              <div key={`target-${piece.id}`} className="relative p-1">
                <div className={`h-full w-full rounded-3xl border ${piece.placed ? 'border-emerald-400/50 bg-emerald-500/10' : 'border-white/5 bg-white/5'}`} />
              </div>
            ))}
          </div>

          {pieces.map((piece) => (
            <PuzzleTile
              key={piece.id}
              piece={piece}
              dragConstraints={dragConstraints}
              onDragStart={() => handleDragStart()}
              onDragEnd={(offsetX, offsetY) => handleDragEnd(piece.id, offsetX, offsetY)}
            />
          ))}

          <AnimatePresence>
            {showReveal && (
              <motion.div
                className="absolute inset-0 z-20 flex items-center justify-center bg-slate-950/90"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="relative h-full w-full overflow-hidden rounded-[1.75rem] border border-white/10 bg-slate-950/70">
                  <motion.img
                    src={imageSource}
                    alt="Reveal"
                    className="h-full w-full object-cover"
                    initial={{ scale: 1.05 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.2, ease: 'easeOut' }}
                  />
                  <div className="absolute inset-x-0 bottom-0 rounded-b-[1.75rem] bg-black/40 p-5 text-center text-white backdrop-blur-sm">
                    <p className="text-sm uppercase tracking-[0.3em] text-pink-300">Memory Preview</p>
                    <p className="mt-2 text-lg font-semibold">Hold this moment for a second.</p>
                    <p className="mt-1 text-xs text-slate-200">If this is blank, the puzzle image failed to load.</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {isSolved && (
            <div className="absolute inset-0 z-30 flex flex-col items-center justify-center rounded-[1.75rem] bg-slate-950/90 px-6 text-center text-white">
              <Confetti recycle={false} numberOfPieces={220} />
              <h3 className="text-3xl font-bold text-rose-300">You Solved It!</h3>
              <p className="mt-3 max-w-xl text-sm text-slate-200">{successMessage}</p>
              <button
                onClick={restart}
                className="mt-6 rounded-full bg-fuchsia-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-fuchsia-500/30 transition hover:bg-fuchsia-600"
              >
                Replay Puzzle
              </button>
            </div>
          )}
        </div>
      </div>

      {isSolved && <CelebrationBurst duration={1200} />}
    </div>
  );
}
