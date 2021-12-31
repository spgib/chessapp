import React from 'react';

import Modal from '../components/UIElements/Modal';
import BoardRow from './components//board/BoardRow';
import Controls from './components/controls/Controls';
import GameInfo from './components/game-info/GameInfo';
import PawnPromotionForm from './components/forms/PawnPromotionForm';
import { stringifyGame } from '../../store/logic/moveConversions';
import { parseGame } from '../../store/logic/moveConversions';
import useChess from '../hooks/useChess';

import './Chessboard.css';

const DUMMY_GAME =
  'f5 a3 Nf6 g4 g6 a4 Bh6 a5 0-0 Nf3 fxg4 Na3 b6 h4 gxh3 e.p. b3 h2 Bb2 bxa5 c3 Nc6 Qc2 Nb4 0-0-0 Bb7 Rg1 Bxf3 Rxg6+ Kf7 Ba1 h1=Q Rg3 Nfd5 Bg2 Nb6 Qb1 N6d5 Rxh1 Nf4 Kd1 Nbd5';

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

  const testParseHandler = (e) => {
    e.preventDefault();

    parseGame(e.target[0].value);
  }

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
      <form onSubmit={testParseHandler} >
        <input type='text' />
        <button type="submit">Test</button>
      </form>
      {showPromotionForm && (
        <Modal>
          <PawnPromotionForm onSubmit={promotionSubmitHandler} />
        </Modal>
      )}
    </React.Fragment>
  );
};

export default Chessboard;
