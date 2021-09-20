import {useState, useCallback, useEffect, useMemo} from "react";
import generatePasswordData from "../generatePasswordData/generatePasswordData";
import {SinglePasswordInput} from "../../styles/SinglePasswordInput/SinglePasswordInput";

const PasswordInput = ({password}) => {
  const [inputsLength, initialStateValues, correctValuesMap] = useMemo(
    () => generatePasswordData(password),
    [password],
  );

  const [onSuccess, setOnSuccess] = useState(false);

  const [inputValues, setInputValues] = useState(initialStateValues);

  const [inputsToIterate, setInputFields] = useState([]);

  const checkIfAllInputsHaveValues = Object.values(inputValues).every(
    (char) => char.length !== 0,
  );

  const checkInputsValues = useCallback(() => {
    const passwordValues = Object.values(correctValuesMap);
    const givenValues = Object.values(inputValues);

    const allInputsFilled = passwordValues.every(
      (_, index) => passwordValues[index] === givenValues[index],
    );
    console.log(allInputsFilled);
    if (allInputsFilled) setOnSuccess(true);
  }, [correctValuesMap, inputValues]);

  const handleChange = useCallback(
    (e) => {
      setInputValues({...inputValues, [e.target.name]: e.target.value});
    },
    [setInputValues, inputValues],
  );

  useEffect(() => {
    if (checkIfAllInputsHaveValues) {
      console.log(checkInputsValues());
    }
  }, [inputValues, checkIfAllInputsHaveValues, checkInputsValues]);

  useEffect(() => {
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

  // console.log("correctResults", correctValuesMap);
  // console.log(activeIndexesArray);
  // console.log(inputValues);

  const finalInput = inputsToIterate.map((_, index) => {
    // console.log(isActive(index));
    return (
      <SinglePasswordInput
        maxLength="1"
        key={index}
        name={index}
        disabled={!isActive(index)}
        onChange={handleChange}
        value={inputValues[index]}
        type="password"
      />
    );
  });

  return [finalInput];
};

export default PasswordInput;
