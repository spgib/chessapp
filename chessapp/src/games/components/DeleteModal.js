import React from 'react';

import Modal from '../../shared/components/UIElements/Modal';
import Button from '../../shared/components/formElements/Button';

import './DeleteModal.css';

const DeleteModal = (props) => {
  return (
    <Modal className='delete-modal' onClick={props.onClose}>
      <h2>Are you sure?</h2>
      <p>This game will be deleted permanently. Do you wish to continue?</p>
      <div className='delete-modal__actions'>
        <Button onClick={props.onClose} inverse>Cancel</Button>
        <Button onClick={props.onDelete} danger>
          Delete
        </Button>
      </div>
    </Modal>
  );
};

export default DeleteModal;
