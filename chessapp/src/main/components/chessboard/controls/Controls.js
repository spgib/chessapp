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
      <button
        className='chessboard__controls--ng-btn'
        type='button'
        title='New Game'
        onClick={newGameHandler}
      >
        <img src={newGameIcon} alt='New game icon' />
      </button>
      {auth.token && (
        <button
        className='chessboard__controls--save-btn'
        type='button'
        title='Save Game'
        onClick={saveHandler}
        >
          <img src={saveIcon} alt='Save icon' />
        </button>
      )}
      {props.activePlay && (
        <button
          className='chessboard__controls--resign-btn'
          type='button'
          title='Resign'
          onClick={resignReviewHandler}
        >
          <img src={resignIcon} alt='Resign icon' />
        </button>
      )}
    </div>
  );

  const moveSlideshowControls = (
    <div className='chessboard__controls-slideshow'>
      <button
        type='button'
        onClick={resetSlideshowHandler}
        disabled={props.currentSlide === null}
      >
        <img src={chevronBarLeft} alt='First turn icon' />
      </button>
      <button
        type='button'
        onClick={backSlideshowHandler}
        disabled={props.currentSlide === null}
      >
        <img src={chevronLeft} alt='Previous turn icon' />
      </button>
      <button
        type='button'
        onClick={forwardSlideshowHandler}
        disabled={props.currentSlide === props.history.length - 1}
      >
        <img src={chevronRight} alt='Next turn icon' />
      </button>
      <button
        type='button'
        onClick={endSlideshowHandler}
        disabled={props.currentSlide === props.history.length - 1}
      >
        <img src={chevronBarRight} alt='Last turn icon' />
      </button>
      <button
        className='chessboard__controls-slideshow--branch-btn'
        type='button'
        title='Branch Game'
        onClick={branchHandler}
        disabled={
          props.currentSlide === props.history.length - 1 && props.gameEnd
        }
      >
        <img src={branchIcon} alt='Branch icon' />
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
