import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const balloonColors = ['bg-red-400', 'bg-blue-400', 'bg-yellow-400', 'bg-purple-400', 'bg-pink-400', 'bg-green-400', 'bg-orange-400', 'bg-indigo-400'];

export default function BalloonWishesDisplay({ wishes, balloonCount, onFinish }) {
  const [poppedBalloons, setPoppedBalloons] = useState(new Set());
  const [currentWish, setCurrentWish] = useState(null);
  const [showWish, setShowWish] = useState(false);
  const [isLastPopup, setIsLastPopup] = useState(false);
  const visibleWishes = wishes.filter((wish) => wish?.trim());

  const balloons = visibleWishes.map((wish, i) => ({
    id: i,
    color: balloonColors[i % balloonColors.length],
    wish,
  }));

  const handleBalloonClick = (balloon) => {
    if (poppedBalloons.has(balloon.id)) return;

    setPoppedBalloons((prev) => {
      const next = new Set(prev);
      next.add(balloon.id);
      setIsLastPopup(next.size === balloons.length);
      return next;
    });

    setCurrentWish(balloon);
    setShowWish(true);
  };

  const closeWish = () => {
    setShowWish(false);
    if (isLastPopup) {
      onFinish();
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/10 p-8 shadow-2xl shadow-pink-500/20 backdrop-blur-xl min-h-[600px]"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {Array.from({ length: 24 }).map((_, index) => (
          <motion.span
            key={index}
            className="absolute inline-flex h-1.5 w-1.5 rounded-full bg-white/80 shadow-[0_0_20px_rgba(255,255,255,0.45)]"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 40}%`,
              opacity: 0.7,
            }}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: [0, 20, 0], opacity: [0, 0.7, 0] }}
            transition={{
              duration: 4 + Math.random() * 3,
              delay: Math.random() * 2,
              repeat: Infinity,
            }}
          />
        ))}
      </div>

      <div className={`relative space-y-6 text-center text-slate-100 transition duration-300 ${showWish ? 'blur-sm' : ''}`}>
        <p className="text-sm uppercase tracking-[0.32em] text-pink-200/80">Your Wishes Await</p>
        <h2 className="text-3xl font-semibold sm:text-4xl">Pop the balloons to reveal your wishes</h2>
        <p className="mx-auto max-w-2xl text-slate-200/90 leading-8">
          Click each balloon to pop it and discover the message added by the creator.
        </p>

        {balloons.length > 0 ? (
          <div className="mt-12 grid gap-6 sm:grid-cols-3 lg:grid-cols-4">
            {balloons.map((balloon) => (
            <motion.button
              key={balloon.id}
              onClick={() => handleBalloonClick(balloon)}
              disabled={poppedBalloons.has(balloon.id)}
              className="relative h-24 w-24 mx-auto disabled:opacity-20 disabled:cursor-not-allowed"
              whileHover={!poppedBalloons.has(balloon.id) ? { scale: 1.05 } : {}}
              whileTap={!poppedBalloons.has(balloon.id) ? { scale: 0.95 } : {}}
            >
              {!poppedBalloons.has(balloon.id) ? (
                <>
                  <motion.div
                    className={`${balloon.color} absolute inset-0 rounded-full shadow-2xl shadow-white/10 cursor-pointer`}
                    whileHover={{ y: -8 }}
                    transition={{ type: 'spring', stiffness: 160, damping: 12 }}
                  />
                  <div className="absolute left-1/2 top-full h-12 w-0.5 -translate-x-1/2 bg-gradient-to-b from-white/40 to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center font-bold text-white text-lg drop-shadow-lg">
                    {balloon.id + 1}
                  </div>
                </>
              ) : (
                <motion.div
                  className="absolute inset-0 flex items-center justify-center text-2xl"
                  initial={{ scale: 1, opacity: 1 }}
                  animate={{ scale: 0.5, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  💥
                </motion.div>
              )}
            </motion.button>
            ))}
          </div>
        ) : (
          <div className="mx-auto mt-10 max-w-xl rounded-[2rem] border border-white/10 bg-slate-950/80 p-8 text-slate-200">
            <p>No balloon wishes were added.</p>
            <button
              type="button"
              onClick={onFinish}
              className="mt-5 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-pink-500/20"
            >
              Continue
            </button>
          </div>
        )}

        <div className="mt-8 text-sm text-slate-300">
          {poppedBalloons.size} / {balloons.length} wishes popped
        </div>
      </div>

      <AnimatePresence>
        {showWish && currentWish && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm px-4 py-6"
            onClick={closeWish}
          >
            <div className="absolute inset-0 overflow-hidden">
              {Array.from({ length: 18 }).map((_, index) => (
                <motion.div
                  key={index}
                  className="absolute h-1.5 w-1.5 rounded-full bg-white/80"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 520, opacity: [0, 0.6, 0] }}
                  transition={{
                    duration: 4 + Math.random() * 2,
                    delay: Math.random() * 1,
                    repeat: Infinity,
                    ease: 'easeIn',
                  }}
                />
              ))}
            </div>

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 120, damping: 16 }}
              className="relative z-10 mx-4 max-w-2xl rounded-[2rem] border border-white/20 bg-gradient-to-br from-fuchsia-700/95 to-pink-600/95 p-8 shadow-2xl shadow-pink-500/40 backdrop-blur-xl text-center sm:p-12"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-white/10 text-3xl">
                ✨
              </div>
              <h3 className="text-2xl font-semibold text-white sm:text-3xl mb-4">Wish {currentWish.id + 1}</h3>
              <p className="text-lg leading-8 text-slate-100 mb-6">{currentWish.wish}</p>
              <button
                onClick={closeWish}
                className="rounded-full bg-gradient-to-r from-pink-500 to-rose-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-pink-500/20"
              >
                {isLastPopup ? 'Finish' : 'Next'}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}

