import React from 'react';

import { stringifyMove } from '../../../../store/logic/moveConversions';

import './MoveList.css';

const MoveList = (props) => {
  const rawHistory = [...props.history];
  let turnSortedHistory = [];
  rawHistory.forEach((move, index) => {
    if (index % 2 === 0) {
      turnSortedHistory.push([move]);
    } else {
      turnSortedHistory[turnSortedHistory.length - 1].push(move);
    }
  });

  const moves = turnSortedHistory.map((move, index) => {
    const whiteMove = stringifyMove(move[0]);
    const blackMove = move[1] ? stringifyMove(move[1]) : null;

    return (
      <li className={`history__item}`} key={index}>
        <p>
          {whiteMove} <strong>{blackMove}</strong>
        </p>
      </li>
    );
  });

  return <ul className='history__list'>{moves}</ul>;
};

export default MoveList;
