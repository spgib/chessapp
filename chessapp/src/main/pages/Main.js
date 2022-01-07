import React from 'react';

import Chessboard from '../../shared/chessboard/Chessboard';

const Main = props => {
  const saveGame = (gameObject) => {
    console.log(gameObject);
  }

  return <Chessboard onSaveGame={saveGame}/>
};

export default Main;