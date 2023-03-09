import { getRequestURL } from '../../utils/_utils.mjs';

export default class BaseModel {
  #baseURL;

  #requestURL;

  constructor(requestEndpoint) {
    this.#baseURL = 'http://127.0.0.1:3000';
    this.#requestURL = getRequestURL(this.#baseURL, requestEndpoint);
  }

  get requestURL() {
    return this.#requestURL;
  }
}
