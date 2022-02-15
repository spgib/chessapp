import { useState, useCallback } from 'react';

import { validMoves, DEFAULT_BOARD } from '../../store/logic/boardLogic';
import { isCheckmate } from '../../store/logic/checkLogic';
import { parseGame } from '../../store/logic/moveConversions';

const useChess = () => {
  const [activePiece, setActivePiece] = useState(null);
  const [activePlay, setActivePlay] = useState(true);
  const [board, setBoard] = useState(DEFAULT_BOARD);
  const [checkmate, setCheckmate] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(null);
  const [history, setHistory] = useState([]);
  const [legalMoves, setLegalMoves] = useState([]);
  const [playerTurn, setPlayerTurn] = useState('white');
  const [showPromotionForm, setShowPromotionForm] = useState(false);

  const activatePiece = (row, column) => {
    if (!activePlay) {
      return;
    }
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
      if (checkmateCheck) setActivePlay(false);

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

  const mouseOver = (row, column) => {
    if (
      activePiece ||
      (board[row][column].type && board[row][column].color !== playerTurn) ||
      !activePlay
    )
      return;
    setLegalMoves(validMoves(board, row, column, history));
  };

  const promotion = (value) => {
    const promotionType = value;
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
    setCurrentSlide(null);
  };

  const resignReview = () => {
    setActivePlay(false);
    setLegalMoves([]);
    setCurrentSlide(history.length - 1);
  };


  const slideshow = (command) => {
    const actualize = (slide = 'reset') => {
      setCurrentSlide(slide !== 'reset' ? slide : null);
      setBoard(
        slide !== 'reset' ? history[slide].boardSnapshotAfter : DEFAULT_BOARD
      );
    };

    if (command === 'reset') {
      return actualize();
    }

    if (command === 'back-one') {
      if (currentSlide === null) return;
      if (currentSlide === 0) return actualize();
      actualize(currentSlide - 1);
    }

    if (command === 'forward-one') {
      if (currentSlide === null) return actualize(0);
      if (currentSlide === history.length - 1) return;
      return actualize(currentSlide + 1);
    }

    if (command === 'end') {
      return actualize(history.length - 1);
    }
  };

  const branch = () => {
    if (currentSlide === null) {
      return newGame();
    }
    if (currentSlide === history.length - 1 && checkmate) {
      return;
    }
    const newHistory = [...history];
    newHistory.splice(currentSlide + 1);
    setHistory(newHistory);
    setBoard(prev => JSON.parse(JSON.stringify(prev)));
    setPlayerTurn(newHistory[newHistory.length - 1].turn === 'white' ? 'black' : 'white');
    setCheckmate(newHistory[newHistory.length - 1].isCheckmate);
    setCurrentSlide(null);
    setActivePlay(true);
  }

  const loadGame = useCallback((game) => {
    if (game === undefined) return;
    const { winner, string, checkmate: isCheckmate } = game;

    const loadActive = winner === '';
    const loadHistory = parseGame(string);

    let loadBoard;
    if (loadActive) {
      loadBoard = loadHistory[loadHistory.length - 1].boardSnapshotAfter;
    } else {
      loadBoard = loadHistory[0].boardSnapshotBefore;
    }
    const loadTurn = loadHistory[loadHistory.length - 1].turn === 'white' ? 'black' : 'white';

    setActivePlay(loadActive);
    setHistory(loadHistory);
    setBoard(loadBoard);
    setCheckmate(isCheckmate);
    setPlayerTurn(loadTurn);
  }, []);

  const clearLegalMoves = () => {
    setLegalMoves([]);
  };

  return {
    activePlay,
    board,
    checkmate,
    currentSlide,
    history,
    legalMoves,
    playerTurn,
    showPromotionForm,
    activatePiece,
    branch,
    resignReview,
    mouseOver,
    newGame,
    promotion,
    slideshow,
    loadGame,
    clearLegalMoves
  };
};

export default useChess;
