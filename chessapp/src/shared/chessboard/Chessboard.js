import React, { useState, useEffect } from 'react';

import Modal from '../components/UIElements/Modal';
import BoardRow from './components//board/BoardRow';
import Controls from './components/controls/Controls';
import GameInfo from './components/game-info/GameInfo';
import PawnPromotionForm from './components/forms/PawnPromotionForm';
import SaveGameForm from './components/forms/SaveGameForm';
import { stringifyGame } from '../../store/logic/moveConversions';
import useChess from '../hooks/useChess';

import './Chessboard.css';

const Chessboard = (props) => {
  const [showSaveForm, setShowSaveForm] = useState(false);

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
    loadGame
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
      />
    );
  });

  return (
    <React.Fragment>
      <div className='chessboard'>{chessRows}</div>
      <Controls
        activePlay={activePlay}
        currentSlide={currentSlide}
        gameEnd={checkmate}
        history={history}
        public={props.gameToLoad ? props.gameToLoad.public : null}
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
        <Modal>
          <PawnPromotionForm onSubmit={promotion} />
        </Modal>
      )}
      {showSaveForm && (
        <Modal onClick={closeSaveModalHandler}>
          <SaveGameForm
            activePlay={activePlay}
            checkmate={checkmate}
            onSubmit={saveGame}
            onClose={closeSaveModalHandler}
            initialValues={loadedGameFormValues}
          />
        </Modal>
      )}
    </React.Fragment>
  );
};

export default Chessboard;
