import React from 'react';

import whiteRook from '../../../assets/chess-pieces/rook_w.svg';
import blackRook from '../../../assets/chess-pieces/rook_b.svg';

const Rook = props => {
  const white = props.color === 'white';

  return (
    <React.Fragment>
      {white && <img src={whiteRook} alt="White rook" />}
      {!white && <img src={blackRook} alt="Black rook" />}
    </React.Fragment>
  )
}

export default Rook;