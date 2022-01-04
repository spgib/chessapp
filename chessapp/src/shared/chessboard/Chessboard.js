import React, { useState } from 'react';

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
    resign,
    mouseOver,
    newGame,
    promotion,
    slideshow,
  } = useChess();

  const openSaveModal = () => {
    // const savedGame = stringifyGame(history);

    // console.log(savedGame);
    setShowSaveForm(true);
  };

  const closeSaveModalHandler = () => {
    setShowSaveForm(false);
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
        history={history}
        onBranch={branch}
        onResign={resign}
        onNewGame={newGame}
        onSaveGame={openSaveModal}
        slideshowControls={slideshow}
      />
      <GameInfo
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
            onSubmit={props.onSaveGame}
          />
        </Modal>
      )}
    </React.Fragment>
  );
};

export default Chessboard;
