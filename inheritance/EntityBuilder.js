// Parent abstract class EntityBuilder

export default class EntityBuilder {
  #type;

  constructor() {}

  plus(...data) {
    return this.getSumOfFuncArguments(arguments);
  }

  minus() {}

  multiply() {}

  divide() {}

  getSumOfFuncArguments(funcArguments) {
    return Array.from(funcArguments).reduce((acc, curr) => acc + curr);
  }
}
