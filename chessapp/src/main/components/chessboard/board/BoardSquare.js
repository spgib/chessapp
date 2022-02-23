import React from 'react';

import Piece from '../pieces/Piece';

import './BoardSquare.css';

const BoardSquare = (props) => {
  const squareColor = (props.row + props.column) % 2 === 0 ? 'white' : 'black';

  const isLegalMoveSquare = props.legalMoves.some((move) => {
    return move[0] === props.row && move[1] === props.column;
  });

  const classes = `chessboard__square chessboard__square--${
    isLegalMoveSquare ? squareColor + '-active' : squareColor
  }`;

  let content;
  const contentPiece = props.board[props.row][props.column];

  if (contentPiece.type) {
    content = (
      <Piece
        type={contentPiece.type}
        color={contentPiece.color}
      />
    );
  }

  const mouseOverHandler = () => {
    props.onMouseOver(props.row, props.column);
  };

  const onClickHandler = () => {
    props.onClick(props.row, props.column);
  };

  const dragStartHandler = (e) => {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', `${props.row} ${props.column}`);
    
    const el = e.target.closest('.chessboard__square');
    el.click();
  };

  const dragEnterHandler = (e) => {
    e.preventDefault();
    const targetEl = e.target.closest('.chessboard__square');
    
    if (targetEl.classList[1] && targetEl.classList[1].includes('active')) {
      targetEl.classList.add('chessboard__square--drag-active');
    } else {
      targetEl.classList.add('chessboard__square--drag');
    }
  };

  const dragLeaveHandler = (e) => {
    e.preventDefault();
    const targetEl = e.target.closest('.chessboard__square');
    targetEl.classList.remove('chessboard__square--drag');
    targetEl.classList.remove('chessboard__square--drag-active');
  };

  const dropHandler = (e) => {
    e.preventDefault();

    const data = e.dataTransfer.getData('text/plain');
    const [row, column] = data.split(' ');

    const targetEl = e.target.closest('.chessboard__square');
    if (targetEl.classList[1] && targetEl.classList[1].includes('active')) {
      targetEl.click();
    } else {
      targetEl.classList.remove('chessboard__square--drag');
      const originEl = document
        .querySelectorAll('.chessboard__row')
        [row].querySelectorAll('.chessboard__square')[column];
      originEl.click();
    }
  };

  return (
    <div
      className={classes}
      onMouseEnter={mouseOverHandler}
      onClick={onClickHandler}
      onDragStart={dragStartHandler}
      onDragOver={dragEnterHandler}
      onDragLeave={dragLeaveHandler}
      onDrop={dropHandler}
    >
      {content}
    </div>
  );
};

export default BoardSquare;
