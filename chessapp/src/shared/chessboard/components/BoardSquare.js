import React from 'react';

import Piece from './pieces/Piece';

import './BoardSquare.css';

const BoardSquare = props => {
  const squareColor = (props.row + props.column) % 2 === 0 ? 'white' : 'black';

  const activeClasses = `chessboard__square ${squareColor}`;

  let content;
  const contentPiece = props.board[props.row][props.column];

  if (contentPiece.type) {
    content = <Piece type={contentPiece.type} color={contentPiece.color} />;
  }

  return (
    <div className={activeClasses}>{content}</div>
  )
}

export default BoardSquare;