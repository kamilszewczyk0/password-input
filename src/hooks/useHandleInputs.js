import {useCallback, useEffect, useMemo, useReducer, useRef} from "react";
import generatePasswordData from "../Components/generatePasswordData/generatePasswordData";

const useHandleInputs = ({password, onSuccess}) => {
  const [inputsLength, initialStateValues, correctValuesMap] = useMemo(
    () => generatePasswordData(password),
    [password],
  );

  const initialReducerValues = {
    inputValues: initialStateValues,
    inputsToIterate: [],
    passwordShown: false,
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "ON_CHANGE":
        return {
          ...state,
          inputValues: {...inputValues, [action.field]: action.payload},
        };
      case "SET_INPUT_FIELDS":
        return new Array(inputsLength).fill("");
      case "TOGGLE_SHOW_PASSWORD":
        return {...state, passwordShown: !passwordShown};
      default:
        return state;
    }
  };

  const [{inputValues, inputsToIterate, passwordShown}, dispatch] = useReducer(
    reducer,
    initialReducerValues,
  );

  const inputRef = useRef([]);

  const checkIfAllInputsHaveValues = Object.values(inputValues).every(
    (char) => char.length !== 0,
  );

  const checkInputsValues = useCallback(() => {
    const passwordValues = Object.values(correctValuesMap);
    const givenValues = Object.values(inputValues);

    const allInputsFilled = passwordValues.every(
      (_, index) => passwordValues[index] === givenValues[index],
    );

    if (allInputsFilled) {
      onSuccess(inputValues);
    }
  }, [correctValuesMap, inputValues, onSuccess]);

  const handleChange = useCallback((e) => {
    dispatch({
      type: "ON_CHANGE",
      field: e.target.name,
      payload: e.target.value,
    });
  }, []);

  const handleButtonClick = () => {
    dispatch({type: "TOGGLE_SHOW_PASSWORD"});
  };

  useEffect(() => {
    if (checkIfAllInputsHaveValues) {
      checkInputsValues();
    }
  }, [inputValues, checkIfAllInputsHaveValues, checkInputsValues]);

  useEffect(() => {
    console.log(inputRef.current[6]);
  }, [inputRef]);

  useEffect(() => {
    //montowanie komponenty=u
    dispatch({type: "SET_INPUT_FIELDS"});
  }, [inputsLength]);

  if (inputsToIterate.length === 0) {
    return null;
  }

  const activeIndexesArray = Object.keys(correctValuesMap).map((item) =>
    parseInt(item, 10),
  );

  const isActive = (inputIndex) =>
    activeIndexesArray.some((index) => index === inputIndex);

  return [];
};

export default useHandleInputs;
