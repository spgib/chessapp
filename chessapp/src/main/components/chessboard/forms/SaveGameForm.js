import React from 'react';

import Modal from '../../../../shared/components/UIElements/Modal';
import Input from '../../../../shared/components/formElements/Input';
import {
  VALIDATOR_MAXLENGTH,
  VALIDATOR_REQUIRE,
} from '../../../../shared/util/validators';
import useForm from '../../../../shared/hooks/useForm';
import Button from '../../../../shared/components/formElements/Button';

import './SaveGameForm.css';

const SaveGameForm = (props) => {
  const initialValues = props.initialValues
    ? {
        title: {
          value: props.initialValues.title,
          isValid: true,
        },
        wPlayer: {
          value: props.initialValues.wPlayer,
          isValid: true,
        },
        bPlayer: {
          value: props.initialValues.bPlayer,
          isValid: true,
        },
        description: {
          value: props.initialValues.description,
          isValid: true,
        },
      }
    : {
        title: {
          value: '',
          isValid: false,
        },
        wPlayer: {
          value: '',
          isValid: false,
        },
        bPlayer: {
          value: '',
          isValid: false,
        },
        description: {
          value: '',
          isValid: false,
        },
      };

  const initialFormIsValid = props.initialValues ? true : false;

  const [formState, inputHandler] = useForm(initialValues, initialFormIsValid);

  const submitHandler = (e) => {
    e.preventDefault();

    const publicGame = props.activePlay ? false : e.target[4].checked;

    const gameObject = {
      title: formState.inputs.title.value,
      wPlayer: formState.inputs.wPlayer.value,
      bPlayer: formState.inputs.bPlayer.value,
      description: formState.inputs.description.value,
      public: publicGame,
    };

    props.onSubmit(gameObject);
  };

  return (
    <Modal onClick={props.onClose}>
      <form className='save-game-form' onSubmit={submitHandler}>
        <Input
          label='Title*'
          id='title'
          name='title'
          type='text'
          invalidText='Please enter a title for this match.'
          validators={[VALIDATOR_REQUIRE()]}
          onInput={inputHandler}
          initialValue={props.initialValues ? props.initialValues.title : ''}
          initialIsValid={props.initialValues ? true : false}
        />
        <Input
          label='White Player'
          id='wPlayer'
          name='white-player'
          type='text'
          invalidText='Please enter the name of the player playing white.'
          validators={[]}
          initialValue={props.initialValues ? props.initialValues.wPlayer : ''}
          initialIsValid={true}
          onInput={inputHandler}
        />
        <Input
          label='Black Player'
          id='bPlayer'
          name='black-player'
          type='text'
          invalidText='Please enter the name of the player playing black.'
          validators={[]}
          initialValue={props.initialValues ? props.initialValues.bPlayer : ''}
          initialIsValid={true}
          onInput={inputHandler}
        />
        <Input
          element='textarea'
          label='Description'
          id='description'
          name='description'
          invalidText='Please enter a short description of the game (no more than 50 characters).'
          validators={[VALIDATOR_MAXLENGTH(50)]}
          initialIsValid={true}
          initialValue={
            props.initialValues ? props.initialValues.description : ''
          }
          onInput={inputHandler}
        />
        <div className='save-game-form__radio-inputs'>
          <div>
            <input
              type='radio'
              id='privacyChoice1'
              name='privacy'
              value='public'
              defaultChecked={
                props.initialValues ? props.initialValues.public : false
              }
              disabled={props.activePlay}
            />
            <label htmlFor='privacyChoice1'>Public</label>
          </div>
          <div>
            <input
              type='radio'
              id='privacyChoice2'
              name='privacy'
              value='private'
              defaultChecked={
                props.initialValues ? !props.initialValues.public : true
              }
              disabled={props.activePlay}
            />
            <label htmlFor='privacyChoice2'>Private</label>
          </div>
        </div>
        <p>Fields marked with * are required.</p>
        <p>Only completed games may be saved publicly.</p>
        <div className='save-game-form__actions'>
          <Button type='button' inverse onClick={props.onClose}>
            Cancel
          </Button>
          <Button type='submit' disabled={!formState.formIsValid}>
            SAVE
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default SaveGameForm;
