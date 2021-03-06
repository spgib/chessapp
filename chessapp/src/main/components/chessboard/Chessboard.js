import React, { useState, useEffect } from 'react';

import BoardRow from './board/BoardRow';
import Controls from './controls/Controls';
import GameInfo from './game-info/GameInfo';
import PawnPromotionForm from './forms/PawnPromotionForm';
import SaveGameForm from './forms/SaveGameForm';
import { stringifyGame } from '../../../store/logic/moveConversions';
import useChess from '../../../shared/hooks/useChess';

import './Chessboard.css';

let dragTimeout;
const Chessboard = (props) => {
  const [showSaveForm, setShowSaveForm] = useState(false);
  const [dragging, setDragging] = useState(false);

  const {
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
    clearLegalMoves,
  } = useChess();

  useEffect(() => {
    if (props.gameToLoad) {
      loadGame(props.gameToLoad);
    }
  }, [loadGame, props.gameToLoad]);

  let loadedGameFormValues = null;
  if (props.gameToLoad) {
    const {
      title,
      wplayer: wPlayer,
      bplayer: bPlayer,
      description,
      public: isPublic,
    } = props.gameToLoad;
    loadedGameFormValues = {
      title,
      wPlayer,
      bPlayer,
      description,
      public: isPublic,
    };
  }

  const openSaveModal = () => {
    setShowSaveForm(true);
  };

  const closeSaveModalHandler = () => {
    setShowSaveForm(false);
  };

  const saveGame = (game) => {
    const gameObject = { ...game };
    gameObject.turns = Math.ceil(history.length / 2);

    let winner = '';
    if (checkmate) {
      winner = playerTurn === 'white' ? '0-1' : '1-0';
    } else if (!activePlay) {
      winner = playerTurn === 'white' ? '0-1' : '1-0';
    }

    gameObject.checkmate = checkmate;
    gameObject.resignation = !activePlay && !checkmate;
    gameObject.winner = winner;

    gameObject.string = stringifyGame(history).trim();

    props.onSaveGame(gameObject);
  };

  const branchHandler = () => {
    branch();
    props.onBranch();
  };

  const dragHandler = (e) => {
    if (!dragging) return;
    else {
      const pieceEl = document.querySelector('.drag');
      const left = e.clientX;
      const top = e.clientY;
  
      pieceEl.style.left = left + 'px';
      pieceEl.style.top = top + 'px';

      const elList = document.elementsFromPoint(left, top);
      const chessboard = document.querySelector('.chessboard');
      const isOverBoard = elList.includes(chessboard);
      
      if (!isOverBoard) {
        pieceEl.classList.remove('drag');
        setDragging(false);
        return;
      }

      const bottomIsPiece = elList[2].nodeName === 'IMG';
      const activeSquare = bottomIsPiece ? elList[4] : elList[2];
      
      if (!activeSquare.classList.contains('active-drag-square') && !activeSquare.classList.contains('active-drag-square-valid')) {
        const prevActiveSquare = document.querySelector('.active-drag-square');
        if (prevActiveSquare) {
          prevActiveSquare.classList.remove('active-drag-square');
        }
        const prevActiveValidSquare = document.querySelector('.active-drag-square-valid');
        if (prevActiveValidSquare) {
          prevActiveValidSquare.classList.remove('active-drag-square-valid');
        }
        if (activeSquare.classList[1].includes('active')) {
          activeSquare.classList.add('active-drag-square-valid');
        } else {
          activeSquare.classList.add('active-drag-square');
        }
      }
    }
  };

  const mouseDownHandler = (e) => {
    dragTimeout = setTimeout(() => {
      const pieceColor = e.target.alt.includes('White') ? 'white' : 'black';
      if (pieceColor !== playerTurn) return;

      setDragging(true);

      const width = e.target.width;
      const pieceEl = e.target.closest('.chessboard__piece');
      pieceEl.click();

      const left = e.clientX;
      const top = e.clientY;
      pieceEl.classList.add('drag');
      pieceEl.style.width = width + 'px';
      pieceEl.style.height = width + 'px';
      pieceEl.style.left = left + 'px';
      pieceEl.style.top = top + 'px';
    }, 100);
  };

  const mouseUpHandler = (e) => {
    clearTimeout(dragTimeout);

    setDragging(false);
    const pieceEl = document.querySelector('.drag');
    if (!pieceEl) return;
    pieceEl.classList.remove('drag');
    const left = e.clientX;
    const top = e.clientY;
    document.elementFromPoint(left, top).click();
    const prevActiveSquare = document.querySelector('.active-drag-square');
    if (prevActiveSquare) {
      prevActiveSquare.classList.remove('active-drag-square');
      prevActiveSquare.classList.remove('active-drag-square-valid');
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
        onMouseOver={mouseOver}
        onClick={activatePiece}
        onMouseDown={mouseDownHandler}
        onMouseUp={mouseUpHandler}
        dragging={dragging}
        playerTurn={playerTurn}
      />
    );
  });

  return (
    <React.Fragment>
      <div
        className='chessboard'
        onMouseLeave={clearLegalMoves}
        onMouseMove={dragHandler}
      >
        {chessRows}
      </div>
      <Controls
        activePlay={activePlay}
        currentSlide={currentSlide}
        gameEnd={checkmate}
        history={history}
        onBranch={branchHandler}
        onResignReview={resignReview}
        onNewGame={newGame}
        onSaveGame={openSaveModal}
        slideshowControls={slideshow}
      />
      <GameInfo
        activePlay={activePlay}
        turn={playerTurn}
        history={history}
        gameEnd={checkmate}
        slideshowActiveItem={currentSlide}
      />
      {showPromotionForm && (
        <PawnPromotionForm
          onSubmit={promotion}
          color={playerTurn === 'white' ? 'black' : 'white'}
        />
      )}
      {showSaveForm && (
        <SaveGameForm
          activePlay={activePlay}
          checkmate={checkmate}
          onSubmit={saveGame}
          onClose={closeSaveModalHandler}
          initialValues={loadedGameFormValues}
        />
      )}
    </React.Fragment>
  );
};

export default Chessboard;
