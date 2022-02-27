import React from 'react';

import whitePawn from '../../../../shared/assets/chess-pieces/pawn_w.svg';
import blackPawn from '../../../../shared/assets/chess-pieces/pawn_b.svg';

const Pawn = props => {
  const white = props.color === 'white';

  return (
    <React.Fragment>
      {white && <img src={whitePawn} alt="White pawn" draggable="false" />}
      {!white && <img src={blackPawn} alt="Black pawn" draggable="false" />}
    </React.Fragment>
  )
}

export default Pawn;