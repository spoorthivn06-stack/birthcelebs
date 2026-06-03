import React from 'react';

export default function ScoreBoard({ moves, time, matches, score }) {
  return (
    <div className="flex items-center gap-4 text-sm text-slate-200">
      <div><strong>Moves:</strong> {moves}</div>
      <div><strong>Time:</strong> {Math.floor(time / 1000)}s</div>
      <div><strong>Matches:</strong> {matches}</div>
      <div className="font-semibold text-pink-300"><strong>Score:</strong> {score}</div>
    </div>
  );
}
