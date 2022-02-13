import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../../../../store/context/auth-context';
import Button from '../../../components/formElements/Button';

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
  let resignReviewControls;

  if (props.activePlay) {
    resignReviewControls = (
      <Button
        type='button'
        onClick={resignReviewHandler}
      >
        {props.gameEnd ? 'REVIEW' : 'RESIGN'}
      </Button>
    );
  } else {
    moveSlideshowControls = (
      <React.Fragment>
        <Button type='button' onClick={resetSlideshowHandler} disabled={props.currentSlide === null}>
          &lt;&lt;
        </Button>
        <Button type='button' onClick={backSlideshowHandler}>
          &lt;
        </Button>
        <Button type='button' onClick={forwardSlideshowHandler} disabled={props.currentSlide === props.history.length - 1}>
          &gt;
        </Button>
        <Button type='button' onClick={endSlideshowHandler} disabled={props.currentSlide === props.history.length - 1}>
          &gt;&gt;
        </Button>
        <Button type='button' onClick={branchHandler} disabled={props.currentSlide === props.history.length - 1 && props.gameEnd}>BRANCH</Button>
      </React.Fragment>
    );
  }

  return (
    <div className='chessboard__controls'>
      <Button
        type='button'
        onClick={newGameHandler}
      >
        NEW GAME
      </Button>
      {moveSlideshowControls}
      {resignReviewControls}
      {auth.token && <Button
        type='button'
        onClick={saveHandler}
      >
        SAVE
      </Button>}
    </div>
  );
};

export default Controls;
