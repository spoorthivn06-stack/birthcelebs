import useCountdown from '../hooks/useCountdown.js';

function Countdown() {
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 8);
  const { days, hours, minutes, seconds, isComplete } = useCountdown(targetDate);

  return (
    <section className="rounded-3xl border border-white/10 bg-slate-900/90 p-8 shadow-glow">
      <div className="mb-8">
        <p className="text-sm uppercase tracking-[0.24em] text-orange-300/90">Countdown</p>
        <h2 className="mt-2 text-3xl font-semibold text-white">Time until the celebration</h2>
      </div>
      <div className="grid gap-4 sm:grid-cols-4">
        {[
          { label: 'Days', value: days },
          { label: 'Hours', value: hours },
          { label: 'Minutes', value: minutes },
          { label: 'Seconds', value: seconds },
        ].map((item) => (
          <div key={item.label} className="rounded-3xl bg-slate-950/90 p-6 text-center">
            <p className="text-5xl font-semibold text-white">{item.value.toString().padStart(2, '0')}</p>
            <p className="mt-2 text-sm uppercase tracking-[0.24em] text-slate-400">{item.label}</p>
          </div>
        ))}
      </div>
      {isComplete && <p className="mt-6 text-center text-sm text-orange-300">The birthday moment is here — celebrate now!</p>}
    </section>
  );
}

export default Countdown;
