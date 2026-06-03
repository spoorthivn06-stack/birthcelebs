import React from 'react';
import { motion } from 'framer-motion';

import Icons from './icons.jsx';

export default function MemoryCard({ card, onClick, focused }) {
  const icon = Icons[card.symbol] || Icons.heart;

  return (
    <div className="relative">
      <motion.button
        onClick={onClick}
        disabled={card.matched || card.flipped}
        whileTap={{ scale: 0.98 }}
        tabIndex={0}
        aria-pressed={card.flipped}
        className={`w-full aspect-square rounded-xl sm:rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900 to-slate-800 p-2 sm:p-3 shadow-lg ${card.matched ? 'ring-4 ring-pink-400/40' : ''} ${focused ? 'ring-2 ring-cyan-300' : ''}`}
      >
        <div className="relative w-full h-full">
          <motion.div
            animate={{ rotateY: card.flipped || card.matched ? 0 : 180 }}
            transition={{ duration: 0.45 }}
            className="absolute inset-0 flex items-center justify-center backface-hidden"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {card.flipped || card.matched ? (
              <div className="flex items-center justify-center">{icon}</div>
            ) : (
              <div className="w-full h-full rounded-2xl bg-white/5 flex items-center justify-center"> 
                <div className="text-slate-300">?</div>
              </div>
            )}
          </motion.div>
        </div>
      </motion.button>
    </div>
  );
}
