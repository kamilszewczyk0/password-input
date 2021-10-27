import PasswordInput from "./Components/PasswordInput";

const pass: string = "password";
const onSuccess = (boolean: boolean): string | null => {
  switch (boolean) {
    case true:
      return "Password correct";
    case false:
      return "Enter correct password";
    default:
      return null;
  }
};

function App() {
  return (
    <div>
      <p>Correct password: {pass}</p>
      <PasswordInput password={pass} onSuccess={onSuccess} />
    </div>
  );
}

export default App;
