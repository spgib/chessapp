import React from 'react';

const Input = (props) => {
  const element =
    props.element === 'textarea' ? (
      <textarea
        id={props.name}
        name={props.name}
        maxLength={props.maxLength || 200}
        onChange={props.onChange}
        onBlur={props.onBlur}
        value={props.value}
      />
    ) : (
      <input
        id={props.name}
        name={props.name}
        type={props.type}
        onChange={props.onChange}
        onBlur={props.onBlur}
        value={props.value}
      />
    );

  return (
    <div>
      <label
        htmlFor={props.name}
        style={!props.valid && props.touched ? { color: 'red' } : {color: 'black'}}
      >
        {props.label}
      </label>
      {element}
      {!props.valid && props.touched && (
        <p style={{ color: 'red' }}>{props.invalidText}</p>
      )}
    </div>
  );
};

export default Input;
