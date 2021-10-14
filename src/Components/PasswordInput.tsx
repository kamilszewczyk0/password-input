import {checkInputsValues} from "../helpers/utils/utils";
import useInputs from "../hooks/useInputs";

import {StyledSinglePasswordInput} from "../styles/SinglePasswordInput/StyledSinglePasswordInput";

const PasswordInput = ({
  password,
  onSuccess,
}: {
  password: string;
  onSuccess: (boolean: boolean) => string | null;
}): JSX.Element | null => {
  const {
    innerAppState: {inputsToIterate, passwordVisible},
    givenData: {
      passwordValues,
      activeIndexesArray,
      isActive,
      inputRef,
      inputValues,
    },
    inputsData: {givenValues},
    actions: {handleButtonClick, handleResetClick, handleChange},
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
            ref={inputRef.current![index]}
            maxLength={parseInt("1")}
            key={index}
            name={index.toString()}
            disabled={!isActive(activeIndexesArray, index)}
            onChange={handleChange}
            value={inputValues[index]}
            type={passwordVisible ? "text" : "password"}
          />
        );
      })}
      <button onClick={handleButtonClick}>
        {passwordVisible ? `Hide` : `Show`} password
      </button>
      <button onClick={handleResetClick}>Reset password</button>
      <p>{checkInputsValues(passwordValues, givenValues, onSuccess)}</p>
    </>
  );
};

export default PasswordInput;
