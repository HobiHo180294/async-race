export default class BaseController {
  #model;

  constructor(ModelClass, ...constructorParams) {
    this.#model = new ModelClass(...constructorParams);
  }

  get model() {
    return this.#model;
  }
}
