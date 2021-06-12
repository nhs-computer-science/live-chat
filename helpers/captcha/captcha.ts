const generateRandomInteger = (max?: number): number =>
  Math.floor(Math.random() * (max ? max : 11));

export default (): object => {
  return {
    num1: generateRandomInteger(),
    num2: generateRandomInteger(),
  };
};
