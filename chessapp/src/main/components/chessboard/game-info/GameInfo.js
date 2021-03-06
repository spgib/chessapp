import React from 'react';

import MoveList from './MoveList';
import Card from '../../../../shared/components/UIElements/Card';

import './GameInfo.css';

const GameInfo = (props) => {
  let gameStateContent;

  if (props.gameEnd) {
    gameStateContent = (
      <div className='game-info__checkmate'>
        <h3>CHECKMATE {props.turn === 'white' ? '0-1' : '1-0'}</h3>
      </div>
    );
  } else if (!props.activePlay) {
    gameStateContent = (
      <div className='game-info__resignation'>
        <h3>RESIGNATION {props.turn === 'white' ? '0-1' : '1-0'}</h3>
      </div>
    );
  } else {
    gameStateContent = (
      <div className='game-info__player-turn'>
        <h3>Player Turn: {props.turn.toUpperCase()}</h3>
      </div>
    );
  }

  return (
    <Card>
      <div className='game-info'>
        {gameStateContent}
        <div className='game-info__move-list'>
          <MoveList
            history={props.history}
            slideshowActiveItem={props.slideshowActiveItem}
          />
        </div>
      </div>
    </Card>
  );
};

export default GameInfo;
