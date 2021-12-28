import React from 'react';
import ReactDOM from 'react-dom';

import './Modal.css';

const Modal = (props) => {
  const Backdrop = (props) => {
    return <div className='backdrop' onClick={props.onClick} />;
  };

  const ModalOverlay = (props) => {
    return <div className='modal'>{props.children}</div>;
  };

  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Backdrop onClick={props.onClick} />,
        document.getElementById('backdrop')
      )}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        document.getElementById('modal')
      )}
    </React.Fragment>
  );
};

export default Modal;
