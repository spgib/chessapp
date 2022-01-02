import React from 'react';

import Modal from '../components/UIElements/Modal';
import BoardRow from './components//board/BoardRow';
import Controls from './components/controls/Controls';
import GameInfo from './components/game-info/GameInfo';
import PawnPromotionForm from './components/forms/PawnPromotionForm';
import { stringifyGame, parseGame } from '../../store/logic/moveConversions';
import useChess from '../hooks/useChess';

import './Chessboard.css';

const DUMMY_GAME =
  'c4 e5 g3 d6 Bg2 g6 d4 Nd7 Nc3 Bg7 Nf3 Ngf6 0-0 0-0 Qc2 Re8 Rd1 c6 b3 Qe7 Ba3 e4 Ng5 e3 f4 Nf8 b4 Bf5 Qb3 h6 Nf3 Ng4 b5 g5 bxc6 bxc6 Ne5 gxf4 Nxc6 Qg5 Bxd6 Ng6 Nd5 Qh5 h4 Nxh4 gxh4 Qxh4 Nde7+ Kh8 Nxf5 Qh2+ Kf1 Re6 Qb7 Rg6 Qxa8+ Kh7 Qg8+ Kxg8 Nce7+ Kh7 Nxg6 fxg6 Nxg7 Nf2 Bxf4 Qxf4 Ne6 Qh2 Rdb1 Nh3 Rb7+ Kh8 Rb8+ Qxb8 Bxh3 Qg3';

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

    testParseHandler(savedGame);
  };

  const testParseHandler = (string) => {
    let gameString = string,
      gameObject;

    for (let x = 0; x < 5; x++) {
      gameObject = parseGame(gameString);
      gameString = stringifyGame(gameObject);
      console.log(gameString);
    }

    console.log(string === gameString);
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
      {/* <form onSubmit={testParseHandler} >
        <input type='text' />
        <button type="submit">Test</button>
      </form> */}
      {showPromotionForm && (
        <Modal>
          <PawnPromotionForm onSubmit={promotionSubmitHandler} />
        </Modal>
      )}
    </React.Fragment>
  );
};

export default Chessboard;
