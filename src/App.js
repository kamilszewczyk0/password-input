import PasswordInput from "./Components/PasswordInput/PasswordInput";

const pass = "qwerty";
const onSuccess = (boolean) => {
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

// dupa123

// [d,u,p,a,1,2,3] czyli ile inputów realnie ma hasło

// [*,*,p,a,*,*,3]

// const map = {
//   2:'p',
//   3:'a',
//   6:'3'
// }
// [*,*,p,a,*,*,3]

// ile inputów powienien widzieć człowiek od 7 do 14
// [*,*,p,a,*,*,3] któ©e z liter użytkownik ma podać
// [0,0,1,1,0,0,1,0,0,0,0,0,0,0,0] któ©e z inputów użytkownik ma odblokowane do wpisania


