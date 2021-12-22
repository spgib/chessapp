import React from 'react';

import whitePawn from '../../../assets/chess-pieces/pawn_w.svg';
import blackPawn from '../../../assets/chess-pieces/pawn_b.svg';

const Pawn = props => {
  const white = props.color === 'white';

  return (
    <React.Fragment>
      {white && <img src={whitePawn} alt="White pawn" />}
      {!white && <img src={blackPawn} alt="Black pawn" />}
    </React.Fragment>
  )
}

export default Pawn;