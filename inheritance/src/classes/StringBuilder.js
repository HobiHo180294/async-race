import EntityBuilder from "./EntityBuilder.js";

export default function StringBuilder(str = "") {
  if (typeof str !== "string")
    throw new TypeError("The data passed into constructor must be string!");

  EntityBuilder.call(this, str);
}

StringBuilder.prototype._areFuncArgumentsString = function (...funcArgs) {
  return funcArgs.some((element) => typeof element !== "string") ? false : true;
};

StringBuilder.prototype._throwErrIfFuncArgElemsNotString = function (
  ...funcArgs
) {
  if (!this._areFuncArgumentsString(...funcArgs))
    throw new TypeError("Arguments must be string!");
};

StringBuilder.prototype.plus = function (...str) {
  this._throwErrIfFuncArgElemsNotString(...str);
  this._entity += EntityBuilder.prototype.plus(...str);
  return this;
};

StringBuilder.prototype.minus = function (n) {
  this._entity = this._entity.slice(0, -n);
  return this;
};

StringBuilder.prototype.multiply = function (n) {
  this._entity = this._entity.repeat(n);
  return this;
};

StringBuilder.prototype.divide = function (n) {
  const k = Math.floor(this._entity.length / n);
  this._entity = this._entity.substring(0, k);
  return this;
};

StringBuilder.prototype.remove = function (str) {
  this._throwErrIfFuncArgElemsNotString(str);
  this._entity = this._entity.split(str).join("");
  return this;
};

StringBuilder.prototype.sub = function (from, n) {
  this._entity = this._entity.substring(from, n + 1);
  return this;
};

Object.setPrototypeOf(StringBuilder.prototype, EntityBuilder.prototype);
