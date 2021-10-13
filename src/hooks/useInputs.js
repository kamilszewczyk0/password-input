import {createRef, useEffect, useMemo, useReducer, useRef} from "react";
import generatePasswordData from "../Components/generatePasswordData/generatePasswordData";

import handlers from "../helpers/handlers/handlers";
import {StyledSinglePasswordInput} from "../styles/SinglePasswordInput/StyledSinglePasswordInput";
import {reducer} from "./useInputs/reducer";
import {initalState} from "./useInputs/state";

const isActive = (array, inputIndex) =>
  array.some((index) => index === inputIndex);

//  HOOK
const useInputs = (password) => {
  const [inputsLength, initialStateValues, correctValuesMap] = useMemo(
    () => generatePasswordData(password),
    [password],
  );

  const [
    {inputValues, inputsToIterate, passwordVisible, inputRefsCollection},
    dispatch,
  ] = useReducer(reducer, initalState);

  const [handleChange, handleButtonClick, handleResetClick] = handlers(
    dispatch,
    inputRefsCollection,
    inputValues,
  );

  const inputRef = useRef(null);

  inputRef.current = inputsToIterate.map(
    (_, index) => inputRef.current[index] ?? createRef(),
  );
  console.log(inputRef.current, "inputRef.current");
  console.log(inputRefsCollection, "inputRefsCollection");

  const passwordValues = useMemo(
    () => Object.values(correctValuesMap),
    [correctValuesMap],
  );
  const givenValues = useMemo(() => Object.values(inputValues), [inputValues]);

  const activeIndexesArray = useMemo(
    () => Object.keys(correctValuesMap).map((item) => parseInt(item, 10)),
    [correctValuesMap],
  );

  useEffect(() => {
    //montowanie komponenty=u
    dispatch({type: "LOAD_INPUTS", payload: inputsLength});
  }, [dispatch, inputsLength]);

  useEffect(() => {
    dispatch({type: "INIT_VALUES", payload: initialStateValues});
  }, [initialStateValues]);

  useEffect(() => {
    dispatch({type: "SET_REFS", payload: inputRef});
  }, [dispatch, inputRef]);

  const finalInput = inputsToIterate.map((_, index) => {
    return (
      <StyledSinglePasswordInput
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

  const toReturn = {
    innerAppState: {
      inputsToIterate,
      passwordVisible,
    },
    givenData: {
      passwordValues,
    },
    inputsData: {
      finalInput,
      givenValues,
    },
    actions: {
      handleButtonClick,
      handleResetClick,
    },
  };

  const {innerAppState, givenData, inputsData, actions} = toReturn;

  return {innerAppState, givenData, inputsData, actions};
};

export default useInputs;
