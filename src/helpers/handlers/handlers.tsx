import React from "react";

const handlers = (
  dispatch: React.Dispatch<ACTIONTYPE>,
  ref: IRefCollection,
  valuesObject: IDynamicStringStringObject,
): [
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  handleButtonClick: (e: React.MouseEvent) => void,
  handleResetClick: (e: React.MouseEvent) => void,
] => {
  const settingFocus = (element: IRefCollection): void => {
    if (element.current) {
      const emptyEnabledInputsArray = element.current.filter((item) => {
        return item.current && !item.current.disabled && !item.current.value;
      });
      if (emptyEnabledInputsArray.length)
        emptyEnabledInputsArray[0].current &&
          emptyEnabledInputsArray[0].current.focus();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch({
      type: "ON_CHANGE",
      field: e.target.name,
      payload: e.target.value,
    });
    settingFocus(ref);
  };

  const handleButtonClick = (e: React.MouseEvent): void => {
    dispatch({type: "SHOW_HIDE_PASSWORD"});

    setTimeout(() => {
      settingFocus(ref);
    }, 0);
  };

  const handleResetClick = (e: React.MouseEvent): void => {
    for (const value in valuesObject) {
      if (valuesObject.hasOwnProperty(value))
        dispatch({
          type: "ON_CHANGE",
          field: value,
          payload: "",
        });
    }

    setTimeout(() => {
      settingFocus(ref);
    }, 0);
  };

  return [handleChange, handleButtonClick, handleResetClick];
};

export default handlers;
