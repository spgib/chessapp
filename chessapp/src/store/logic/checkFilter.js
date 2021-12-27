import totalBoardMoves from './totalBoardMoves';

const isCheck = (board, color) => {
  const potentialMoves = totalBoardMoves(board);

  potentialMoves.forEach((piece) => {
    piece.targets = piece.targets
      .map((target) => {
        if (board[target[0]][target[1]].type) {
          return {
            type: board[target[0]][target[1]].type,
            color: board[target[0]][target[1]].color,
          };
        } else return null;
      })
      .filter((target) => target);
  });

  const movesThatCaptureKing = potentialMoves.filter((piece) => {
    return piece.targets.some(target => target.type === 'king' && target.color === color);
  });

  return movesThatCaptureKing.length !== 0;
};

const checkFilter = (board, row, column, moves) => {
  moves = moves.filter(move => {
    const newBoard = JSON.parse(JSON.stringify(board));
    const piece = newBoard[row][column];
    newBoard[move[0]][move[1]] = piece;
    newBoard[row][column] = {};

    return !isCheck(newBoard, piece.color);
  });

  return moves;
}

export { isCheck, checkFilter };
