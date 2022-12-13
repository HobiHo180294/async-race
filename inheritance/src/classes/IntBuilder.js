// Child IntBuilder class

import EntityBuilder from "./EntityBuilder.js";

export default class IntBuilder extends EntityBuilder {
  #integer;

  // constructor takes starting integer, if not passed starts with 0;
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

  _areFuncArgumentsInteger(funcArguments) {
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

  _throwErrIfFuncArgElemsNotInteger(funcArguments) {
    if (!this._areFuncArgumentsInteger(funcArguments))
      throw new TypeError("Arguments must be integers!");
  }

  // take infinite number of integers and sum all with stored value;
  plus(...n) {
    this._throwErrIfFuncArgElemsNotInteger(arguments);
    return (this.#integer += super.plus(...n));
  }

  // take infinite number of integers and subtract from stored value;
  minus(...n) {
    this._throwErrIfFuncArgElemsNotInteger(arguments);
    return (this.#integer -= super.getSumOfFuncArguments(arguments));
  }

  // multiply param n on stored value;
  multiply(n) {
    return (this.#integer *= n);
  }

  // leaves integer part of division stored value on n;
  divide(n) {
    return (this.#integer = Math.round(this.#integer / n));
  }

  // leaves remainder of the division stored value with on n;
  mod(n) {
    return (this.#integer %= n);
  }

  // returns stored value;
  get() {
    return this.#integer;
  }

  // static method; from, to: integer; values limits the range of random values;
  static random(from, to) {
    return Math.floor(Math.random() * (to - from) + from);
  }

  static toString(className, classObject) {
    console.log(
      "IntBuilder: " +
        "\n" +
        "=================================" +
        "\n" +
        "Random method result: ",
      className.random(10, 100) + "\n" + "Plus method result: ",
      classObject.plus(2, 3, 2) + "\n" + "Minus method result: ",
      classObject.minus(1, 2) + "\n" + "Multiply method result: ",
      classObject.multiply(2) + "\n" + "Divide method result: ",
      classObject.divide(4) + "\n" + "Mod method result: ",
      classObject.mod(3) + "\n" + "Get method result: ",
      classObject.get() + "\n"
    );
  }
}
