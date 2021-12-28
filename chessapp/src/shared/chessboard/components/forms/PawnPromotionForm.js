import React from 'react';

import './PawnPromotionForm.css';

const PawnPromotionForm = props => {
  return (
    <form className='pawn-promotion-form' onSubmit={props.submitHandler}>
      <label htmlFor='pawn-promotion' className='pawn-promotion-form__label'>
        Choose a promotion:
      </label>

      <select name='promotion options' id="pawn-promotion" className='pawn-promotion-form__options'>
        <option value=''>--Please choose a promotion--</option>
        <option value='bishop'>Bishop</option>
        <option value='knight'>Knight</option>
        <option value='rook'>Rook</option>
        <option value='queen'>Queen</option>
      </select>
      <button type='submit' className='pawn-promotion-form__button'>OK</button>
    </form>
  )
}

export default PawnPromotionForm;