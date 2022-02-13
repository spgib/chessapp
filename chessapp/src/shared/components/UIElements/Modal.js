import React from 'react';
import ReactDOM from 'react-dom';

import Backdrop from './Backdrop';

import './Modal.css';

const Modal = (props) => {
  return (
    <React.Fragment>
      <Backdrop onClick={props.onClick} />
      {ReactDOM.createPortal(
        <div className={`modal ${props.className}`}>{props.children}</div>,
        document.getElementById('modal')
      )}
    </React.Fragment>
  );
};

export default Modal;
