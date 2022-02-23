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
  const [dragging, setDragging] = useState(true);

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

  const mouseDownHandler = (e) => {
    dragTimeout = setTimeout(() => {
      setDragging(true);
      
      const width = e.target.width;
      const pieceEl = e.target.closest('.chessboard__piece');
     
      pieceEl.classList.add('drag');
      pieceEl.style.width = width + 'px';
      pieceEl.style.height = width + 'px';

      document.addEventListener('mousemove', (e) => {
        const piece = document.querySelector('.drag');
        const left = e.clientX;
        const top = e.clientY;
        
        piece.style.left = (left - .5 * width) + 'px';
        piece.style.top = (top - .5 * width) + 'px';
        piece.style.cursor = 'grabbing';
      });
    }, 200);
  };

  const mouseUpHandler = (e) => {
    clearTimeout(dragTimeout);
    setDragging(false);
    const pieceEl = document.querySelector('.drag');
    pieceEl.classList.remove('drag');
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
      <div className='chessboard' onMouseLeave={clearLegalMoves}>
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
