export const checkInputsValues = (
  correctValues: string[],
  providedValues: string[],
  onSuccess: OnSuccess,
): string | null => {
  const ifAllInputsFilled =
    providedValues && providedValues.every((item) => item && item.length);

  const allInputsFilled =
    correctValues &&
    correctValues.every(
      (_, index) => correctValues[index] === providedValues[index],
    );

  return ifAllInputsFilled ? onSuccess(allInputsFilled) : null;
};
