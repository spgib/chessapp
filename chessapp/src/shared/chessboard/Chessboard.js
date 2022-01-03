import React from 'react';

import Modal from '../components/UIElements/Modal';
import BoardRow from './components//board/BoardRow';
import Controls from './components/controls/Controls';
import GameInfo from './components/game-info/GameInfo';
import PawnPromotionForm from './components/forms/PawnPromotionForm';
import { stringifyGame } from '../../store/logic/moveConversions';
import useChess from '../hooks/useChess';

import './Chessboard.css';

const Chessboard = (props) => {
  const {
    activePlay,
    board,
    checkmate,
    history,
    legalMoves,
    playerTurn,
    showPromotionForm,
    activatePiece,
    concede,
    mouseOver,
    newGame,
    promotion,
  } = useChess();

  const saveGame = () => {
    const savedGame = stringifyGame(history);

    console.log(savedGame);
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
        onNewGame={newGame}
        onSaveGame={saveGame}
        onConcede={concede}
      />
      <GameInfo turn={playerTurn} history={history} gameEnd={checkmate} />
      {showPromotionForm && (
        <Modal>
          <PawnPromotionForm onSubmit={promotion} />
        </Modal>
      )}
    </React.Fragment>
  );
};

export default Chessboard;
