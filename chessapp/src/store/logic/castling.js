import { checkFilter } from './checkFilter';

const castling = (board, row, column, history, moves) => {
  const piece = board[row][column];
  moves = [...moves];

  if (piece.type !== 'king') {
    return moves;
  } else {
    const virginKing = history
      ? !history.some(
          (entry) => entry.originType === 'king' && entry.turn === piece.color
        )
      : true;
    const virginKingsideRook = history
      ? !history.some((entry) => {
          if (piece.color === 'white') {
            return entry.origin.row === 7 && entry.origin.column === 7;
          } else {
            return entry.origin.row === 0 && entry.origin.column === 7;
          }
        })
      : true;
    const virginQueensideRook = history
      ? !history.some((entry) => {
          if (piece.color === 'white') {
            return entry.origin.row === 7 && entry.origin.column === 0;
          } else {
            return entry.origin.row === 0 && entry.origin.column === 0;
          }
        })
      : true;

    if (
      virginKing &&
      virginKingsideRook &&
      !board[row][column + 1].type &&
      !board[row][column + 2].type
    ) {
      let inThroughAndTo = [
        [row, column],
        [row, column + 1],
        [row, column + 2],
      ];
      inThroughAndTo = checkFilter(board, row, column, inThroughAndTo);
      if (inThroughAndTo.length === 3) {
        moves.push([row, column + 2]);
      }
    }

    if (
      virginKing &&
      virginQueensideRook &&
      !board[row][column - 1].type &&
      !board[row][column - 2].type &&
      !board[row][column - 3].type
    ) {
      let inThroughAndTo = [
        [row, column],
        [row, column - 1],
        [row, column - 2],
      ];
      inThroughAndTo = checkFilter(board, row, column, inThroughAndTo);
      if (inThroughAndTo.length === 3) {
        moves.push([row, column - 2]);
      }
    }
  }
  return moves;
};

export default castling;
