import React from 'react';

import Modal from '../../../../shared/components/UIElements/Modal';
import Button from '../../../../shared/components/formElements/Button';

import './PawnPromotionForm.css';

const PawnPromotionForm = (props) => {
  const submitHandler = (e) => {
    e.preventDefault();
    props.onSubmit(e);
  };

  return (
    <Modal className='promotion-modal'>
      <form className='pawn-promotion-form' onSubmit={submitHandler}>
        <label htmlFor='pawn-promotion' className='pawn-promotion-form__label'>
          Choose a promotion:
        </label>

        <select
          name='promotion options'
          id='pawn-promotion'
          className='pawn-promotion-form__options'
        >
          <option value=''>--Please choose a promotion--</option>
          <option value='bishop'>Bishop</option>
          <option value='knight'>Knight</option>
          <option value='rook'>Rook</option>
          <option value='queen'>Queen</option>
        </select>
        <Button type='submit'>
          OK
        </Button>
      </form>
    </Modal>
  );
};

export default PawnPromotionForm;
