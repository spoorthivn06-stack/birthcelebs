export const boardSize = 420;
const scatterOffset = boardSize * 0.35;

function oppositeEdge(edge) {
  if (edge === 'tab') return 'slot';
  if (edge === 'slot') return 'tab';
  return 'flat';
}

function randomEdge() {
  return Math.random() > 0.5 ? 'tab' : 'slot';
}

function getRandomScatter() {
  return Math.round((Math.random() - 0.5) * scatterOffset);
}

function buildClipPath(edges) {
  const { top, right, bottom, left } = edges;

  return `polygon(
    0% ${top === 'slot' ? '6%' : '0%'},
    24% ${top === 'tab' ? '0%' : top === 'slot' ? '4%' : '0%'},
    32% ${top === 'tab' ? '-6%' : top === 'slot' ? '8%' : '0%'},
    42% ${top === 'tab' ? '0%' : top === 'slot' ? '4%' : '0%'},
    56% ${top === 'tab' ? '0%' : top === 'slot' ? '4%' : '0%'},
    64% ${top === 'tab' ? '-6%' : top === 'slot' ? '8%' : '0%'},
    76% ${top === 'tab' ? '0%' : top === 'slot' ? '4%' : '0%'},
    100% ${top === 'slot' ? '6%' : '0%'},
    100% ${right === 'slot' ? '24%' : '0%'},
    ${right === 'tab' ? '103%' : right === 'slot' ? '96%' : '100%'} 32%,
    ${right === 'tab' ? '103%' : right === 'slot' ? '96%' : '100%'} 42%,
    100% ${right === 'slot' ? '56%' : '100%'},
    100% ${right === 'slot' ? '64%' : '100%'},
    100% ${right === 'tab' ? '103%' : '100%'},
    100% 100%,
    ${bottom === 'tab' ? '76%' : bottom === 'slot' ? '96%' : '100%'} ${bottom === 'tab' ? '103%' : '100%'},
    ${bottom === 'tab' ? '64%' : bottom === 'slot' ? '96%' : '100%'} ${bottom === 'tab' ? '100%' : '100%'},
    ${bottom === 'tab' ? '56%' : bottom === 'slot' ? '96%' : '100%'} ${bottom === 'tab' ? '103%' : '100%'},
    ${bottom === 'tab' ? '42%' : bottom === 'slot' ? '96%' : '100%'} ${bottom === 'tab' ? '100%' : '100%'},
    ${bottom === 'tab' ? '32%' : bottom === 'slot' ? '96%' : '100%'} ${bottom === 'tab' ? '103%' : '100%'},
    ${bottom === 'tab' ? '24%' : bottom === 'slot' ? '96%' : '100%'} ${bottom === 'tab' ? '100%' : '100%'},
    0% 100%,
    0% ${left === 'slot' ? '76%' : '100%'},
    ${left === 'slot' ? '-3%' : '0%'} ${left === 'tab' ? '64%' : '100%'},
    ${left === 'slot' ? '-3%' : '0%'} ${left === 'tab' ? '42%' : '100%'},
    0% ${left === 'slot' ? '32%' : '100%'},
    0% ${left === 'slot' ? '24%' : '100%'},
    0% ${left === 'tab' ? '14%' : '0%'}
  )`;
}

export function createPuzzlePieces(image, size, board = boardSize) {
  const pieceSize = board / size;
  const pieces = [];
  const edgeDefinitions = Array.from({ length: size }, () => Array(size).fill(null));

  for (let row = 0; row < size; row += 1) {
    for (let col = 0; col < size; col += 1) {
      const id = row * size + col;
      const correctX = col * pieceSize;
      const correctY = row * pieceSize;
      const currentX = Math.min(
        Math.max(correctX + getRandomScatter(), 0),
        board - pieceSize,
      );
      const currentY = Math.min(
        Math.max(correctY + getRandomScatter(), 0),
        board - pieceSize,
      );

      const topEdge = row === 0 ? 'flat' : oppositeEdge(edgeDefinitions[row - 1][col].bottom);
      const leftEdge = col === 0 ? 'flat' : oppositeEdge(edgeDefinitions[row][col - 1].right);
      const rightEdge = col === size - 1 ? 'flat' : randomEdge();
      const bottomEdge = row === size - 1 ? 'flat' : randomEdge();

      edgeDefinitions[row][col] = { top: topEdge, left: leftEdge, right: rightEdge, bottom: bottomEdge };
      const clipPath = buildClipPath(edgeDefinitions[row][col]);

      pieces.push({
        id,
        row,
        col,
        size,
        width: pieceSize,
        height: pieceSize,
        image,
        correctX,
        correctY,
        currentX,
        currentY,
        placed: false,
        nearTarget: false,
        clipPath,
        edges: edgeDefinitions[row][col],
      });
    }
  }

  return pieces;
}
