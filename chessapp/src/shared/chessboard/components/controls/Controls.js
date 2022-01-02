import React from 'react';

import './Controls.css';

const Controls = (props) => {
  let moveSlideshowControls;
  let concedeControls;

  if (props.activePlay) {
    concedeControls = (
      <button
        className='chessboard__controls-concede'
        type='button'
        onClick={props.onConcede}
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
        className='chessboard__controls-reset'
        type='button'
        onClick={props.resetClickHandler}
      >
        RESET
      </button>
      {moveSlideshowControls}
      <button
        className='chessboard__controls-save'
        type='button'
        onClick={props.saveClickHandler}
      >
        SAVE
      </button>
      {concedeControls}
    </div>
  );
};

export default Controls;
