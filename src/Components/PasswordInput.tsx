import {checkInputsValues} from "../helpers/utils/utils";
import useInputs from "../hooks/useInputs";
import { StyledSinglePasswordInput } from "../styles/SinglePasswordInput/StyledSinglePasswordInput";

const PasswordInput = ({
  password,
  onSuccess,
}: {
  password: string;
  onSuccess: OnSuccess;
}): JSX.Element | null => {
  const {
    innerAppState: {inputsToIterate, passwordVisible},
    givenData: {passwordValues},
    inputsData: { givenValues},
    actions: {handleButtonClick, handleResetClick},
  } = useInputs(password);

  if (inputsToIterate.length === 0) {
    return null;
  }

  return (
    <>
      {inputsToIterate.map((_, index) => {
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
  });}
      <button onClick={handleButtonClick}>
        {passwordVisible ? `Hide` : `Show`} password
      </button>
      <button onClick={handleResetClick}>Reset password</button>
      <p>{checkInputsValues(passwordValues, givenValues, onSuccess)}</p>
    </>
  );
};

export default PasswordInput;

// useEffect(() => {
//   //montowanie komponenty=u
//   dispatch({type: "LOADING"}); // isBusy - true

//   dispatch({type: "LOAD_INPUTS", payload: inputsLength});
//   dispatch({type: "LOADING"}); // isBusy - false
// }, [dispatch, inputsLength]);

// if (inputsToIterate.length === 0) {
//   return null;
// // }
