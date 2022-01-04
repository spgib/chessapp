import React from 'react';

import Chessboard from '../../shared/chessboard/Chessboard';

const Main = props => {
  const saveGame = (e) => {
    console.log(e);
  }

  return <Chessboard onSaveGame={saveGame}/>
};

export default Main;