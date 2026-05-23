export default function BackgroundSelector({ value, onChange }) {
  const backgrounds = [
    { name: 'Gradient Purple', type: 'gradient', gradient: 'from-purple-900 via-slate-900 to-purple-900' },
    { name: 'Gradient Blue', type: 'gradient', gradient: 'from-blue-900 via-slate-900 to-indigo-900' },
    { name: 'Gradient Rose', type: 'gradient', gradient: 'from-rose-900 via-slate-900 to-pink-900' },
    { name: 'Dark Plain', type: 'plain', gradient: 'bg-slate-950' },
    { name: 'Gradient Neon', type: 'gradient', gradient: 'from-cyan-900 via-slate-900 to-purple-900' },
  ];

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-slate-200">Background Style</label>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {backgrounds.map((bg) => (
          <button
            key={bg.name}
            type="button"
            onClick={() => onChange(bg.name)}
            className={`rounded-3xl border-2 p-4 transition ${
              value === bg.name
                ? 'border-white'
                : 'border-white/10 hover:border-white/20'
            }`}
          >
            <div className={`mb-3 h-16 rounded-2xl bg-gradient-to-br ${bg.gradient}`} />
            <p className="text-xs font-medium text-slate-100">{bg.name}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
