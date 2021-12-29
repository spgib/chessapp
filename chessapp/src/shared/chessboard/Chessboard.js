import React from 'react';

import Modal from '../components/UIElements/Modal';
import BoardRow from './components//board/BoardRow';
import Controls from './components/controls/Controls';
import GameInfo from './components/game-info/GameInfo';
import PawnPromotionForm from './components/forms/PawnPromotionForm';
import { stringifyGame } from '../../store/logic/moveConversions';
import useChess from '../hooks/useChess';

import './Chessboard.css';

const DUMMY_GAME =
  'e5 f4 d5 fxe5 Qg5 d4 Qxc1 Qxc1 c5 dxc5 d4 Qg5 Bxc5 Qd8+ Kxd8 Nf3 Nf6 exf6 gxf6 Nxd4 Bxd4 b4 Kc7 b5 Bg4 Na3 Bc3+ Kd1 Bxa1 Kd2 Nc6 Nc4 Rhd8+ Ke3 Ne5 Nxe5 fxe5 Ke4 Rd4+ Kxe5 Re8+ Kf6 Kd7 Kxf7 Bh5+ Kf6 Rd6+ Kg5 Re5+ Kf4 Rdd5 Kg3 Bd4 Kh4 Re4+ Kg3 Be5+ Kf2 Rf4+ Kg1 Rd1 b6 Bd4+ e3 Bxe3#';

const Chessboard = (props) => {
  const {
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

      <Controls resetClickHandler={newGame} saveClickHandler={saveGame} />
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
