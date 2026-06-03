import React from 'react';

export default function PuzzleControls({ completed, total, progress, time, showTimer, onRestart }) {
  const formattedTime = new Date(time).toISOString().substr(14, 5);

  return (
    <div className="flex flex-wrap items-center gap-3 text-sm text-slate-200">
      <div className="rounded-3xl bg-slate-900/80 px-4 py-3 text-slate-100">
        <p className="text-[11px] uppercase tracking-[0.24em] text-slate-400">Progress</p>
        <p className="mt-1 text-base font-semibold">{completed} / {total}</p>
      </div>
      <div className="rounded-3xl bg-slate-900/80 px-4 py-3 text-slate-100">
        <p className="text-[11px] uppercase tracking-[0.24em] text-slate-400">Complete</p>
        <p className="mt-1 text-base font-semibold">{Math.round(progress)}%</p>
      </div>
      {showTimer && (
        <div className="rounded-3xl bg-slate-900/80 px-4 py-3 text-slate-100">
          <p className="text-[11px] uppercase tracking-[0.24em] text-slate-400">Time</p>
          <p className="mt-1 text-base font-semibold">{formattedTime}</p>
        </div>
      )}
      <button onClick={onRestart} className="rounded-full bg-fuchsia-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-fuchsia-600">
        Restart
      </button>
    </div>
  );
}
