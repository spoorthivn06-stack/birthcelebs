import React from 'react';
import { motion } from 'framer-motion';

export default function PuzzleTile({ piece, dragConstraints, onDragStart, onDragEnd }) {
  const tileStyle = {
    width: piece.width,
    height: piece.height,
    boxShadow: piece.placed
      ? '0 24px 60px rgba(14, 165, 233, 0.16)'
      : '0 18px 40px rgba(15, 23, 42, 0.35)',
  };

  const imageStyle = {
    width: piece.width,
    height: piece.height,
    backgroundImage: `url(${piece.image})`,
    backgroundSize: `${piece.size * 100}%`,
    backgroundPosition: `${(piece.col / (piece.size - 1)) * 100}% ${(piece.row / (piece.size - 1)) * 100}%`,
    borderRadius: '1.25rem',
  };

  return (
    <motion.button
      type="button"
      drag={!piece.placed}
      dragMomentum={false}
      dragConstraints={dragConstraints}
      dragElastic={0.12}
      onDragStart={onDragStart}
      onDragEnd={(_, info) => onDragEnd(info.offset.x, info.offset.y)}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        x: piece.currentX,
        y: piece.currentY,
        zIndex: piece.placed ? 1 : 10,
        borderRadius: '1.25rem',
        border: piece.placed ? '2px solid rgba(255,255,255,0.25)' : '2px solid rgba(255,255,255,0.08)',
        backgroundColor: '#0f172a',
        cursor: piece.placed ? 'default' : 'grab',
        ...tileStyle,
      }}
      whileHover={{ scale: piece.placed ? 1 : 1.02 }}
      whileTap={{ scale: piece.placed ? 1 : 0.98 }}
      className={`rounded-[1.25rem] overflow-hidden ${piece.placed ? 'opacity-90' : 'opacity-100'}`}
    >
      <div style={imageStyle} className={`h-full w-full pointer-events-none rounded-[1.25rem] ${piece.nearTarget ? 'ring-2 ring-emerald-300/70' : ''}`} />
    </motion.button>
  );
}
