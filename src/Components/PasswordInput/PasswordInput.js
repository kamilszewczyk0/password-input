import {
  useState,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  createRef,
} from "react";
import generatePasswordData from "../generatePasswordData/generatePasswordData";
import SinglePasswordInput from "../../Components/SinglePasswordInput/SinglePasswordInput.js";

const PasswordInput = ({password, onSuccess}) => {
  const [inputsLength, initialStateValues, correctValuesMap] = useMemo(
    () => generatePasswordData(password),
    [password],
  );

  const [inputValues, setInputValues] = useState(initialStateValues);
  const [inputsToIterate, setInputFields] = useState([]);
  const [passwordShown, setPasswordShown] = useState(false);

  const [inputReff, setInputRef] = useState([]);
  const inputRef = useRef([]);

  inputRef.current = inputsToIterate.map(
    (_, index) => inputRef.current[index] ?? createRef(),
  );

  const checkIfAllInputsHaveValues = Object.values(inputValues).every(
    (char) => char.length !== 0,
  );

  const checkInputsValues = useCallback(() => {
    const passwordValues = Object.values(correctValuesMap);
    const givenValues = Object.values(inputValues);

    const allInputsFilled = passwordValues.every(
      (_, index) => passwordValues[index] === givenValues[index],
    );

    onSuccess(allInputsFilled);
    console.log(onSuccess(allInputsFilled));
  }, [correctValuesMap, inputValues, onSuccess]);

  const handleChange = useCallback(
    (e) => {
      setInputValues({...inputValues, [e.target.name]: e.target.value});
      if (inputReff.current) {
        const emptyEnabledInputsArray = inputReff.current.filter(
          (item) => !item.current.disabled && !item.current.value,
        );
        if (emptyEnabledInputsArray.length)
          emptyEnabledInputsArray[0].current.focus();
      }
    },
    [setInputValues, inputValues, inputReff],
  );

  const handleButtonClick = () => {
    setPasswordShown(!passwordShown);
  };

  useEffect(() => {
    if (checkIfAllInputsHaveValues) {
      checkInputsValues();
    }
  }, [inputValues, checkIfAllInputsHaveValues, checkInputsValues]);

  useEffect(() => {
    setInputRef(inputRef);
  }, [inputRef]);

  useEffect(() => {
    //montowanie komponenty=u
    setInputFields(new Array(inputsLength).fill(""));
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
      {<p>{onSuccess()}</p>}
    </>
  );
};

export default PasswordInput;
