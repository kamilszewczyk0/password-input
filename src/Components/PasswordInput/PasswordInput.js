import {
  useState,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  createRef,
  useReducer,
} from "react";
import generatePasswordData from "../generatePasswordData/generatePasswordData";
import SinglePasswordInput from "../../Components/SinglePasswordInput/SinglePasswordInput.js";

const PasswordInput = ({password, onSuccess}) => {
  const [inputsLength, initialStateValues, correctValuesMap] = useMemo(
    () => generatePasswordData(password),
    [password],
  );

  const initialReducerValues = {
    inputValues: {...initialStateValues},
    inputsToIterate: [],
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "ON_CHANGE":
        return {
          ...state,
          inputValues: {...state.inputValues, [action.field]: action.payload},
        };
      case "LOAD_INPUTS":
        return new Array(action.payload).fill("");
      default:
        return state;
    }
  };

  const [{inputValues}, dispatch] = useReducer(reducer, initialReducerValues);
  console.log(inputValues);

  const [inputsToIterate, setInputFields] = useState([]);
  const [passwordShown, setPasswordShown] = useState(false);

  const [inputReff, setInputRef] = useState([]);
  const inputRef = useRef([]);

  inputRef.current = inputsToIterate.map(
    (_, index) => inputRef.current[index] ?? createRef(),
  );

  const settingFocus = (array) => {
    if (array.current) {
      const emptyEnabledInputsArray = array.current.filter(
        (item) => !item.current.disabled && !item.current.value,
      );
      if (emptyEnabledInputsArray.length)
        emptyEnabledInputsArray[0].current.focus();
    }
  };

  const checkInputsValues = useCallback(() => {
    const passwordValues = Object.values(correctValuesMap);
    const givenValues = Object.values(inputValues);

    const ifAllInputsFilled = givenValues.every((item) => item && item.length);

    const allInputsFilled = passwordValues.every(
      (_, index) => passwordValues[index] === givenValues[index],
    );

    return ifAllInputsFilled ? onSuccess(allInputsFilled) : null;
  }, [correctValuesMap, inputValues, onSuccess]);

  const handleChange = useCallback(
    (e) => {
      dispatch({
        type: "ON_CHANGE",
        field: e.target.name,
        payload: e.target.value,
      });
      settingFocus(inputReff);
    },
    [dispatch, inputReff],
  );

  const handleButtonClick = () => {
    setPasswordShown(!passwordShown);
  };

  const handleResetClick = useCallback(() => {
    for (const value in inputValues) {
      if (inputValues.hasOwnProperty(value))
        dispatch({
          type: "ON_CHANGE",
          field: value,
          payload: "",
        });
    }

    setTimeout(() => {
      settingFocus(inputReff);
    }, 0);
  }, [inputReff, inputValues]);

  useEffect(() => {
    const checkIfAllInputsHaveValues = Object.values(inputValues).every(
      (char) => char && char.length !== 0,
    );
    if (checkIfAllInputsHaveValues) {
      checkInputsValues();
    }
  }, [inputValues, checkInputsValues]);

  useEffect(() => {
    setInputRef(inputRef);
  }, [inputRef]);

  useEffect(() => {
    //montowanie komponenty=u
    setInputFields(new Array(inputsLength).fill(""));
    // dispatch({type: "LOAD_INPUTS", payload: inputsLength});
  }, [inputsLength]);

  if (inputsToIterate.length === 0) {
    return null;
  }

  const activeIndexesArray = Object.keys(correctValuesMap).map((item) =>
    parseInt(item, 10),
  );

  const isActive = (inputIndex) =>
    activeIndexesArray.some((index) => index === inputIndex);

  const finalInput = inputsToIterate.map((_, index) => {
    return (
      <SinglePasswordInput
        autoFocus={index === activeIndexesArray[0]}
        ref={inputRef.current[index]}
        maxLength="1"
        key={index}
        name={index}
        disabled={!isActive(index)}
        onChange={handleChange}
        value={inputValues[index]}
        type={passwordShown ? "text" : "password"}
      />
    );
  });

  return (
    <>
      {finalInput}
      <button onClick={handleButtonClick}>
        {passwordShown ? `Hide` : `Show`} password
      </button>
      <button onClick={handleResetClick}>Reset password</button>
      <p>{checkInputsValues()}</p>
    </>
  );
};

export default PasswordInput;
