import React from 'react';

import Pawn from './Pawn';
import Rook from './Rook';
import Knight from './Knight';
import Bishop from './Bishop';
import Queen from './Queen';
import King from './King';

import './Piece.css';

const Piece = props => {
  let piece;

  if (props.type === 'pawn') {
    piece = <Pawn color={props.color} />;
  } else if (props.type === 'rook') {
    piece = <Rook color={props.color} />;
  } else if (props.type === 'knight') {
    piece = <Knight color={props.color} />;
  } else if (props.type === 'bishop') {
    piece = <Bishop color={props.color} />;
  } else if (props.type === 'queen') {
    piece = <Queen color={props.color} />;
  } else piece = <King color={props.color} />;

  return <div className='chessboard__piece'>{piece}</div>
}

export default Piece;