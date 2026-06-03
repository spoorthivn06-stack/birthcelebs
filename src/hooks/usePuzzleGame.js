import { useState, useEffect, useRef } from "react";
import { createPuzzlePieces, boardSize } from "../utilss/puzzleGenerator.js";

export default function usePuzzleGame({ image = "/image.png", size = 4, revealDuration = 4000 }) {
  const [pieces, setPieces] = useState([]);
  const [completed, setCompleted] = useState(0);
  const [progress, setProgress] = useState(0);
  const [time, setTime] = useState(0);
  const [isSolved, setIsSolved] = useState(false);
  const [showReveal, setShowReveal] = useState(true);

  const timerRef = useRef(null);

  useEffect(() => {
    const initialPieces = createPuzzlePieces(image, size, boardSize);
    setPieces(initialPieces);

    const revealTimeout = setTimeout(() => {
      setShowReveal(false);
      startTimer();
    }, revealDuration);

    return () => clearTimeout(revealTimeout);
  }, [image, size, revealDuration]);

  const startTimer = () => {
    timerRef.current = setInterval(() => setTime((t) => t + 1000), 1000);
  };

  const stopTimer = () => clearInterval(timerRef.current);

  const restart = () => {
    stopTimer();
    setTime(0);
    setCompleted(0);
    setProgress(0);
    setIsSolved(false);
    setShowReveal(true);
    const resetPieces = createPuzzlePieces(image, size, boardSize);
    setPieces(resetPieces);
    setTimeout(() => {
      setShowReveal(false);
      startTimer();
    }, revealDuration);
  };

  const handleDragStart = () => {};

  const handleDragEnd = (id, offsetX, offsetY) => {
    setPieces((prev) => {
      const updated = prev.map((piece) => {
        if (piece.id === id) {
          const dx = piece.currentX + offsetX - piece.correctX;
          const dy = piece.currentY + offsetY - piece.correctY;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 30) {
            piece.currentX = piece.correctX;
            piece.currentY = piece.correctY;
            piece.placed = true;
          } else {
            piece.currentX += offsetX;
            piece.currentY += offsetY;
          }
        }
        return piece;
      });

      const placedCount = updated.filter((p) => p.placed).length;
      setCompleted(placedCount);
      setProgress((placedCount / updated.length) * 100);

      if (placedCount === updated.length) {
        stopTimer();
        setIsSolved(true);
      }

      return updated;
    });
  };

  const dragConstraints = { top: 0, left: 0, right: boardSize, bottom: boardSize };

  return {
    pieces,
    boardSize,
    completed,
    total: pieces.length,
    progress,
    time,
    isSolved,
    showReveal,
    restart,
    handleDragStart,
    handleDragEnd,
    dragConstraints,
  };
}
