import React, { useReducer } from 'react';

const inputReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE':
      return {
        ...state,
        value: action.value,
        isValid: true,
      };
    case 'TOUCH':
      return { ...state, isTouched: true };
    default:
      return state;
  }
};

const Input = (props) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: '',
    isValid: false,
    isTouched: false,
  });

  const changeHandler = (e) => {
    dispatch({ type: 'CHANGE', value: e.target.value });
  };

  const touchHandler = () => {
    dispatch({ type: 'TOUCH' });
  };

  const element =
    props.element === 'textarea' ? (
      <textarea
        id={props.id}
        name={props.name}
        maxLength={props.maxLength || 200}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      />
    ) : (
      <input
        id={props.id}
        name={props.name}
        type={props.type}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      />
    );

  return (
    <div>
      <label
        htmlFor={props.id}
        style={
          !inputState.isValid && inputState.isTouched ? { color: 'red' } : { color: 'black' }
        }
      >
        {props.label}
      </label>
      {element}
      {!inputState.isValid && inputState.isTouched && (
        <p style={{ color: 'red' }}>{props.invalidText}</p>
      )}
    </div>
  );
};

export default Input;
