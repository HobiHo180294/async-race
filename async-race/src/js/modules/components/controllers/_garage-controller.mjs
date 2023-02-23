import GarageModel from '../models/_garage-model.mjs';
import { SERVER_URL } from '../../utils/_utils.mjs';

export default class GarageController {
  #garage;

  constructor() {
    this.#garage = new GarageModel(SERVER_URL);
  }

  async getCars() {
    return this.#garage.getCars();
  }

  getRequestURL() {
    return this.#garage.requestURL;
  }
}
