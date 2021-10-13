const handlers = (dispatch, ref, valuesObject) => {
  const settingFocus = (array) => {
    if (array.current) {
      const emptyEnabledInputsArray = array.current.filter(
        (item) => !item.current.disabled && !item.current.value,
      );
      if (emptyEnabledInputsArray.length)
        emptyEnabledInputsArray[0].current.focus();
    }
  };

  const handleChange = (e) => {
    dispatch({
      type: "ON_CHANGE",
      field: e.target.name,
      payload: e.target.value,
    });
    settingFocus(ref);
  };

  const handleButtonClick = () => {
    dispatch({type: "SHOW_HIDE_PASSWORD"});

    setTimeout(() => {
      settingFocus(ref);
    }, 0);
  };

  const handleResetClick = () => {
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
