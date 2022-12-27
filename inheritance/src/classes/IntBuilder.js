import EntityBuilder from "./EntityBuilder.js";

export default class IntBuilder extends EntityBuilder {
  constructor(integer = 0) {
    if (
      typeof integer !== "number" ||
      isNaN(integer) ||
      !Number.isInteger(integer)
    )
      throw new TypeError("The data passed into constructor must be integer!");

    super(integer);
  }

  #areFuncArgumentsInteger(...funcArguments) {
    return funcArguments.some(
      (element) =>
        typeof element !== "number" ||
        isNaN(element) ||
        !Number.isInteger(element)
    )
      ? false
      : true;
  }

  #throwErrIfFuncArgElemsNotInteger(...funcArguments) {
    if (!this.#areFuncArgumentsInteger(...funcArguments))
      throw new TypeError("Arguments must be integers!");
  }

  plus(...n) {
    this.#throwErrIfFuncArgElemsNotInteger(...n);
    this._integer += super.plus(...n);
    return this;
  }

  minus(...n) {
    this.#throwErrIfFuncArgElemsNotInteger(...n);
    this._integer -= super._getSumOfFuncArguments(n);
    return this;
  }

  multiply(n) {
    this._integer *= n;
    return this;
  }

  divide(n) {
    this._integer = Math.round(this._integer / n);
    return this;
  }

  mod(n) {
    this._integer %= n;
    return this;
  }

  static random(from, to) {
    return Math.floor(Math.random() * (to - from) + from);
  }
}
