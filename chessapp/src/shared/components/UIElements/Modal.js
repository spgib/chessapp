import React from 'react';
import ReactDOM from 'react-dom';

import Backdrop from './Backdrop';

import './Modal.css';

const Modal = (props) => {
  const ModalOverlay = (props) => {
    return <div className='modal'>{props.children}</div>;
  };

  return (
    <React.Fragment>
      <Backdrop onClick={props.onClick} />
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        document.getElementById('modal')
      )}
    </React.Fragment>
  );
};

export default Modal;
