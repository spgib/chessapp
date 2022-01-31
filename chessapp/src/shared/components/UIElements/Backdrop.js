import React from 'react';
import ReactDOM from 'react-dom';

import './Backdrop.css';

const Backdrop = (props) => {
  const backdrop = <div className='backdrop' onClick={props.onClick} />;

  return ReactDOM.createPortal(backdrop, document.getElementById('backdrop'));
};

export default Backdrop;