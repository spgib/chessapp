import React from 'react';

import whiteQueen from '../../../../shared/assets/chess-pieces/queen_w.svg';
import blackQueen from '../../../../shared/assets/chess-pieces/queen_b.svg';

const Queen = props => {
  const white = props.color === 'white';

  return (
    <React.Fragment>
      {white && <img src={whiteQueen} alt="White queen" draggable="false" />}
      {!white && <img src={blackQueen} alt="Black queen" draggable="false" />}
    </React.Fragment>
  )
}

export default Queen;