import { useReducer, useCallback } from 'react';

const formReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE':
      let isValid = true;
      for (const inputID in state.inputs) {
        if (!state.inputs[inputID]) {
          continue;
        }
        if (inputID === action.id) {
          isValid = isValid && action.isValid;
        } else {
          isValid = isValid && state.inputs[inputID].isValid;
        }
      }
      
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.id]: {
            value: action.value,
            isValid: action.isValid
          }
        },
        formIsValid: isValid,
      };

    default:
      return state;
  }
};

const useForm = (initialInputs, initialValidity) => {
  const initialState = {
    inputs: initialInputs,
    formIsValid: initialValidity,
  };
  const [formState, dispatch] = useReducer(formReducer, initialState);

  const inputHandler = useCallback((id, value, isValid) => {
    dispatch({
      type: 'CHANGE',
      id,
      value,
      isValid,
    });
  }, []);

  return [formState, inputHandler];
};

export default useForm;
