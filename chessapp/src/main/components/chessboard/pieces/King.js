import React from 'react';

import whiteKing from '../../../../shared/assets/chess-pieces/king_w.svg';
import blackKing from '../../../../shared/assets/chess-pieces/king_b.svg';

const King = props => {
  const white = props.color === 'white';

  return (
    <React.Fragment>
      {white && <img src={whiteKing} alt="White king" draggable="false" />}
      {!white && <img src={blackKing} alt="Black king" draggable="false" />}
    </React.Fragment>
  )
}

export default King;