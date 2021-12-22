import React from 'react';

import BoardRow from './components/BoardRow';

import './Chessboard.css';

const Chessboard = (props) => {
  const rows = [0, 1, 2, 3, 4, 5, 6, 7];

  const chessRows = rows.map((index) => {
    return <BoardRow row={index} key={index} />;
  });

  return <div className='chessboard'>{chessRows}</div>;
};

export default Chessboard;
