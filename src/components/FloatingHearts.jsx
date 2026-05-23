import { motion } from 'framer-motion';

const colors = ['bg-pink-400/80', 'bg-violet-400/80', 'bg-rose-400/70', 'bg-fuchsia-400/80', 'bg-pink-300/70'];

export default function FloatingHearts({ count = 8 }) {
  const hearts = Array.from({ length: count }, (_, index) => ({
    size: 14 + (index % 4) * 3,
    left: `${8 + (index * 9)}%`,
    delay: (index % 5) * 0.6,
    color: colors[index % colors.length],
  }));

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {hearts.map((heart, index) => (
        <motion.span
          key={index}
          className={`${heart.color} absolute inline-flex -translate-x-1/2 rounded-full opacity-90 shadow-[0_0_45px_rgba(236,72,153,0.35)]`}
          initial={{ y: 0, opacity: 0 }}
          animate={{ y: [-30, 12, -26, 0], opacity: [0, 0.85, 0.85, 0.75] }}
          transition={{ duration: 7, delay: heart.delay, repeat: Infinity, ease: 'easeInOut' }}
          style={{ left: heart.left, top: `${12 + index * 11}%`, width: heart.size, height: heart.size }}
        >
          <span className="absolute left-1/2 top-1/4 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-white/80" />
        </motion.span>
      ))}
    </div>
  );
}
