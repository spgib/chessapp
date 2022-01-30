import React from 'react';

import Modal from './Modal';

const ErrorModal = (props) => {
  return (
    <Modal onClick={props.clear}>
      <h2>An error occurred!</h2>
      <p>{props.message}</p>
      <button onClick={props.clear}>OK</button>
    </Modal>
  );
};

export default ErrorModal;
