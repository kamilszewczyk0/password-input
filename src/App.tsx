import PasswordInput from "./Components/PasswordInput";

const pass: string = "qwerty";
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
      <PasswordInput password={pass} onSuccess={onSuccess} />
    </div>
  );
}

export default App;
