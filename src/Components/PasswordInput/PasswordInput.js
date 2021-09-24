import {useEffect} from "react";

import useInputs from "../../hooks/useInputs";

const PasswordInput = ({password, onSuccess}) => {
  const [
    inputsLength,
    inputsToIterate,
    passwordVisible,
    dispatch,
    handleButtonClick,
    handleResetClick,
    checkInputsValues,

    finalInput,
  ] = useInputs(password, onSuccess);

  useEffect(() => {
    //montowanie komponenty=u
    dispatch({type: "LOAD_INPUTS", payload: inputsLength});
  }, [dispatch, inputsLength]);

  if (inputsToIterate.length === 0) {
    return null;
  }

  return (
    <>
      {finalInput}
      <button onClick={handleButtonClick}>
        {passwordVisible ? `Hide` : `Show`} password
      </button>
      <button onClick={handleResetClick}>Reset password</button>
      <p>{checkInputsValues()}</p>
    </>
  );
};

export default PasswordInput;
