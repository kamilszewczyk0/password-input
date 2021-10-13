interface IDynamicStringStringObject {
  [k: string]: string;
}

interface ISingeRef {
  current: HTMLElement;
}

interface IRefCollection {
  current: ISingeRef[];
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
