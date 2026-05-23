function BirthdayCard() {
  return (
    <section className="rounded-3xl border border-white/10 bg-slate-900/90 p-8 shadow-glow">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-orange-300/90">Birthday card</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">A cute flip card surprise</h2>
        </div>
        <div className="rounded-full bg-orange-400/20 px-3 py-2 text-sm text-orange-200">Flip me</div>
      </div>
      <div className="card-flip rounded-3xl bg-slate-950 p-5 shadow-xl shadow-orange-500/10">
        <div className="card-flip-inner rounded-3xl border border-white/5 bg-slate-900/90 p-8">
          <div className="card-front space-y-4 text-slate-200">
            <p className="text-lg">Happy Birthday!</p>
            <p className="text-slate-400">May this year bring you new adventures, heartfelt laughter, and cake that never ends.</p>
          </div>
          <div className="card-back absolute inset-0 flex flex-col items-center justify-center rounded-3xl bg-gradient-to-br from-orange-400 to-pink-500 text-center text-white">
            <span className="mb-4 text-4xl">🎉</span>
            <p className="max-w-sm text-lg font-semibold">You are amazing, and today is your day to shine.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BirthdayCard;
