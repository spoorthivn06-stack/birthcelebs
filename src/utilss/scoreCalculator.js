export default function calculateScore(base = 100, moves = 0) {
  const result = Math.max(0, base - moves);
  return result;
}
