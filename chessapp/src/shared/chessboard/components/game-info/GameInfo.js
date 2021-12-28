import React from 'react';

import MoveList from './MoveList';
import Card from '../../../components/UIElements/Card';

import './GameInfo.css';

const GameInfo = (props) => {
  let gameStateContent;

  if (props.gameEnd) {
    gameStateContent = (
      <div className='game-info__checkmate'>
        <h3>CHECKMATE</h3>
      </div>
    );
  } else {
    gameStateContent = (
      <div className='game-info__player-turn'>
        <p>Player Turn: {props.turn.toUpperCase()}</p>
      </div>
    );
  }

  return (
    <Card>
      {gameStateContent}
      <div className='game-info__move-list'>
        <MoveList history={props.history} />
      </div>
    </Card>
  );
};

export default GameInfo;
