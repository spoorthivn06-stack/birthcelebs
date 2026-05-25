import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function ScratchCard({ recipientName, wishType = 'Birthday', onNext, themeStyle }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [scratching, setScratching] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const displayName = recipientName?.trim() || 'you';
  const occasion = wishType?.trim() || 'Birthday';
  const headline = occasion === 'Birthday' ? 'Happy Birthday' : occasion === 'Anniversary' ? 'Happy Anniversary' : occasion === 'Valentine' ? "Happy Valentine's Day" : occasion;
  const accent = themeStyle?.accent || 'from-fuchsia-500 via-pink-500 to-rose-500';
  const accentSoft = themeStyle?.accentSoft || accent;
  const accentText = themeStyle?.text || 'text-pink-200/80';

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return undefined;

    const drawCover = () => {
      const bounds = container.getBoundingClientRect();
      const scale = window.devicePixelRatio || 1;
      canvas.width = Math.floor(bounds.width * scale);
      canvas.height = Math.floor(bounds.height * scale);
      canvas.style.width = `${bounds.width}px`;
      canvas.style.height = `${bounds.height}px`;

      const context = canvas.getContext('2d');
      context.setTransform(scale, 0, 0, scale, 0, 0);
      const gradient = context.createLinearGradient(0, 0, bounds.width, bounds.height);
      gradient.addColorStop(0, '#e5e7eb');
      gradient.addColorStop(0.5, '#94a3b8');
      gradient.addColorStop(1, '#f8fafc');
      context.globalCompositeOperation = 'source-over';
      context.fillStyle = gradient;
      context.fillRect(0, 0, bounds.width, bounds.height);

      context.fillStyle = 'rgba(15, 23, 42, 0.28)';
      for (let x = -bounds.height; x < bounds.width; x += 18) {
        context.fillRect(x, 0, 8, bounds.height * 2);
      }

      context.fillStyle = 'rgba(15, 23, 42, 0.72)';
      context.font = '700 18px Inter, sans-serif';
      context.textAlign = 'center';
      context.fillText('Scratch here', bounds.width / 2, bounds.height / 2 - 6);
      context.font = '500 13px Inter, sans-serif';
      context.fillText('Reveal the surprise', bounds.width / 2, bounds.height / 2 + 22);
    };

    drawCover();
    window.addEventListener('resize', drawCover);
    return () => window.removeEventListener('resize', drawCover);
  }, []);

  const scratchAt = (clientX, clientY) => {
    const canvas = canvasRef.current;
    if (!canvas || revealed) return;

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    const context = canvas.getContext('2d');

    context.globalCompositeOperation = 'destination-out';
    context.beginPath();
    context.arc(x, y, 28, 0, Math.PI * 2);
    context.fill();

    const pixels = context.getImageData(0, 0, canvas.width, canvas.height).data;
    let cleared = 0;
    for (let index = 3; index < pixels.length; index += 16) {
      if (pixels[index] === 0) cleared += 1;
    }

    if (cleared / (pixels.length / 16) > 0.42) {
      context.clearRect(0, 0, canvas.width, canvas.height);
      setRevealed(true);
    }
  };

  const handlePointerMove = (event) => {
    if (!scratching) return;
    scratchAt(event.clientX, event.clientY);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`rounded-[2rem] border border-white/10 bg-white/10 p-8 shadow-2xl ${themeStyle?.shadow || 'shadow-pink-500/20'} backdrop-blur-xl`}
    >
      <div className="space-y-6 text-center text-slate-100">
        <p className={`text-sm uppercase tracking-[0.32em] ${accentText}`}>Scratch Card</p>
        <h2 className="text-3xl font-semibold sm:text-4xl">Reveal the hidden wish</h2>

        <div
          ref={containerRef}
          className="relative mx-auto aspect-[5/3] w-full max-w-2xl overflow-hidden rounded-[2rem] border border-white/15 bg-slate-950/80 shadow-[0_30px_80px_rgba(15,23,42,0.45)] touch-none"
        >
          <div className={`absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br ${accentSoft} p-8 text-white`}>
            <p className="text-sm uppercase tracking-[0.32em] text-white/80">Surprise</p>
            <h3 className="mt-3 text-4xl font-bold sm:text-5xl">{headline}, {displayName}!</h3>
            <p className="mt-4 max-w-md text-base leading-7 text-white/85">
              May this moment bring a smile that stays with you all day.
            </p>
          </div>
          <canvas
            ref={canvasRef}
            className={`absolute inset-0 h-full w-full cursor-crosshair transition-opacity duration-500 ${revealed ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
            onPointerDown={(event) => {
              event.currentTarget.setPointerCapture(event.pointerId);
              setScratching(true);
              scratchAt(event.clientX, event.clientY);
            }}
            onPointerMove={handlePointerMove}
            onPointerUp={() => setScratching(false)}
            onPointerCancel={() => setScratching(false)}
            aria-label="Scratch to reveal birthday message"
          />
        </div>

        <button
          type="button"
          onClick={onNext}
          className={`inline-flex rounded-full bg-gradient-to-r ${accent} px-8 py-3 text-sm font-semibold text-white shadow-lg ${themeStyle?.shadow || 'shadow-pink-500/20'} hover:-translate-y-0.5`}
        >
          {revealed ? 'Continue to Cake' : 'Skip to Cake'}
        </button>
      </div>
    </motion.section>
  );
}

