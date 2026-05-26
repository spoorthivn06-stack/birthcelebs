import { useEffect, useRef, useState } from 'react';

const DEFAULT_TRACK_URL = 'https://assets.mixkit.co/music/preview/mixkit-romantic-memories-1159.mp3';

export default function BackgroundMusic({ src, trackName }) {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.play().catch(() => {});
    } else {
      audioRef.current.pause();
    }
  }, [playing]);

  useEffect(() => {
    if (!audioRef.current) return;
    if (src) {
      audioRef.current.src = src;
    } else {
      audioRef.current.src = DEFAULT_TRACK_URL;
    }
  }, [src]);

  return (
    <div className="fixed right-4 top-4 z-40 flex max-w-[calc(100vw-2rem)] items-center gap-3 rounded-full border border-white/10 bg-slate-950/80 px-4 py-2 text-sm text-slate-200 shadow-xl shadow-black/30 backdrop-blur-xl">
      <audio ref={audioRef} src={src || DEFAULT_TRACK_URL} loop preload="auto" />
      <span className="max-w-40 truncate text-slate-100 sm:max-w-64">
        {trackName ? `Music: ${trackName}` : 'Background music'}
      </span>
      <button
        type="button"
        onClick={() => setPlaying((value) => !value)}
        className="pointer-events-auto rounded-full bg-gradient-to-r from-fuchsia-500 to-orange-400 px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-pink-500/20 transition hover:-translate-y-0.5"
      >
        {playing ? 'Pause' : 'Play'}
      </button>
    </div>
  );
}
