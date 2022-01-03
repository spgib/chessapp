import React from 'react';

import Modal from '../components/UIElements/Modal';
import BoardRow from './components//board/BoardRow';
import Controls from './components/controls/Controls';
import GameInfo from './components/game-info/GameInfo';
import PawnPromotionForm from './components/forms/PawnPromotionForm';
import { parseGame, stringifyGame } from '../../store/logic/moveConversions';
import useChess from '../hooks/useChess';

import './Chessboard.css';

const Chessboard = (props) => {
  const {
    board,
    legalMoves,
    playerTurn,
    history,
    checkmate,
    showPromotionForm,
    activePlay,
    activatePiece,
    mouseOverHandler,
    promotionSubmitHandler,
    newGame,
    concedeHandler
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
        onMouseOver={mouseOverHandler}
        onClick={activatePiece}
      />
    );
  });

  return (
    <React.Fragment>
      <div className='chessboard'>{chessRows}</div>

      <Controls resetClickHandler={newGame} saveClickHandler={saveGame} activePlay={activePlay} onConcede={concedeHandler} />
      <GameInfo turn={playerTurn} history={history} gameEnd={checkmate} />
      {showPromotionForm && (
        <Modal>
          <PawnPromotionForm onSubmit={promotionSubmitHandler} />
        </Modal>
      )}
    </React.Fragment>
  );
};

export default Chessboard;
