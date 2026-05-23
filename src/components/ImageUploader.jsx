import { useState } from 'react';

export default function ImageUploader({ value, onChange, maxImages = 6 }) {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = [...e.dataTransfer.files];
    files.forEach((file) => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (value.length < maxImages) {
            onChange([...value, event.target.result]);
          }
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const handleInputChange = (e) => {
    const files = [...e.target.files];
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (value.length < maxImages) {
          onChange([...value, event.target.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index) => {
    onChange(value.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-slate-200">Slideshow Images</label>
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`rounded-3xl border-2 border-dashed p-8 text-center transition ${
          dragActive ? 'border-pink-400 bg-pink-500/10' : 'border-white/10 bg-slate-900/50'
        }`}
      >
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleInputChange}
          disabled={value.length >= maxImages}
          className="hidden"
          id="image-upload"
        />
        <label htmlFor="image-upload" className="cursor-pointer">
          <p className="text-sm font-medium text-slate-200">Drag images here or click to browse</p>
          <p className="mt-1 text-xs text-slate-400">PNG, JPG, GIF up to 10MB</p>
          <p className="mt-2 text-xs text-slate-500">
            {value.length} / {maxImages} images uploaded
          </p>
        </label>
      </div>

      {value.length > 0 && (
        <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {value.map((image, index) => (
            <div key={index} className="relative rounded-2xl overflow-hidden">
              <img src={image} alt={`Uploaded ${index + 1}`} className="h-24 w-full object-cover" />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition hover:opacity-100"
              >
                <span className="text-2xl">✕</span>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
