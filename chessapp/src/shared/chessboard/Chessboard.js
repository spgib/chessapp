import React from 'react';

import Modal from '../components/UIElements/Modal';
import BoardRow from './components//board/BoardRow';
import GameInfo from './components/game-info/GameInfo';
import PawnPromotionForm from './components/forms/PawnPromotionForm';
import useChess from '../hooks/useChess';

import './Chessboard.css';

const Chessboard = (props) => {
  const { board, legalMoves, playerTurn, history, checkmate, showPromotionForm, activatePiece, mouseOverHandler, promotionSubmitHandler} = useChess();

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
      {showPromotionForm && (
        <Modal>
          <PawnPromotionForm onSubmit={promotionSubmitHandler} />
        </Modal>
      )}
    </React.Fragment>
  );
};

export default Chessboard;
