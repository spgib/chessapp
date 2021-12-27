import rawMoves from './rawMoves';
import { checkFilter } from './checkFilter';

const validMoves = (board, row, column) => {
  let moves = rawMoves(board, row, column);
  moves = checkFilter(board, row, column, moves);

  return moves;
}

export default validMoves;