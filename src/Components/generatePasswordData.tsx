const randomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max + 1 - min) + min);
};

const generateSet = (quantity: number, max: number): Set<number> => {
  const set: Set<number> = new Set();
  while (set.size < quantity) {
    set.add(Math.floor(Math.random() * max));
  }
  return set;
};

const inputsLengthProvider = (string: string): number => {
  const arrayLength = string.split("").length;
  return randomNumber(2 * arrayLength, arrayLength);
};

const setOfIndexes = (string: string): number[] => {
  const arrayLength: number = string.split("").length;

  const setLength: number = randomNumber(0.6 * arrayLength, 0.4 * arrayLength);

  const setOfIndexes = generateSet(setLength, arrayLength);

  return [...setOfIndexes.values()];
};

const correctValuesArray = (
  keyArray: number[],
  valueArray: string[],
): string[] => {
  return valueArray.filter((_, index) =>
    keyArray.some((item) => item === index),
  );
};
const generatePasswordData = (
  password: string,
): [
  inputsLength: number,
  initialStateValues: IDynamicStringStringObject,
  correctValuesMap: IDynamicStringStringObject,
] => {
  const inputsLength: number = inputsLengthProvider(password);

  const activeIndexesArray: number[] = setOfIndexes(password).sort(
    (a, b) => a - b,
  );

  const passwordArray: string[] = password.split("");

  const correctValues: string[] = correctValuesArray(
    activeIndexesArray,
    passwordArray,
  );

  const initialStateValues: IDynamicStringStringObject = Object.fromEntries(
    activeIndexesArray.map((_, index) => [activeIndexesArray[index], ""]),
  );

  const correctValuesMap: IDynamicStringStringObject = Object.fromEntries(
    activeIndexesArray.map((_, index) => [
      activeIndexesArray[index],
      correctValues[index],
    ]),
  );

  return [inputsLength, initialStateValues, correctValuesMap];
};

export default generatePasswordData;
