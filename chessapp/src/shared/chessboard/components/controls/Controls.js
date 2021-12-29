import React from 'react';

import './Controls.css';

const Controls = props => {
  return <div className='chessboard__controls'>
    <button className='chessboard__controls-reset' type="button" onClick={props.resetClickHandler}>RESET</button>
    <button className='chessboard__controls-save' type="button" onClick={props.saveClickHandler}>SAVE</button>
  </div>
}

export default Controls;