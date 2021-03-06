import React from 'react';

import BoardSquare from './BoardSquare';

import './BoardRow.css';

const BoardRow = (props) => {
  const columns = [0, 1, 2, 3, 4, 5, 6, 7];

  const squares = columns.map((index) => {
    return (
      <BoardSquare
        key={index}
        row={props.row}
        column={index}
        board={props.board}
        legalMoves={props.legalMoves}
        onMouseOver={props.onMouseOver}
        onClick={props.onClick}
        onMouseDown={props.onMouseDown}
        onMouseUp={props.onMouseUp}
        dragging={props.dragging}
      />
    );
  });

  return <div className='chessboard__row'>{squares}</div>;
};

export default BoardRow;
