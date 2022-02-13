import React from 'react';

import Modal from './Modal';
import Button from '../formElements/Button';

import './ErrorModal.css';

const ErrorModal = (props) => {
  return (
    <Modal className='error-modal' onClick={props.clear}>
      <h2>An error occurred!</h2>
      <p>{props.message}</p>
      <Button onClick={props.clear}>OK</Button>
    </Modal>
  );
};

export default ErrorModal;
