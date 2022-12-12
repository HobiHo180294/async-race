// IntBuilder class

import EntityBuilder from "./EntityBuilder.js";

class IntBuilder extends EntityBuilder {
  #integer;

  constructor(integer) {
    super();

    if (typeof integer === "undefined") integer = 0;

    if (
      typeof integer !== "number" ||
      isNaN(integer) ||
      !Number.isInteger(integer)
    )
      throw new TypeError("The data passed into constructor must be integer!");

    this.#integer = integer;
  }

  plus(...n) {
    super.throwErrIfFuncArgElemsNotInteger(arguments);

    const sumOfArguments = super.getSumOfFuncArguments(arguments);

    this.#integer += sumOfArguments;

    return this.#integer;
  }

  minus(...n) {
    super.throwErrIfFuncArgElemsNotInteger(arguments);
    return (this.#integer -= super.getSumOfFuncArguments(arguments));
  }

  multiply(n) {
    return (this.#integer *= n);
  }

  divide(n) {
    return (this.#integer = Math.round(this.#integer / n));
  }

  mod(n) {
    return (this.#integer %= n);
  }

  get() {
    return this.#integer;
  }

  static random(from, to) {
    return Math.floor(Math.random() * (to - from) + from);
  }
}
