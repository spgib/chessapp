import { useReducer, useCallback } from 'react';

const formReducer = (state, action) => {
  switch (action.type) {
    case 'INPUT_CHANGE':
      let formIsValid = true;
      for (let inputID in state.inputs) {
        if (!state.inputs[inputID]) {
          continue;
        }
        if (inputID === action.id) {
          formIsValid = formIsValid && action.inputIsValid;
        } else {
          formIsValid = formIsValid && state.inputs[inputID].isValid;
        }
      }
   
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.id]: {
            value: action.value,
            isValid: action.inputIsValid,
          },
        },
        formIsValid: formIsValid,
      };
    default:
      return state;
  }
};

const useForm = (initialInputs, initialValidity) => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: initialInputs,
    formIsValid: initialValidity,
  });

  const inputHandler = useCallback((id, value, inputIsValid) => {
    dispatch({
      type: 'INPUT_CHANGE',
      id,
      value,
      inputIsValid,
    });
  }, []);

  return [formState, inputHandler];
};

export default useForm;
