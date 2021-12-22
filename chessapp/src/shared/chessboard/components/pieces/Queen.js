import React from 'react';

import whiteQueen from '../../../assets/chess-pieces/queen_w.svg';
import blackQueen from '../../../assets/chess-pieces/queen_b.svg';

const Queen = props => {
  const white = props.color === 'white';

  return (
    <React.Fragment>
      {white && <img src={whiteQueen} alt="White queen" />}
      {!white && <img src={blackQueen} alt="Black queen" />}
    </React.Fragment>
  )
}

export default Queen;