import {useState, useCallback, useEffect, useMemo} from "react";
import generatePasswordData from "../../hooks/generatePasswordData";
import {SinglePasswordInput} from "../../styles/SinglePasswordInput/SinglePasswordInput";

const PasswordInput = ({password}) => {
  const [inputsLength, initialStateValues, correctValuesMap] = useMemo(
    () => generatePasswordData(password),
    [password],
  );

  const [inputValues, setInputValues] = useState(initialStateValues);

  const [inputsToIterate, setInputFields] = useState([]);

  const handleChange = useCallback(
    (e) => {
      setInputValues({...inputValues, [e.target.name]: e.target.value});
    },
    [setInputValues, inputValues],
  );

  useEffect(() => {
    // console.log("inputsLength", inputsLength);
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

  console.log("correctResults", correctValuesMap);
  console.log(activeIndexesArray);

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
      />
    );
  });

  return finalInput;
};

export default PasswordInput;
