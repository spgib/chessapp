import React from 'react';

import Piece from './pieces/Piece';

import './BoardSquare.css';

const BoardSquare = (props) => {
  const squareColor = (props.row + props.column) % 2 === 0 ? 'white' : 'black';
  const isLegalMoveSquare = props.legalMoves.some((move) => {
    return move[0] === props.row && move[1] === props.column;
  });

  const classes = `chessboard__square ${
    isLegalMoveSquare ? squareColor + '-active' : squareColor
  }`;

  let content;
  const contentPiece = props.board[props.row][props.column];

  if (contentPiece.type) {
    content = <Piece type={contentPiece.type} color={contentPiece.color} />;
  }

  const mouseOverHandler = () => {
    props.onMouseOver(props.row, props.column);
  };

  const onClickHandler = () => {
    props.onClick(props.row, props.column);
  }

  return (
    <div className={classes} onMouseEnter={mouseOverHandler} onClick={onClickHandler}>
      {content}
    </div>
  );
};

export default BoardSquare;
