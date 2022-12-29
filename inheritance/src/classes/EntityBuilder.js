function EntityBuilder(entity) {
  this._entity = entity;
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

EntityBuilder.prototype.get = function () {
  return this._entity;
}

export default EntityBuilder;
