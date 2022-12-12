export default class EntityBuilder {
  constructor() {}

  plus() {}

  minus() {}

  multiply() {}

  divide() {}

  getSumOfFuncArguments(funcArguments) {
    return Array.from(funcArguments).reduce((acc, curr) => acc + curr);
  }

  areFuncArgumentsInteger(funcArguments) {
    if (
      Array.from(Array.from(funcArguments)).some(
        (element) =>
          typeof element !== "number" ||
          isNaN(element) ||
          !Number.isInteger(element)
      )
    )
      return false;

    return true;
  }

  throwErrIfFuncArgElemsNotInteger(funcArguments) {
    if (!this.areFuncArgumentsInteger(funcArguments))
      throw new TypeError("Arguments must be integers!");
  }
}
