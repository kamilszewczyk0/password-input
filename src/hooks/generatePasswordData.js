const randomNumber = (min, max) => {
  return Math.floor(Math.random() * (max + 1 - min) + min);
};

const generateSet = (quantity, max) => {
  const set = new Set();
  while (set.size < quantity) {
    set.add(Math.floor(Math.random() * max));
  }
  return set;
};

const inputsLengthProvider = (string) => {
  const arrayLength = string.split("").length;
  return randomNumber(2 * arrayLength, arrayLength);
};

const setOfIndexes = (string) => {
  const arrayLength = string.split("").length;

  const setLength = randomNumber(0.6 * arrayLength, 0.4 * arrayLength);

  const setOfIndexes = generateSet(setLength, arrayLength);

  return [...setOfIndexes.values()];
};

const correctValuesArray = (keyArray, valueArray) => {
  return valueArray.filter((_, index) =>
    keyArray.some((item) => item === index),
  );
};
const generatePasswordData = (password) => {
  const inputsLength = inputsLengthProvider(password);

  const activeIndexesArray = setOfIndexes(password).sort((a, b) => a - b);

  const passwordArray = password.split("");

  const correctValues = correctValuesArray(activeIndexesArray, passwordArray);

  const initialStateValues = Object.fromEntries(
    activeIndexesArray.map((_, index) => [activeIndexesArray[index], ""]),
  );

  const correctValuesMap = Object.fromEntries(
    activeIndexesArray.map((_, index) => [
      activeIndexesArray[index],
      correctValues[index],
    ]),
  );

  return [inputsLength, initialStateValues, correctValuesMap];
};

export default generatePasswordData;
