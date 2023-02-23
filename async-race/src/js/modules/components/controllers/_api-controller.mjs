import AsyncRaceAPIModel from '../models/_api-model.mjs';
import { SERVER_URL } from '../../utils/_utils.mjs';

export default class AsyncRaceAPIController {
  #asyncRaceAPIInstance;

  constructor() {
    this.#asyncRaceAPIInstance = new AsyncRaceAPIModel(SERVER_URL);
  }

  async isModelReachable() {
    return this.#asyncRaceAPIInstance.isReachable();
  }

  getApiURL() {
    return this.#asyncRaceAPIInstance.apiURL;
  }
}
