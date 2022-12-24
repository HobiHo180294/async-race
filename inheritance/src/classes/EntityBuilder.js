export default class EntityBuilder {
  constructor() {}

  plus() {
    return this.getSumOfFuncArguments(arguments);
  }

  minus() {}

  multiply() {}

  divide() {}

  getSumOfFuncArguments(funcArguments) {
    return Array.from(funcArguments).reduce((acc, curr) => acc + curr);
  }
}
