import { totalBoardMoves, DEFAULT_BOARD } from './boardLogic';
import { isCheck } from './checkLogic';

const convertPiece = (piece) => {
  if (piece === 'rook') return 'R';
  if (piece === 'knight') return 'N';
  if (piece === 'bishop') return 'B';
  if (piece === 'queen') return 'Q';
  if (piece === 'king') return 'K';
  if (piece === 'R') return 'rook';
  if (piece === 'N') return 'knight';
  if (piece === 'B') return 'bishop';
  if (piece === 'Q') return 'queen';
  if (piece === 'K') return 'king';
};

const convertColumns = (column) => {
  if (column === 0) return 'a';
  if (column === 1) return 'b';
  if (column === 2) return 'c';
  if (column === 3) return 'd';
  if (column === 4) return 'e';
  if (column === 5) return 'f';
  if (column === 6) return 'g';
  if (column === 7) return 'h';
  if (column === 'a') return 0;
  if (column === 'b') return 1;
  if (column === 'c') return 2;
  if (column === 'd') return 3;
  if (column === 'e') return 4;
  if (column === 'f') return 5;
  if (column === 'g') return 6;
  if (column === 'h') return 7;
};

const convertRows = row => {
  if (row === 0) return 8;
  if (row === 1) return 7;
  if (row === 2) return 6;
  if (row === 3) return 5;
  if (row === 4) return 4;
  if (row === 5) return 3;
  if (row === 6) return 2;
  if (row === 7) return 1;
  if (row === 8) return 0;
}

const stringifyMove = (move) => {
  let string = '';

  if (move.originType === 'king') {
    if (move.origin.column === 4 && move.target.column === 6) {
      string = '0-0';
    } else if (move.origin.column === 4 && move.target.column === 2) {
      string = '0-0-0';
    } else {
      string = `K${move.targetType ? 'x' : ''}${
        convertColumns(move.target.column) + convertRows(move.target.row)
      }`;
    }
  }

  if (move.originType === 'queen') {
    string = `Q${move.targetType ? 'x' : ''}${
      convertColumns(move.target.column) + convertRows(move.target.row)
    }`;
  }

  if (
    move.originType === 'rook' ||
    move.originType === 'bishop' ||
    move.originType === 'knight'
  ) {
    const totalMoves = totalBoardMoves(move.boardSnapshotBefore);
    const siblings = totalMoves.filter((piece) => {
      return piece.type === move.originType && piece.color === move.turn;
    });
    const competitiveSiblings = siblings.filter((sibling) => {
      return sibling.targets.some((target) => {
        return (
          target[0] === move.target.row && target[1] === move.target.column
        );
      });
    });

    if (siblings.length < 2 || competitiveSiblings.length < 2) {
      string = `${convertPiece(move.originType)}${move.targetType ? 'x' : ''}${
        convertColumns(move.target.column) + convertRows(move.target.row)
      }`;
    }

    if (competitiveSiblings.length > 1) {
      const hasDifferentColumn =
        competitiveSiblings[0].origin.column !==
        competitiveSiblings[1].origin.column;
      const hasDifferentRow =
        competitiveSiblings[0].origin.row !== competitiveSiblings[1].origin.row;

      string = `${convertPiece(move.originType)}${
        hasDifferentColumn
          ? convertColumns(move.origin.column)
          : hasDifferentRow
          ? convertRows(move.origin.row)
          : convertColumns(move.origin.column) + convertRows(move.origin.row)
      }${move.targetType ? 'x' : ''}${
        convertColumns(move.target.column) + convertRows(move.target.row)
      }`;
    }
  }
  if (move.originType === 'pawn' && !move.targetType) {
    if (move.target.column !== move.origin.column) {
      string = `${convertColumns(move.origin.column)}x${
        convertColumns(move.target.column) + convertRows(move.target.row)
      } e.p.`;
    } else {
      string = convertColumns(move.target.column) + convertRows(move.target.row);
    }
  }
  if (move.originType === 'pawn' && move.targetType) {
    string =
      convertColumns(move.origin.column) +
      'x' +
      convertColumns(move.target.column) +
      convertRows(move.target.row);
  }

  if (move.promotion) {
    string = string + '=' + convertPiece(move.promotion);
  }

  const check = isCheck(
    move.boardSnapshotAfter,
    move.turn === 'white' ? 'black' : 'white'
  );

  if (move.isCheckmate) {
    string = string + '#';
  } else if (check) {
    string = string + '+';
  }

  return string;
};

