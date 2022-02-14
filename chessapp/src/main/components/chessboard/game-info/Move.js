import React from 'react';

import './Move.css';

const Move = (props) => {
  return (
    <p
      className={`history__list-item history__list-item--${
        props.slideshowActiveItem ? props.color + '-active' : props.color
      }`}
    >
      {props.children}
    </p>
  );
};

export default Move;
