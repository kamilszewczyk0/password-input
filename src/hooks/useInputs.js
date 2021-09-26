import {createRef, useEffect, useMemo, useReducer, useRef} from "react";
import generatePasswordData from "../Components/generatePasswordData/generatePasswordData";
import SinglePasswordInput from "../Components/SinglePasswordInput/SinglePasswordInput";
import handlers from "../helpers/handlers/handlers";

const reducer = (state, action) => {
  switch (action.type) {
    case "ON_CHANGE":
      return {
        ...state,
        inputValues: {...state.inputValues, [action.field]: action.payload},
      };
    case "LOAD_INPUTS":
      return {
        ...state,
        inputsToIterate: new Array(action.payload).fill(""),
      };
    case "SHOW_HIDE_PASSWORD":
      return {
        ...state,
        passwordVisible: !state.passwordVisible,
      };
    case "SET_REFS":
      return {
        ...state,
        inputRefs: action.payload,
      };
    default:
      return state;
  }
};

const checkInputsValues = (correctValues, providedValues, onSuccess) => {
  const ifAllInputsFilled =
    providedValues && providedValues.every((item) => item && item.length);

  const allInputsFilled =
    correctValues &&
    correctValues.every(
      (_, index) => correctValues[index] === providedValues[index],
    );

  return ifAllInputsFilled ? onSuccess(allInputsFilled) : null;
};

const isActive = (array, inputIndex) =>
  array.some((index) => index === inputIndex);

//  HOOK
const useInputs = (password, onSuccess) => {
  const [inputsLength, initialStateValues, correctValuesMap] = useMemo(
    () => generatePasswordData(password),
    [password],
  );

  const initialReducerValues = {
    inputValues: {...initialStateValues},
    inputsToIterate: [],
    passwordVisible: false,
    inputRefs: [],
  };

  const [{inputValues, inputsToIterate, passwordVisible, inputRefs}, dispatch] =
    useReducer(reducer, initialReducerValues);

  const [handleChange, handleButtonClick, handleResetClick] = handlers(
    dispatch,
    inputRefs,
    inputValues,
  );

  const inputRef = useRef();

  inputRef.current = inputsToIterate.map(
    (_, index) => inputRef.current[index] ?? createRef(),
  );

  const passwordValues = Object.values(correctValuesMap);
  const givenValues = Object.values(inputValues);

  const activeIndexesArray = Object.keys(correctValuesMap).map((item) =>
    parseInt(item, 10),
  );

  useEffect(() => {
    dispatch({type: "SET_REFS", payload: inputRef});
  }, [dispatch, inputRef]);

  const finalInput = inputsToIterate.map((_, index) => {
    return (
      <SinglePasswordInput
        autoFocus={index === activeIndexesArray[0]}
        ref={inputRef.current[index]}
        maxLength="1"
        key={index}
        name={index}
        disabled={!isActive(activeIndexesArray, index)}
        onChange={handleChange}
        value={inputValues[index]}
        type={passwordVisible ? "text" : "password"}
      />
    );
  });

  return [
    inputsLength,
    inputsToIterate,
    passwordVisible,
    dispatch,
    handleButtonClick,
    handleResetClick,
    checkInputsValues,
    finalInput,
    passwordValues,
    givenValues,
  ];
};

export default useInputs;
