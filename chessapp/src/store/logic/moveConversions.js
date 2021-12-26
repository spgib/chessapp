import totalBoardMoves from './totalBoardMoves';

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
};

const stringifyMove = (move) => {
  let string = '';

  if (move.originType === 'king') {
    if (move.origin.column === 4 && move.target.column === 6) {
      string = '0-0';
    }
    if (move.origin.column === 4 && move.target.column === 2) {
      string = '0-0-0';
    } else {
      string = `K${move.targetType ? 'x' : ''}${
        convertColumns(move.target.column) + (move.target.row + 1)
      }`;
    }
  }

  if (move.originType === 'queen') {
    string = `Q${move.targetType ? 'x' : ''}${
      convertColumns(move.target.column) + (move.target.row + 1)
    }`;
  }

  if (
    move.originType === 'rook' ||
    move.originType === 'bishop' ||
    move.originType === 'knight'
  ) {
    const totalMoves = totalBoardMoves(move.boardSnapshot);
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
        convertColumns(move.target.column) + (move.target.row + 1)
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
          ? move.origin.row + 1
          : convertColumns(move.origin.column) + (move.origin.row + 1)
      }${move.targetType ? 'x' : ''}${
        convertColumns(move.target.column) + (move.target.row + 1)
      }`;
    }
  }
  if (move.originType === 'pawn' && !move.targetType) {
    if (move.target.column !== move.origin.column) {
      string = `${convertColumns(move.origin.column)}x${
        convertColumns(move.target.column) + (move.target.row + 1)
      } e.p.`;
    } else {
      string = convertColumns(move.target.column) + (move.target.row + 1);
    }
  }
  if (move.originType === 'pawn' && move.targetType) {
    string =
      convertColumns(move.origin.column) +
      'x' +
      convertColumns(move.target.column) +
      (move.target.row + 1);
  }

  // if (move.promotion) {          FOR WHEN PROMOTION LOGIC IS ADDED
  //   string = string + convertPiece(move.promotion);
  // }

  // const totalMovesAfterMove = totalBoardMoves(move.boardFinalSnapshot); FOR WHEN CHECK LOGIC IS ADDED

  return string;
};

const parseMove = (move) => {};

const stringifyGame = (list) => {};

const parseGame = (string) => {};

export { stringifyMove, parseMove, stringifyGame, parseGame };
