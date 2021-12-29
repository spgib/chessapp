import { castling, enPassant } from './specialMoves';
import { checkFilter } from './checkLogic';

const legalSquare = (x, y) => {
  return x >= 0 && x < 8 && y >= 0 && y < 8;
};

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
  
  if (piece.type === 'knight') {
    moves.push([row + 2, column - 1],[row + 2, column + 1],[row - 2, column - 1],[row - 2, column + 1],[row + 1, column - 2],[row - 1, column - 2],[row + 1, column + 2],[row - 1, column + 2]);
    moves = moves.filter(move => {
      return legalSquare(move[0], move[1]) && (board[move[0]][move[1]].color !== piece.color);
    });
  }

  if (piece.type === 'bishop') {
    let ne, nw, se, sw;
    for (let x = 1; x < 8; x++) {
      if (legalSquare(row - x, column + x)) {
        if (!ne) {
          moves.push([row - x, column + x]);
          if (board[row - x][column + x].type) ne = true;
        }
      }
      if (legalSquare(row + x, column + x)) {
        if (!se) {
          moves.push([row + x, column + x]);
          if (board[row + x][column + x].type) se = true;
        }
      }
      if (legalSquare(row + x, column - x)) {
        if (!sw) {
          moves.push([row + x, column - x]);
          if (board[row + x][column - x].type) sw = true;
        }
      }
      if (legalSquare(row - x, column - x)) {
        if (!nw) {
          moves.push([row - x, column - x]);
          if (board[row - x][column - x].type) nw = true;
        }
      }
    }
    moves = moves.filter(move => board[move[0]][move[1]].color !== piece.color);
  }

  if (piece.type === 'queen') {
    let n, ne, e, se, s, sw, w, nw;
    for (let x = 1; x < 8; x++) {
      if (legalSquare(row - x, column)) {
        if (!n) {
          moves.push([row - x, column]);
          if (board[row - x][column].type) n = true;
        }
      }
      if (legalSquare(row - x, column + x)) {
        if (!ne) {
          moves.push([row - x, column + x]);
          if (board[row - x][column + x].type) ne = true;
        }
      }
      if (legalSquare(row, column + x)) {
        if (!e) {
          moves.push([row, column + x]);
          if (board[row][column + x].type) e = true;
        }
      }
      if (legalSquare(row + x, column + x)) {
        if (!se) {
          moves.push([row + x, column + x]);
          if (board[row + x][column + x].type) se = true;
        }
      }
      if (legalSquare(row + x, column)) {
        if (!s) {
          moves.push([row + x, column]);
          if (board[row + x][column].type) s = true;
        }
      }
      if (legalSquare(row + x, column - x)) {
        if (!sw) {
          moves.push([row + x, column - x]);
          if (board[row + x][column - x].type) sw = true;
        }
      }
      if (legalSquare(row, column - x)) {
        if (!w) {
          moves.push([row, column - x]);
          if (board[row][column - x].type) w = true;
        }
      }
      if (legalSquare(row - x, column - x)) {
        if (!nw) {
          moves.push([row - x, column - x]);
          if (board[row - x][column - x].type) nw = true;
        }
      }
    }
    moves = moves.filter(move => board[move[0]][move[1]].color !== piece.color);
  }

  if (piece.type === 'king') {
    moves.push([row + 1, column],[row - 1, column],[row, column + 1],[row, column - 1],[row + 1, column + 1],[row + 1, column - 1],[row - 1, column + 1],[row - 1, column - 1]);
    moves = moves.filter(move => {
      return legalSquare(move[0], move[1]) && (board[move[0]][move[1]].color !== piece.color);
    });
  }

  return moves;
};

const totalBoardMoves = board => {
  let totalMoves = [];

  for (let x = 0; x < 8; x++) {
    for (let y = 0; y < 8; y++) {
      if (board[x][y].type) {
        totalMoves.push({
          type: board[x][y].type,
          origin: {row: x, column: y},
          color: board[x][y].color,
          targets: rawMoves(board, x, y)
        })
      }
    }
  }

  return totalMoves;
}

const validMoves = (board, row, column, history) => {
  let moves = rawMoves(board, row, column);
  moves = castling(board, row, column, history, moves);
  moves = enPassant(board, row, column, history, moves);
  moves = checkFilter(board, row, column, moves);

  return moves;
}

export { totalBoardMoves, validMoves };