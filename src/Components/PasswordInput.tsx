import {checkInputsValues} from "../helpers/utils/utils";
import useInputs from "../hooks/useInputs";

const PasswordInput = ({
  password,
  onSuccess,
}: {
  password: string;
  onSuccess: OnSuccess;
}) => {
  const {
    innerAppState: {inputsToIterate, passwordVisible},
    givenData: {passwordValues},
    inputsData: {finalInput, givenValues},
    actions: {handleButtonClick, handleResetClick},
  } = useInputs(password);

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
