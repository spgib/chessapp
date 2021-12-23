import legalSquare from './legalSquare';

const rawMoves = (board, row, column) => {
  const piece = board[row][column];

  let moves = [];

  if (piece.type === 'pawn') {
    if (piece.color === 'white') {
      if (legalSquare(row - 1, column) && !board[row - 1][column].type)
        moves.push([row - 1, column]);
      if (row === 6 && !board[4][column].type && !board[5][column].type)
        moves.push([row - 2, column]);
      if (
        legalSquare(row - 1, column - 1) &&
        board[row - 1][column - 1].color === 'black'
      )
        moves.push([row - 1, column - 1]);
      if (
        legalSquare(row - 1, column + 1) &&
        board[row - 1][column + 1].color === 'black'
      )
        moves.push([row - 1, column + 1]);
    } else {
      if (legalSquare(row + 1, column) && !board[row + 1][column].type)
        moves.push([row + 1, column]);
      if (row === 1 && !board[3][column].type && !board[2][column].type)
        moves.push([row + 2, column]);
      if (legalSquare(row + 1, column - 1) && board[row + 1][column - 1].color === 'white')
        moves.push([row + 1, column - 1]);
      if (legalSquare(row + 1, column + 1) && board[row + 1][column + 1].color === 'white')
        moves.push([row + 1, column + 1]);
    }
  }

  if (piece.type === 'rook') {
    let n, e, s, w;
    for (let x = 1; x < 8; x++) {
      if (legalSquare(row - x, column)) {
        if (!n) {
          moves.push([row - x, column]);
          if (board[row - x][column].type) n = true;
        }
      }
      if (legalSquare(row, column + x)) {
        if (!e) {
          moves.push([row, column + x]);
          if (board[row][column + x].type) e = true;
        }
      }
      if (legalSquare(row + x, column)) {
        if (!s) {
          moves.push([row + x, column]);
          if (board[row + x][column].type) s = true;
        }
      }
      if (legalSquare(row, column - x)) {
        if (!w) {
          moves.push([row, column - x]);
          if (board[row][column - x].type) w = true;
        }
      }
    }
    moves = moves.filter(move => board[move[0]][move[1]].color !== piece.color);
  }
};
