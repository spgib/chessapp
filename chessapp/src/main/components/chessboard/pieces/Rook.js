import React from 'react';

import whiteRook from '../../../../shared/assets/chess-pieces/rook_w.svg';
import blackRook from '../../../../shared/assets/chess-pieces/rook_b.svg';

const Rook = props => {
  const white = props.color === 'white';

  return (
    <React.Fragment>
      {white && <img src={whiteRook} alt="White rook" draggable="false" />}
      {!white && <img src={blackRook} alt="Black rook" draggable="false" />}
    </React.Fragment>
  )
}

export default Rook;