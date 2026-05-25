import { motion } from 'framer-motion';

export default function GoldVideoModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 px-4 py-8 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 20 }}
        transition={{ duration: 0.35 }}
        className="w-full max-w-3xl overflow-hidden rounded-[2rem] border border-amber-200/20 bg-slate-950 shadow-2xl shadow-amber-500/20"
      >
        <div className="border-b border-white/10 bg-gradient-to-r from-amber-500/20 via-pink-500/10 to-fuchsia-500/20 px-5 py-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.32em] text-amber-100/80">Golden Hug</p>
              <h2 className="mt-1 text-xl font-semibold text-white">A warm little video surprise</h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-semibold text-white hover:bg-white/20"
            >
              Close
            </button>
          </div>
        </div>
        <video
          src="/videos/golden-hug.mp4"
          className="aspect-video w-full bg-black object-contain"
          controls
          autoPlay
          playsInline
        />
      </motion.div>
    </div>
  );
}
