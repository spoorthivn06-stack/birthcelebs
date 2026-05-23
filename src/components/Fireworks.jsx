function Fireworks() {
  return (
    <div className="pointer-events-none relative h-80 overflow-hidden rounded-3xl border border-white/10 bg-slate-950/90 p-6 shadow-glow">
      <div className="absolute inset-0 opacity-80 bg-[radial-gradient(circle_at_top,_rgba(245,158,11,0.12),transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(14,165,233,0.12),transparent_22%)]" />
      <div className="relative flex h-full flex-col items-center justify-center gap-4 text-center text-white">
        <p className="text-sm uppercase tracking-[0.24em] text-orange-300/90">Fireworks</p>
        <h2 className="text-3xl font-semibold">A sparkly celebration burst</h2>
        <p className="max-w-xl text-slate-300">Enjoy an animated burst of color and magic for your special birthday moment.</p>
      </div>
      <div className="pointer-events-none absolute left-10 top-10 h-6 w-6 rounded-full bg-orange-400/80 blur-2xl" />
      <div className="pointer-events-none absolute right-14 top-24 h-5 w-5 rounded-full bg-cyan-400/80 blur-2xl" />
      <div className="pointer-events-none absolute left-20 bottom-14 h-7 w-7 rounded-full bg-pink-400/80 blur-2xl" />
    </div>
  );
}

export default Fireworks;
