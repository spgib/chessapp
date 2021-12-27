const enPassant = (board, row, column, history, moves) => {
  if (history.length === 0) return moves;
  moves = [...moves];

  const piece = board[row][column];
  const lastMove = history[history.length - 1];

  if (
    lastMove.originType === 'pawn' &&
    Math.abs(lastMove.origin.row - lastMove.target.row) === 2 &&
    piece.type === 'pawn' &&
    row === lastMove.target.row &&
    (column === lastMove.target.column + 1 ||
      column === lastMove.target.column - 1)
  ) {
    const newRow =
      lastMove.origin.row > lastMove.target.row
        ? lastMove.origin.row - 1
        : lastMove.origin.row + 1;
    moves.push([newRow, lastMove.target.column])
  }

  return moves;
};

export default enPassant;
