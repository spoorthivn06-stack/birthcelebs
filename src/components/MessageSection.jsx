import wishes from '../data/wishes.js';

function MessageSection() {
  return (
    <section id="messages" className="rounded-3xl border border-white/10 bg-slate-900/90 p-8 shadow-glow">
      <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-orange-300/90">Messages</p>
          <h2 className="mt-2 text-3xl font-semibold text-white">Warm wishes and memories</h2>
        </div>
        <p className="max-w-xl text-slate-400">Browse your birthday shower of messages and feel the love from friends and family.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {wishes.map((wish) => (
          <div key={wish.id} className="rounded-3xl border border-white/10 bg-slate-950/80 p-6 transition hover:-translate-y-1 hover:border-orange-400/30">
            <p className="mb-4 text-slate-200">"{wish.message}"</p>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-300">{wish.author}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default MessageSection;
