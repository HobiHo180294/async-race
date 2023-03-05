import { getRequestURL } from '../../utils/_utils.mjs';

export default class BaseModel {
  #requestURL;

  constructor(requestEndpoint) {
    this.#requestURL = getRequestURL(requestEndpoint);
  }

  get requestURL() {
    return this.#requestURL;
  }
}
