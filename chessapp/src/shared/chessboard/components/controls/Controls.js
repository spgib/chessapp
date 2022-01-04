import React from 'react';

import './Controls.css';

const Controls = (props) => {
  const newGameHandler = () => {
    props.onNewGame();
  };

  const saveHandler = () => {
    props.onSaveGame();
  };

  const resignHandler = () => {
    props.onResign();
  };

  const branchHandler = () => {
    props.onBranch();
  }

  const resetSlideshowHandler = () => {
    props.slideshowControls('reset');
  };

  const backSlideshowHandler = () => {
    props.slideshowControls('back-one');
  };

  const forwardSlideshowHandler = () => {
    props.slideshowControls('forward-one');
  };

  const endSlideshowHandler = () => {
    props.slideshowControls('end');
  };

  let moveSlideshowControls;
  let resignControls;

  if (props.activePlay) {
    resignControls = (
      <button
        className='chessboard__controls-resign'
        type='button'
        onClick={resignHandler}
      >
        RESIGN
      </button>
    );
  } else {
    moveSlideshowControls = (
      <React.Fragment>
        <button type='button' onClick={resetSlideshowHandler} disabled={props.currentSlide === null}>
          &lt;&lt;
        </button>
        <button type='button' onClick={backSlideshowHandler}>
          &lt;
        </button>
        <button type='button' onClick={forwardSlideshowHandler} disabled={props.currentSlide === props.history.length - 1}>
          &gt;
        </button>
        <button type='button' onClick={endSlideshowHandler} disabled={props.currentSlide === props.history.length - 1}>
          &gt;&gt;
        </button>
        <button type='button' onClick={branchHandler}>BRANCH</button>
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
      {resignControls}
    </div>
  );
};

export default Controls;
