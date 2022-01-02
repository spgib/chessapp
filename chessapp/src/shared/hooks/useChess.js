import { useState } from 'react';

import { validMoves, DEFAULT_BOARD } from '../../store/logic/boardLogic';
import { isCheckmate } from '../../store/logic/checkLogic';


const useChess = () => {
  const [board, setBoard] = useState(DEFAULT_BOARD);
  const [legalMoves, setLegalMoves] = useState([]);
  const [activePiece, setActivePiece] = useState(null);
  const [playerTurn, setPlayerTurn] = useState('white');
  const [history, setHistory] = useState([]);
  const [showPromotionForm, setShowPromotionForm] = useState(false);
  const [checkmate, setCheckmate] = useState(false);
  const [activePlay, setActivePlay] = useState(true);

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
        promotion: null,
        isCheckmate: false,
      };

      const newBoard = JSON.parse(JSON.stringify(board));
      const piece = newBoard[activePiece.row][activePiece.column];
      newBoard[row][column] = piece;
      newBoard[activePiece.row][activePiece.column] = {};

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

      move.boardSnapshotAfter = newBoard;

      if (
        move.originType === 'pawn' &&
        (move.target.row === 0 || move.target.row === 7)
      ) {
        setShowPromotionForm(true);
      }

      const newHistory = [...history];
      newHistory.push(move);

      const checkmateCheck = isCheckmate(newBoard, playerTurn, newHistory);
      move.isCheckmate = checkmateCheck;

      setCheckmate(checkmateCheck);

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

  const promotionSubmitHandler = (e) => {
    const promotionType = e.target[0].value;
    const newHistory = JSON.parse(JSON.stringify(history));
    const lastMove = newHistory[newHistory.length - 1];
    lastMove.promotion = promotionType;
    const newBoard = JSON.parse(JSON.stringify(lastMove.boardSnapshotAfter));
    newBoard[lastMove.target.row][lastMove.target.column].type = promotionType;
    lastMove.boardSnapshotAfter = newBoard;

    const checkmateCheck = isCheckmate(newBoard, lastMove.turn, newHistory);
    lastMove.isCheckmate = checkmateCheck;
    setCheckmate(checkmateCheck);
    setHistory(newHistory);
    setBoard(newBoard);
    setShowPromotionForm(false);
  };

  const newGame = () => {
    setActivePlay(true);
    setBoard(DEFAULT_BOARD);
    setPlayerTurn('white');
    setHistory([]);
    setCheckmate(false);
  }

  const concedeHandler = () => {
    setActivePlay(false);
  }

  return {
    board,
    legalMoves,
    playerTurn,
    history,
    checkmate,
    showPromotionForm,
    activatePiece,
    mouseOverHandler,
    promotionSubmitHandler,
    newGame,
    activePlay,
    concedeHandler,
  };
};

export default useChess;