const parseMove = (move, index, board) => {
  let moveObject = {
    playerTurn: index % 2 === 0 ? 'white' : 'black',
    boardSnapshotBefore: board,
    origin: {},
    originType: '',
    target: {},
    targetType: '',
    promotion: null,
    isCheckmate: null,
    boardSnapshotAfter: [],
  };

  let originType;
  if (move[0] === '0') {
    originType = 'king';
  } else if (
    move[0] === 'B' ||
    move[0] === 'R' ||
    move[0] === 'N' ||
    move[0] === 'Q' ||
    move[0] === 'K'
  ) {
    originType = convertPiece(move[0]);
  } else {
    originType = 'pawn';
  }
  moveObject.originType = originType;
  
  let target, targetType;
  if (move === '0-0') {
    if (moveObject.playerTurn === 'white') {
      target = { row: 7, column: 6 };
    } else {
      target = { row: 0, column: 6 };
    }
    targetType = null;
  } else if (move === '0-0-0') {
    if (moveObject.playerTurn === 'white') {
      target = { row: 7, column: 2 };
    } else {
      target = { row: 0, column: 2 };
    }
    targetType = null;
  } else if (move.includes('e.p.')) {
    const row = convertRows(parseInt(move[3]));
    const column = convertColumns(move[2]);
    target = { row, column };
    targetType = null;
  } else {
    const moveArray = move.split('');
    const indicesOfNumerals = moveArray
      .map((char, index) => {
        if (isNaN(char)) return null;
        else return index;
      })
      .filter((char) => char);
    const indexOfTargetRow = indicesOfNumerals[indicesOfNumerals.length - 1];
    const row = convertRows(parseInt(move[indexOfTargetRow]));
    const column = convertColumns(move[indexOfTargetRow - 1]);
    target = { row, column };
    targetType = board[row][column].type ? board[row][column].type : null;
  }
  moveObject.target = target;
  moveObject.targetType = targetType;

  let origin;
  if (move === '0-0' || move === '0-0-0') {
    origin =
      moveObject.playerTurn === 'white'
        ? { row: 7, column: 4 }
        : { row: 0, column: 4 };
  } else if (move.includes('e.p.')) {
    const row = moveObject.playerTurn === 'white' ? 3 : 4;
    const column = convertColumns(move[0]);
    origin = { row, column };
  } else {
    const totalMovesOnBoard = totalBoardMoves(board);
    const playerTurnMoves = totalMovesOnBoard.filter(
      (piece) => piece.color === moveObject.playerTurn
    );
    const originTypeMoves = playerTurnMoves.filter(
      (piece) => piece.type === moveObject.originType
    );
    let totalMovesOnTarget = originTypeMoves.filter((piece) =>
      piece.targets.some(
        (t) =>
          t[0] === moveObject.target.row && t[1] === moveObject.target.column
      )
    );
    if (totalMovesOnTarget.length === 1) {
      origin = { ...totalMovesOnTarget[0].origin };
    } else {
      let originRow, originColumn;
      if (moveObject.originType !== 'pawn') {
        if (isNaN(move[1])) {
          originColumn = move[1];
        } else {
          originRow = move[1];
        }
        if (!isNaN(move[2])) {
          originRow = move[2];
        }
      } else {
        originColumn = move[0];
      }
      if (originRow && originColumn) {
        totalMovesOnTarget = totalMovesOnTarget.filter(piece => piece.origin.column === convertColumns(originColumn) && piece.origin.row === convertRows(parseInt(originRow)));
      }
      if (originRow && !originColumn) {
        totalMovesOnTarget = totalMovesOnTarget.filter(piece => piece.origin.row === convertRows(parseInt(originRow)));
      }
      if (!originRow && originColumn) {
        totalMovesOnTarget = totalMovesOnTarget.filter(piece => piece.origin.column === convertColumns(originColumn));
      }
      if (totalMovesOnTarget.length === 1) {
        origin = { ...totalMovesOnTarget[0].origin };
      } else {
        console.log('Error ');
      }
    }
  }
  moveObject.origin = origin;

  let promotion;
  if (move.includes('=')) {
    const index = move.indexOf('=');
    const slice = move.slice(index);
    const piece = convertPiece(slice[1]);
    promotion = piece;
  }
  moveObject.promotion = promotion || null;

  if (move.includes('#')) {
    moveObject.isCheckmate = true;
  } else {
    moveObject.isCheckmate = false;
  }

  const newBoard = JSON.parse(JSON.stringify(board));
  const piece = { ...newBoard[origin.row][origin.column] };
  newBoard[target.row][target.column] = piece;
  newBoard[origin.row][origin.column] = {};
  if (move === '0-0') {
    if (moveObject.playerTurn === 'white') {
      const rook = { ...newBoard[7][7] };
      newBoard[7][5] = rook;
      newBoard[7][7] = {};
    } else {
      const rook = { ...newBoard[0][7] };
      newBoard[0][5] = rook;
      newBoard[0][7] = {};
    }
  }
  if (move === '0-0-0') {
    if (moveObject.playerTurn === 'white') {
      const rook = { ...newBoard[7][0] };
      newBoard[7][3] = rook;
      newBoard[7][0] = {};
    } else {
      const rook = { ...newBoard[0][0] };
      newBoard[0][3] = rook;
      newBoard[0][0] = {};
    }
  }
  if (move.includes('e.p.')) {
    if (moveObject.playerTurn === 'white') {
      newBoard[moveObject.target.row + 1][moveObject.target.column] = {};
    } else {
      newBoard[moveObject.target.row - 1][moveObject.target.column] = {};
    }
  }
  if (moveObject.promotion) {
    newBoard[moveObject.target.row][moveObject.target.column].type =
      moveObject.promotion;
  }
  moveObject.boardSnapshotAfter = newBoard;

  return moveObject;
};

const stringifyGame = (moves) => {
  let string = '';

  moves.forEach((move) => {
    string = string + stringifyMove(move) + ' ';
  });

  return string;
};

const parseGame = (string) => {
  let gameAsArray = string.trim().split(' ');
  
  while (gameAsArray.includes('e.p.')) {
    const index = gameAsArray.findIndex((move) => move === 'e.p.');
    gameAsArray[index - 1] = gameAsArray[index - 1] + ' e.p.';
    gameAsArray.splice(index, 1);
  }

  let moves = [];

  let board = DEFAULT_BOARD;
  gameAsArray.forEach((item, index) => {
    const move = parseMove(item, index, board);
    board = move.boardSnapshotAfter;
    // console.log(move);
    moves.push(move);
  });

  
  return moves;
};

export { stringifyMove, parseMove, stringifyGame, parseGame };
