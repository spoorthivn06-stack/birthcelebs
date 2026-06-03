import { useEffect, useMemo, useRef, useState } from 'react';
import shuffleCards from '../utils/shuffleCards';
import calculateScore from '../utils/scoreCalculator';

const DEFAULT_SYMBOLS = ['heart','letter','rose','ring','teddy','chocolate','gift','couple'];

export default function useMemoryGame({ size = 4 } = {}) {
  const pairCount = (size * size) / 2;
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [startedAt, setStartedAt] = useState(null);
  const [completed, setCompleted] = useState(false);
  const timerRef = useRef(null);
  const [time, setTime] = useState(0);

  useEffect(() => {
    reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (startedAt && !completed) {
      timerRef.current = setInterval(() => setTime(Date.now() - startedAt), 200);
    }
    return () => clearInterval(timerRef.current);
  }, [startedAt, completed]);

  function buildDeck() {
    const symbols = DEFAULT_SYMBOLS.slice(0, pairCount);
    const pairs = symbols.flatMap((s) => [ { symbol: s }, { symbol: s } ]);
    const shuffled = shuffleCards(pairs).map((c, i) => ({ ...c, id: i, flipped: false, matched: false }));
    return shuffled;
  }

  function reset() {
    const deck = buildDeck();
    setCards(deck);
    setFlipped([]);
    setMoves(0);
    setMatches(0);
    setStartedAt(null);
    setTime(0);
    setCompleted(false);
  }

  function flipCard(id) {
    if (!startedAt) setStartedAt(Date.now());
    const card = cards.find((c) => c.id === id);
    if (!card || card.flipped || card.matched || flipped.length === 2) return;
    const newCards = cards.map((c) => (c.id === id ? { ...c, flipped: true } : c));
    const newFlipped = [...flipped, id];
    setCards(newCards);
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((m) => m + 1);
      const [a, b] = newFlipped.map((i) => newCards.find((c) => c.id === i));
      if (a.symbol === b.symbol) {
        const matchedCards = newCards.map((c) => (c.symbol === a.symbol ? { ...c, matched: true } : c));
        setCards(matchedCards);
        setFlipped([]);
        setMatches((m) => m + 1);
      } else {
        // flip back after a delay
        setTimeout(() => {
          setCards((prev) => prev.map((c) => (newFlipped.includes(c.id) ? { ...c, flipped: false } : c)));
          setFlipped([]);
        }, 1000);
      }
    }
  }

  useEffect(() => {
    const totalMatches = pairCount;
    if (matches === totalMatches) {
      setCompleted(true);
      clearInterval(timerRef.current);
    }
  }, [matches, pairCount]);

  const score = useMemo(() => calculateScore(100, moves), [moves]);

  return { cards, flipCard, moves, time, matches, score, resetGame: reset, completed };
}
