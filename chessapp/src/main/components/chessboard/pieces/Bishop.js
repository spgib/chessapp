import React from 'react';

import whiteBishop from '../../../../shared/assets/chess-pieces/bishop_w.svg';
import blackBishop from '../../../../shared/assets/chess-pieces/bishop_b.svg';

const Bishop = props => {
  const white = props.color === 'white';

  return (
    <React.Fragment>
      {white && <img src={whiteBishop} alt="White bishop" draggable="false" />}
      {!white && <img src={blackBishop} alt="Black bishop" draggable="false" />}
    </React.Fragment>
  )
}

export default Bishop;