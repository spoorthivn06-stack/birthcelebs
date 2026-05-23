import { useState } from 'react';

export default function BalloonWishesInput({ balloonCount, wishes, onChange }) {
  const [currentWish, setCurrentWish] = useState('');

  const addWish = () => {
    if (currentWish.trim() && wishes.length < balloonCount) {
      onChange([...wishes, currentWish]);
      setCurrentWish('');
    }
  };

  const removeWish = (index) => {
    onChange(wishes.filter((_, i) => i !== index));
  };

  const updateWish = (index, text) => {
    const updated = [...wishes];
    updated[index] = text;
    onChange(updated);
  };

  return (
    <div className="space-y-6 rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl shadow-slate-900/30">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-200">Promises for Balloons</label>
        <p className="text-xs text-slate-400">
          Create one promise per balloon ({wishes.length} / {balloonCount}). Viewers will pop balloons to reveal each promise!
        </p>
      </div>

      {wishes.length > 0 && (
        <div className="space-y-3">
          <p className="text-xs font-medium text-slate-300">Your promises:</p>
          <div className="grid gap-2 sm:grid-cols-2">
            {wishes.map((wish, index) => (
              <div key={index} className="flex items-start gap-2 rounded-2xl border border-white/10 bg-slate-950/80 p-3">
                <div className="flex-1">
                  <p className="text-xs text-slate-400">Balloon {index + 1}</p>
                  <p className="mt-1 line-clamp-2 text-sm text-slate-100">{wish}</p>
                </div>
                <button
                  type="button"
                  onClick={() => removeWish(index)}
                  className="mt-1 text-lg text-red-400 hover:text-red-300"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {wishes.length < balloonCount && (
        <div className="space-y-3">
          <textarea
            value={currentWish}
            onChange={(e) => setCurrentWish(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter' && e.ctrlKey) {
                addWish();
              }
            }}
            placeholder="Write a promise, wish, or heartfelt message..."
            rows="3"
            className="w-full rounded-3xl border border-white/10 bg-slate-950/80 px-4 py-3 text-slate-100 outline-none focus:ring-2 focus:ring-pink-500/20"
          />
          <button
            type="button"
            onClick={addWish}
            disabled={!currentWish.trim()}
            className="inline-flex rounded-full bg-gradient-to-r from-fuchsia-500 to-pink-500 px-6 py-2 text-sm font-semibold text-white shadow-lg shadow-pink-500/20 disabled:opacity-50"
          >
            Add promise ({wishes.length + 1} / {balloonCount})
          </button>
        </div>
      )}

      {wishes.length === balloonCount && (
        <div className="rounded-2xl border border-green-500/30 bg-green-500/10 p-4">
          <p className="text-sm font-medium text-green-300">✓ All balloons have wishes!</p>
        </div>
      )}
    </div>
  );
}
