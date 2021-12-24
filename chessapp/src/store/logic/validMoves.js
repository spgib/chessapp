import rawMoves from './rawMoves';

const validMoves = (board, row, column) => {
  let moves = rawMoves(board, row, column);

  return moves;
}

export default validMoves;