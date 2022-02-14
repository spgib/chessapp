import React from 'react';

import Modal from '../../../../shared/components/UIElements/Modal';
import Bishop from '../pieces/Bishop';
import Knight from '../pieces/Knight';
import Rook from '../pieces/Rook';
import Queen from '../pieces/Queen';

import './PawnPromotionForm.css';

const PawnPromotionForm = (props) => {
  const promotionHandler = e => {
    e.preventDefault();
    const value = e.target.alt.split(' ')[1];
    props.onSubmit(value);
  }

  return (
    <Modal className="promotion-modal">
      <h2>Choose a promotion:</h2>
      <div className="promotion__options">
        <button type='button' onClick={promotionHandler}>
          <Bishop color={props.color} />
        </button>
        <button type='button' onClick={promotionHandler}>
          <Knight color={props.color} />
        </button>
        <button type='button' onClick={promotionHandler}>
          <Rook color={props.color} />
        </button>
        <button type='button' onClick={promotionHandler}>
          <Queen color={props.color} />
        </button>
      </div>
    </Modal>
  )
};

export default PawnPromotionForm;
