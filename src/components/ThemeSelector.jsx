export default function ThemeSelector({ value, onChange }) {
  const themes = [
    { name: 'Party', colors: 'from-orange-400 to-pink-500', label: '🎉' },
    { name: 'Romantic', colors: 'from-rose-400 to-red-500', label: '💖' },
    { name: 'Minimal', colors: 'from-slate-400 to-slate-600', label: '✨' },
    { name: 'Neon', colors: 'from-cyan-400 to-purple-600', label: '⚡' },
    { name: 'Cartoon', colors: 'from-yellow-300 to-orange-400', label: '🎨' },
  ];

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-slate-200">Theme</label>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {themes.map((theme) => (
          <button
            key={theme.name}
            type="button"
            onClick={() => onChange(theme.name)}
            className={`rounded-3xl border-2 p-4 text-center transition ${
              value === theme.name
                ? 'border-white bg-white/10'
                : 'border-white/10 bg-slate-900/50 hover:border-white/20'
            }`}
          >
            <div className={`mx-auto mb-2 inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br ${theme.colors} text-2xl`}>
              {theme.label}
            </div>
            <p className="text-xs font-medium text-slate-100">{theme.name}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
