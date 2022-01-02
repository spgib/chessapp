import React from 'react';

import Modal from '../components/UIElements/Modal';
import BoardRow from './components//board/BoardRow';
import Controls from './components/controls/Controls';
import GameInfo from './components/game-info/GameInfo';
import PawnPromotionForm from './components/forms/PawnPromotionForm';
import { stringifyGame, parseGame } from '../../store/logic/moveConversions';
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
    let gameString = string, gameObject;
    for (let x = 0; x++; x < 5) {
      gameObject = parseGame(gameString);
      gameString = stringifyGame(gameObject);
    }

    console.log(string === gameString);
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
