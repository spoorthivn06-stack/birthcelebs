import { useRef } from 'react';

export default function MusicUploader({ value, onChange }) {
  const inputRef = useRef();

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('audio/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        onChange({
          file: event.target.result,
          name: file.name,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-slate-200">Background Music (Optional)</label>
      <div className="rounded-3xl border-2 border-dashed border-white/10 bg-slate-900/50 p-6 transition hover:border-white/20">
        <input
          ref={inputRef}
          type="file"
          accept="audio/*"
          onChange={handleFileChange}
          className="hidden"
        />
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex w-full flex-col items-center gap-2 text-center"
        >
          <span className="text-3xl">🎵</span>
          <p className="text-sm font-medium text-slate-200">Click to upload custom music</p>
          <p className="text-xs text-slate-400">MP3, WAV, OGG (up to 10MB)</p>
        </button>
      </div>
      {value?.name && (
        <div className="rounded-2xl border border-white/10 bg-slate-950/80 p-3 flex items-center justify-between">
          <p className="text-sm text-slate-300">🎶 {value.name}</p>
          <button
            type="button"
            onClick={() => onChange(null)}
            className="text-red-400 hover:text-red-300"
          >
            ✕
          </button>
        </div>
      )}
      <p className="text-xs text-slate-400">
        Viewers will hear this music during their experience. They cannot mute it.
      </p>
    </div>
  );
}
