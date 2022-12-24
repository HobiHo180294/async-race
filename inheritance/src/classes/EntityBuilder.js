export default class EntityBuilder {
  constructor() {}

  plus(...data) {
    return this.getSumOfFuncArguments(data);
  }

  minus() {}

  multiply() {}

  divide() {}

  getSumOfFuncArguments(funcArguments) {
    return Array.from(funcArguments).reduce((acc, curr) => acc + curr);
  }
}
