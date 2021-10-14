interface IDynamicStringStringObject {
  [k: string]: string;
}

type OnSuccess = (boolean: boolean) => string | null;

interface ISingeRef {
  current: HTMLElement | null;
}

interface IRefCollection {
  current: ISingeRef[] | null;
}

interface IPasswordInputState {
  inputValues: IDynamicStringStringObject;
  inputsToIterate: ISingleRef[];
  passwordVisible: boolean;
  inputRefsCollection: IRefCollection;
}

type ACTIONTYPE =
  | {type: "INIT_VALUES"; payload: IDynamicStringStringObject}
  | {type: "ON_CHANGE"; field: string; payload: string}
  | {type: "LOAD_INPUTS"; payload: number}
  | {type: "SHOW_HIDE_PASSWORD"}
  | {type: "SET_REFS"; payload: IRefCollection};

