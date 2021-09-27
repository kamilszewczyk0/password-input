export const reducer = (state, action) => {
  switch (action.type) {
    case "INIT_VALUES":
      return {
        ...state,
        inputValues: action.payload,
      };
    case "ON_CHANGE":
      return {
        ...state,
        inputValues: {...state.inputValues, [action.field]: action.payload},
      };
    case "LOAD_INPUTS":
      return {
        ...state,
        inputsToIterate: new Array(action.payload).fill(""),
      };
    case "SHOW_HIDE_PASSWORD":
      return {
        ...state,
        passwordVisible: !state.passwordVisible,
      };
    case "SET_REFS":
      return {
        ...state,
        inputRefs: action.payload,
      };
    default:
      return state;
  }
};
