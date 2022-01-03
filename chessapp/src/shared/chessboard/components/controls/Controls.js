import React from 'react';

import './Controls.css';

const Controls = (props) => {
  const newGameHandler = () => {
    props.onNewGame();
  };

  const saveHandler = () => {
    props.onSaveGame();
  };

  const concedeHandler = () => {
    props.onConcede();
  };

  let moveSlideshowControls;
  let concedeControls;

  if (props.activePlay) {
    concedeControls = (
      <button
        className='chessboard__controls-concede'
        type='button'
        onClick={concedeHandler}
      >
        CONCEDE
      </button>
    );
  } else {
    moveSlideshowControls = (
      <React.Fragment>
        <button>&lt;&lt;</button>
        <button>&lt;</button>
        <button>&gt;</button>
        <button>&gt;&gt;</button>
        <button>Branch</button>
      </React.Fragment>
    );
  }

  return (
    <div className='chessboard__controls'>
      <button
        className='chessboard__controls-new-game'
        type='button'
        onClick={newGameHandler}
      >
        NEW GAME
      </button>
      {moveSlideshowControls}
      <button
        className='chessboard__controls-save'
        type='button'
        onClick={saveHandler}
      >
        SAVE
      </button>
      {concedeControls}
    </div>
  );
};

export default Controls;
