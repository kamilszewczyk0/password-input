import {createRef, useEffect, useMemo, useReducer, useRef} from "react";
import generatePasswordData from "../Components/generatePasswordData";

import handlers from "../helpers/handlers/handlers";
import {reducer} from "./useInputs/reducer";
import {initalState} from "./useInputs/state";

const isActive = (array: number[], inputIndex: number): boolean =>
  array.some((index) => index === inputIndex);

//  HOOK
const useInputs = (password: string) => {
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

  const inputRef = useRef<ISingeRef[] | null>(null);

  inputRef.current = inputsToIterate.map(
    (_, index) => inputRef.current![index] ?? createRef(),
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

  const toReturn = {
    innerAppState: {
      inputsToIterate,
      passwordVisible,
    },
    givenData: {
      passwordValues,
      activeIndexesArray,
      isActive,
      inputRef,
      inputValues,
    },
    inputsData: {
      givenValues,
    },
    actions: {
      handleButtonClick,
      handleResetClick,
      handleChange,
    },
  };

  const {innerAppState, givenData, inputsData, actions} = toReturn;

  return {innerAppState, givenData, inputsData, actions};
};

export default useInputs;
