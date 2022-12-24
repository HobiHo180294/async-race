import EntityBuilder from "./EntityBuilder.js";

export default class IntBuilder extends EntityBuilder {
  #integer;

  constructor(integer = 0) {
    super();

    if (
      typeof integer !== "number" ||
      isNaN(integer) ||
      !Number.isInteger(integer)
    )
      throw new TypeError("The data passed into constructor must be integer!");

    this.#integer = integer;
  }

  #areFuncArgumentsInteger(funcArguments) {
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

  #throwErrIfFuncArgElemsNotInteger(funcArguments) {
    if (!this.#areFuncArgumentsInteger(funcArguments))
      throw new TypeError("Arguments must be integers!");
  }

  plus(...n) {
    this.#throwErrIfFuncArgElemsNotInteger(arguments);
    this.#integer += super.plus(...n);
    return this;
  }

  minus(...n) {
    this.#throwErrIfFuncArgElemsNotInteger(arguments);
    this.#integer -= super.getSumOfFuncArguments(arguments);
    return this;
  }

  multiply(n) {
    this.#integer *= n;
    return this;
  }

  divide(n) {
    this.#integer = Math.round(this.#integer / n);
    return this;
  }

  mod(n) {
    this.#integer %= n;
    return this;
  }

  get() {
    return this.#integer;
  }

  static random(from, to) {
    return Math.floor(Math.random() * (to - from) + from);
  }
}
