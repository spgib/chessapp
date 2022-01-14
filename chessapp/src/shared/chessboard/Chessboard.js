import React, { useState } from 'react';

import Modal from '../components/UIElements/Modal';
import BoardRow from './components//board/BoardRow';
import Controls from './components/controls/Controls';
import GameInfo from './components/game-info/GameInfo';
import PawnPromotionForm from './components/forms/PawnPromotionForm';
import SaveGameForm from './components/forms/SaveGameForm';
import { stringifyGame, parseGame } from '../../store/logic/moveConversions';
import useChess from '../hooks/useChess';

import './Chessboard.css';

const Chessboard = (props) => {
  const [showSaveForm, setShowSaveForm] = useState(false);

  let loadActive, loadBoard, loadCheckmate, loadHistory, loadTurn;

  if (props.gameToLoad) {
    loadActive = props.gameToLoad.victoryState.winner === null;
    loadHistory = parseGame(props.gameToLoad.string);
    if (loadActive === false) loadBoard = loadHistory[0].boardSnapshotBefore;
    else loadBoard = loadHistory[loadHistory.length - 1].boardSnapshotAfter;
    loadCheckmate = props.gameToLoad.victoryState.checkmate;
    loadTurn =
      loadHistory[loadHistory.length - 1].turn === 'white' ? 'black' : 'white';
  }

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
  } = useChess(loadActive, loadBoard, loadCheckmate, loadHistory, loadTurn);

  let loadedGameFormValues = null;
  if (props.gameToLoad) {
    const {title, wPlayer, bPlayer, description, public: isPublic} = props.gameToLoad;
    loadedGameFormValues = {
      title,
      wPlayer,
      bPlayer,
      description,
      public: isPublic
    }
  }

  const openSaveModal = () => {
    setShowSaveForm(true);
  };

  const closeSaveModalHandler = () => {
    setShowSaveForm(false);
  };

  const saveGame = (game) => {
    const gameObject = {...game};
    gameObject.turns = Math.ceil(history.length / 2);

    let winner = null;
    if (checkmate) {
      winner = playerTurn === 'white' ? '0-1' : '1-0';
    } else if (!activePlay) {
      winner = playerTurn === 'white' ? '0-1' : '1-0';
    }

    gameObject.victoryState = {
      checkmate,
      resignation: !activePlay && !checkmate,
      winner,
    };
    gameObject.string = stringifyGame(history).trim();

    props.onSaveGame(gameObject);
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
        onBranch={branch}
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
