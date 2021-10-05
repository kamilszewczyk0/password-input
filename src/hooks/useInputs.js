import {createRef, useEffect, useMemo, useReducer, useRef} from "react";
import generatePasswordData from "../Components/generatePasswordData/generatePasswordData";
import SinglePasswordInput from "../Components/SinglePasswordInput/SinglePasswordInput";
import handlers from "../helpers/handlers/handlers";
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

  const [{inputValues, inputsToIterate, passwordVisible, inputRefs}, dispatch] =
    useReducer(reducer, initalState);

  const [handleChange, handleButtonClick, handleResetClick] = handlers(
    dispatch,
    inputRefs,
    inputValues,
  );

  const inputRef = useRef(null); // <HTMLElement | null>

  inputRef.current = inputsToIterate.map(
    (_, index) => inputRef.current[index] ?? createRef(),
  );

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

  const  {innerAppState, givenData, inputsData, actions} = toReturn;
  
  return {innerAppState, givenData, inputsData, actions};
};

export default useInputs;
