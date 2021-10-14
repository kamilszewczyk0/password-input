interface IDynamicStringStringObject {
  [k: string]: string;
}

type OnSuccess = (boolean: boolean) => string | null;

interface ISingeRef {
  current: HTMLInputElement | null;
}

interface IRefCollection {
  current: ISingeRef[] | null;
}

interface IPasswordInputState {
  inputValues: IDynamicStringStringObject;
  inputsToIterate: ISingleRef[] | string[];
  passwordVisible: boolean;
  inputRefsCollection: IRefCollection;
}

type ACTIONTYPE =
  | {type: "INIT_VALUES"; payload: IDynamicStringStringObject}
  | {type: "ON_CHANGE"; field: string; payload: string}
  | {type: "LOAD_INPUTS"; payload: number}
  | {type: "SHOW_HIDE_PASSWORD"}
  | {type: "SET_REFS"; payload: IRefCollection};

interface IInnerAppState {
  inputsToIterate: ISingleRef[] | string[];
  passwordVisible: boolean;
}

interface IGivenData {
  passwordValues: stiring[];
  activeIndexesArray: number[];
  isActive: (array: number[], inputIndex: number) => boolean;
  inputRef: React.MutableRefObject<ISingeRef[] | null>;
  inputValues: IDynamicStringStringObject;
}

interface IInputsData {
  givenValues: string[];
}

interface IActions {
  handleButtonClick: (e: React.MouseEvent) => void;
  handleResetClick: (e: React.MouseEvent) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}


interface IToReturn {
  innerAppState: IInnerAppState;
  givenData: IGivenData;
  inputsData: IInputsData;
  actions: IActions;
}