// Child StringBuilder class

import EntityBuilder from "./EntityBuilder.js";

// constructor takes starting string, if not passed starts with '';
export default function StringBuilder(str) {
  if (typeof str === "undefined") str = "";

  if (typeof str !== "string")
    throw new TypeError("The data passed into constructor must be string!");

  this._str = str;

  this._areFuncArgumentsString = function (funcArguments) {
    if (
      Array.from(funcArguments).some((element) => typeof element !== "string")
    )
      return false;

    return true;
  };

  this._throwErrIfFuncArgElemsNotString = function (funcArguments) {
    if (!this._areFuncArgumentsString(funcArguments))
      throw new TypeError("Arguments must be string!");
  };

  // takes infinite number of strings and concat with stored string;
  this.plus = function (...str) {
    this._throwErrIfFuncArgElemsNotString(arguments);
    return (this._str += EntityBuilder.prototype.plus(...str));
  };

  // remove taken string str from stored; Prohibited to use String.prototype.replace();
  this.remove = function (str) {
    this._throwErrIfFuncArgElemsNotString(arguments);
    return (this._str = this._str.split(str).join(""));
  };

  // leaves substring starting from and with length n;
  this.sub = function (from, n) {
    return (this._str = this._str.substring(from, n + 1));
  };

  // returns stored value;
  this.get = function () {
    return this._str;
  };
}

// cut last n chars from stored string;
EntityBuilder.prototype.minus = function (n) {
  return (this._str = this._str.slice(0, -n));
};

// repeat stored strings n times;
EntityBuilder.prototype.multiply = function (n) {
  return (this._str = this._str.repeat(n));
};

// leaves first k chars of stored string, where k = Math.floor(str.length / n);
EntityBuilder.prototype.divide = function (n) {
  const k = Math.floor(this._str.length / n);
  return (this._str = this._str.substring(0, k));
};

StringBuilder.toString = function (classObject) {
  console.log(
    "StringBuilder: " +
      "\n" +
      "=================================" +
      "\n" +
      "Plus method result: ",
    classObject.plus(" all", "!") + "\n" + "Minus method result: ",
    classObject.minus(4) + "\n" + "Multiply method result: ",
    classObject.multiply(3) + "\n" + "Divide method result: ",
    classObject.divide(4) + "\n" + "Remove method result: ",
    classObject.remove("l") + "\n" + "Sub method result: ",
    classObject.sub(1, 1) + "\n" + "Get method result: ",
    classObject.get() + "\n"
  );
};

function inherit(Child, Parent) {
  Child.prototype = new Parent();
}

inherit(StringBuilder, EntityBuilder);
