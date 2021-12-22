import React from 'react';

import whiteBishop from '../../../assets/chess-pieces/bishop_w.svg';
import blackBishop from '../../../assets/chess-pieces/bishop_b.svg';

const Bishop = props => {
  const white = props.color === 'white';

  return (
    <React.Fragment>
      {white && <img src={whiteBishop} alt="White bishop" />}
      {!white && <img src={blackBishop} alt="Black bishop" />}
    </React.Fragment>
  )
}

export default Bishop;