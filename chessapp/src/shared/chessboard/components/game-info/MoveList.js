import React from 'react';

import Move from './Move';
import { stringifyMove } from '../../../../store/logic/moveConversions';

import './MoveList.css';

const MoveList = (props) => {
  // const rawHistory = [...props.history];
  // let turnSortedHistory = [];
  // rawHistory.forEach((move, index) => {
  //   if (index % 2 === 0) {
  //     turnSortedHistory.push([move]);
  //   } else {
  //     turnSortedHistory[turnSortedHistory.length - 1].push(move);
  //   }
  // });

  // const moves = turnSortedHistory.map((move, index) => {
  //   const whiteMove = stringifyMove(move[0]);
  //   const blackMove = move[1] ? stringifyMove(move[1]) : null;

  //   return (
  //     <li className={`history__item}`} key={index}>
  //       <p>
  //         {whiteMove} <strong>{blackMove}</strong>
  //       </p>
  //     </li>
  //   );
  // });
  const rawHistory = [...props.history];
  const historyElements = rawHistory.map((move, index) => {
    return (
      <Move
        key={index}
        color={index % 2 === 0 ? 'white' : 'black'}
        slideshowActiveItem={index === props.slideshowActiveItem}
      >
        {stringifyMove(move)}
      </Move>
    );
  });

  let turnSortedHistory = [];
  historyElements.forEach((move, index) => {
    if (index % 2 === 0) {
      turnSortedHistory.push([move]);
    } else {
      turnSortedHistory[turnSortedHistory.length - 1].push(move);
    }
  });

  const moves = turnSortedHistory.map((turn, index) => {
    return (
      <li key={index}>
        <ol className='history__list-turn'>
          <li>{turn[0]}</li>
          {turn[1] && <li>{turn[1]}</li>}
        </ol>
      </li>
    );
  });

  return <ol className='history__list'>{moves}</ol>;
};

export default MoveList;
