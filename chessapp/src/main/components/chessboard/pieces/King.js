import React from 'react';

import whiteKing from '../../../../shared/assets/chess-pieces/king_w.svg';
import blackKing from '../../../../shared/assets/chess-pieces/king_b.svg';

const King = props => {
  const white = props.color === 'white';

  return (
    <React.Fragment>
      {white && <img src={whiteKing} alt="White king" />}
      {!white && <img src={blackKing} alt="Black king" />}
    </React.Fragment>
  )
}

export default King;