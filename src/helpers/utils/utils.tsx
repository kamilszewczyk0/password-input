export const checkInputsValues = (correctValues, providedValues, onSuccess) => {
  const ifAllInputsFilled =
    providedValues && providedValues.every((item) => item && item.length);

  const allInputsFilled =
    correctValues &&
    correctValues.every(
      (_, index) => correctValues[index] === providedValues[index],
    );

  return ifAllInputsFilled ? onSuccess(allInputsFilled) : null;
};