import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../../../../store/context/auth-context';
import newGameIcon from '../../../../shared/assets/icons/arrow-clockwise.svg';
import resignIcon from '../../../../shared/assets/icons/person-x-fill.svg';
import saveIcon from '../../../../shared/assets/icons/save-fill.svg';
import branchIcon from '../../../../shared/assets/icons/alt.svg';
import chevronRight from '../../../../shared/assets/icons/chevron-right.svg';
import chevronLeft from '../../../../shared/assets/icons/chevron-left.svg';
import chevronBarRight from '../../../../shared/assets/icons/chevron-bar-right.svg';
import chevronBarLeft from '../../../../shared/assets/icons/chevron-bar-left.svg';

import './Controls.css';

const Controls = (props) => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const newGameHandler = () => {
    navigate('/');
    props.onNewGame();
  };

  const saveHandler = () => {
    if (!auth.userId) {
      alert('You must be logged in to save a game.');
      return;
    }
    props.onSaveGame();
  };

  const resignReviewHandler = () => {
    props.onResignReview();
  };

  const branchHandler = () => {
    navigate('/');
    props.onBranch();
  };

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

  const coreControls = (
    <div className='chessboard__controls-core'>
      <button className='chessboard__controls--new-game' type='button' onClick={newGameHandler}>
        <img src={newGameIcon} alt='New game icon' />
      </button>
      {props.activePlay && (
        <button className='chessboard__controls--resign' type='button' onClick={resignReviewHandler}>
          <img src={resignIcon} alt='Resign icon' />
        </button>
      )}
      {auth.token && (
        <button className='chessboard__controls--save' type='button' onClick={saveHandler}>
          <img src={saveIcon} alt='Save icon' />
        </button>
      )}
    </div>
  );

  const moveSlideshowControls = (
    <div className='chessboard__controls-slideshow'>
      <button
        className='chessboard__controls--beginning'
        type='button'
        onClick={resetSlideshowHandler}
        disabled={props.currentSlide === null}
      >
        <img src={chevronBarLeft} alt='Beginning icon' />
      </button>
      <button type='button' onClick={backSlideshowHandler}>
        &lt;
      </button>
      <button
        type='button'
        onClick={forwardSlideshowHandler}
        disabled={props.currentSlide === props.history.length - 1}
      >
        &gt;
      </button>
      <button
        type='button'
        onClick={endSlideshowHandler}
        disabled={props.currentSlide === props.history.length - 1}
      >
        &gt;&gt;
      </button>
      <button
        type='button'
        onClick={branchHandler}
        disabled={
          props.currentSlide === props.history.length - 1 && props.gameEnd
        }
      >
        BRANCH
      </button>
    </div>
  );

  return (
    <div className='chessboard__controls'>
      {coreControls}
      {!props.activePlay && moveSlideshowControls}
    </div>
  );
};

export default Controls;
