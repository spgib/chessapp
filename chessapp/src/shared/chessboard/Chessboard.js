import React, { useState } from 'react';

import BoardRow from './components//board/BoardRow';
import GameInfo from './components/game-info/GameInfo';
import validMoves from '../../store/logic/validMoves';

import './Chessboard.css';

const defaultBoard = [
  [
    { type: 'rook', color: 'black' },
    { type: 'knight', color: 'black' },
    { type: 'bishop', color: 'black' },
    { type: 'queen', color: 'black' },
    { type: 'king', color: 'black' },
    { type: 'bishop', color: 'black' },
    { type: 'knight', color: 'black' },
    { type: 'rook', color: 'black' },
  ],
  [
    { type: 'pawn', color: 'black' },
    { type: 'pawn', color: 'black' },
    { type: 'pawn', color: 'black' },
    { type: 'pawn', color: 'black' },
    { type: 'pawn', color: 'black' },
    { type: 'pawn', color: 'black' },
    { type: 'pawn', color: 'black' },
    { type: 'pawn', color: 'black' },
  ],
  [{}, {}, {}, {}, {}, {}, {}, {}],
  [{}, {}, {}, {}, {}, {}, {}, {}],
  [{}, {}, {}, {}, {}, {}, {}, {}],
  [{}, {}, {}, {}, {}, {}, {}, {}],
  [
    { type: 'pawn', color: 'white' },
    { type: 'pawn', color: 'white' },
    { type: 'pawn', color: 'white' },
    { type: 'pawn', color: 'white' },
    { type: 'pawn', color: 'white' },
    { type: 'pawn', color: 'white' },
    { type: 'pawn', color: 'white' },
    { type: 'pawn', color: 'white' },
  ],
  [
    { type: 'rook', color: 'white' },
    { type: 'knight', color: 'white' },
    { type: 'bishop', color: 'white' },
    { type: 'queen', color: 'white' },
    { type: 'king', color: 'white' },
    { type: 'bishop', color: 'white' },
    { type: 'knight', color: 'white' },
    { type: 'rook', color: 'white' },
  ],
];

const Chessboard = (props) => {
  const [board, setBoard] = useState(defaultBoard);
  const [legalMoves, setLegalMoves] = useState([]);
  const [activePiece, setActivePiece] = useState(null);
  const [playerTurn, setPlayerTurn] = useState('white');
  const [history, setHistory] = useState([]);
  const [checkmate, setCheckmate] = useState(false);

  const mouseOverHandler = (row, column) => {
    if (
      activePiece ||
      (board[row][column].type && board[row][column].color !== playerTurn)
    )
      return;
    setLegalMoves(validMoves(board, row, column, history));
  };

  const activatePiece = (row, column) => {
    if (activePiece) {
      if (activePiece.row === row && activePiece.column === column) {
        setActivePiece(null);
        setLegalMoves([]);
        return;
      }
      if (!legalMoves.some((move) => move[0] === row && move[1] === column))
        return;

      const move = {
        turn: playerTurn,
        origin: { ...activePiece },
        originType: board[activePiece.row][activePiece.column].type,
        target: { row, column },
        targetType: board[row][column].type || null,
        boardSnapshotBefore: JSON.parse(JSON.stringify(board)),
        boardSnapshotAfter: null,
      };

      const newBoard = JSON.parse(JSON.stringify(board));
      const piece = newBoard[activePiece.row][activePiece.column];
      newBoard[row][column] = piece;
      newBoard[activePiece.row][activePiece.column] = {};
      move.boardSnapshotAfter = newBoard;

      if (
        move.originType === 'king' &&
        Math.abs(move.origin.column - move.target.column) > 1
      ) {
        if (move.origin.column - move.target.column === 2) {
          const rook = newBoard[move.origin.row][0];
          newBoard[move.origin.row][3] = rook;
          newBoard[move.origin.row][0] = {};
        }
        if (move.origin.column - move.target.column === -2) {
          const rook = newBoard[move.origin.row][7];
          newBoard[move.origin.row][5] = rook;
          newBoard[move.origin.row][7] = {};
        }
      }

      if (
        move.originType === 'pawn' &&
        move.origin.column !== move.target.column &&
        !move.targetType
      ) {
        if (move.turn === 'white') {
          newBoard[move.target.row + 1][move.target.column] = {};
        } else {
          newBoard[move.target.row - 1][move.target.column] = {};
        }
      }

      setHistory((prev) => {
        return prev.concat(move);
      });

      setBoard(newBoard);
      setActivePiece(null);
      setLegalMoves([]);
      setPlayerTurn((prev) => {
        return prev === 'white' ? 'black' : 'white';
      });
    } else {
      if (
        !board[row][column].type ||
        validMoves(board, row, column, history).length === 0 ||
        board[row][column].color !== playerTurn
      )
        return;
      else {
        setLegalMoves(validMoves(board, row, column, history));
        setActivePiece({ row, column });
      }
    }
  };

  const rows = [0, 1, 2, 3, 4, 5, 6, 7];

  const chessRows = rows.map((index) => {
    return (
      <BoardRow
        row={index}
        key={index}
        board={board}
        legalMoves={legalMoves}
        onMouseOver={mouseOverHandler}
        onClick={activatePiece}
      />
    );
  });

  return (
    <React.Fragment>
      <div className='chessboard'>{chessRows}</div>

      <GameInfo turn={playerTurn} history={history} gameEnd={checkmate} />
    </React.Fragment>
  );
};

export default Chessboard;
