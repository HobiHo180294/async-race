function EntityBuilder(entity) {
  typeof entity === "number" ? (this._integer = entity) : (this._str = entity);

  this.get = function () {
    return typeof entity === "number" ? this._integer : this._str;
  };
}

EntityBuilder.prototype._getSumOfFuncArguments = function (funcArguments) {
  return [...funcArguments].reduce((acc, curr) => acc + curr);
};

EntityBuilder.prototype.plus = function (...data) {
  return this._getSumOfFuncArguments(data);
};

EntityBuilder.prototype.minus = function () {};

EntityBuilder.prototype.multiply = function () {};

EntityBuilder.prototype.divide = function () {};

export default EntityBuilder;
