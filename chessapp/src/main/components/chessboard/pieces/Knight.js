import React from 'react';

import whiteKnight from '../../../../shared/assets/chess-pieces/knight_w.svg';
import blackKnight from '../../../../shared/assets/chess-pieces/knight_b.svg';

const Knight = props => {
  const white = props.color === 'white';

  return (
    <React.Fragment>
      {white && <img src={whiteKnight} alt="White knight" draggable="false" />}
      {!white && <img src={blackKnight} alt="Black knight" draggable="false" />}
    </React.Fragment>
  )
}

export default Knight;