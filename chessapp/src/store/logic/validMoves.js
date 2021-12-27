import rawMoves from './rawMoves';
import castling from './castling';
import { checkFilter } from './checkFilter';

const validMoves = (board, row, column, history) => {
  let moves = rawMoves(board, row, column);
  moves = castling(board, row, column, history, moves);
  moves = checkFilter(board, row, column, moves);

  return moves;
}

export default validMoves;