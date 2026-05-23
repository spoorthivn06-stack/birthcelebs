function Gallery({ onNext, onOpenCake, onOpenBalloons, onOpenHug }) {
  const photos = [
    { id: 1, label: 'Cake Surprise', mood: 'A glowing cake moment full of smiles.', emoji: '🎂' },
    { id: 2, label: 'Balloon Dream', mood: 'Colorful balloons and warm wishes.', emoji: '🎈' },
    { id: 3, label: 'Golden Hug', mood: 'A tender embrace that feels like home.', emoji: '🤗' },
  ];

  return (
    <section className="rounded-[2rem] border border-white/10 bg-white/10 p-8 shadow-2xl shadow-blue-500/10 backdrop-blur-xl">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.32em] text-sky-200/80">Photo Gallery</p>
          <h2 className="mt-2 text-3xl font-semibold text-slate-100">Your favorite moments</h2>
        </div>
        <p className="max-w-xl text-sm text-slate-400">A soft gallery of the sweetest visual memories from our story.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {photos.map((photo) => (
          <button
            key={photo.id}
            type="button"
            onClick={() => {
              if (photo.id === 1) return onOpenCake && onOpenCake();
              if (photo.id === 2) return onOpenBalloons && onOpenBalloons();
              if (photo.id === 3) return onOpenHug && onOpenHug();
            }}
            className="text-left rounded-[1.75rem] border border-white/10 bg-slate-950/90 p-5 shadow-[0_30px_80px_rgba(15,23,42,0.35)] transition hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-pink-400"
          >
            <div className="mb-5 flex h-40 items-center justify-center rounded-3xl bg-gradient-to-br from-fuchsia-500 via-violet-500 to-pink-500 text-6xl text-white">
              {photo.emoji}
            </div>
            <h3 className="text-xl font-semibold text-white">{photo.label}</h3>
            <p className="mt-3 text-sm leading-7 text-slate-300">{photo.mood}</p>
          </button>
        ))}
      </div>

      <div className="mt-8 text-center">
        <button
          onClick={onNext}
          className="inline-flex rounded-full bg-gradient-to-r from-cyan-400 via-violet-500 to-fuchsia-500 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 hover:-translate-y-0.5"
        >
          Continue to Future Plans
        </button>
      </div>
    </section>
  );
}

export default Gallery;
