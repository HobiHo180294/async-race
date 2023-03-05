export default class BaseView {
  #apiController;

  constructor(ApiControllerClass) {
    this.#apiController = new ApiControllerClass();
  }

  get apiController() {
    return this.#apiController;
  }
}
