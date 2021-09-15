import {SinglePasswordInput} from "../../styles/SinglePasswordInput/SinglePasswordInput";

const PasswordInput = ({password}) => {
  const passwordArray = password.split("");

  return passwordArray.map((char, index) => {
    return (
      <SinglePasswordInput
        maxLength="1"
        key={index}
        disabled={index % 2 === 0}
      />
    );
  });
};

export default PasswordInput;
