export default class AsyncRaceAPIModel {
  #apiURL;

  constructor(apiURL) {
    this.#apiURL = apiURL;
  }

  get apiURL() {
    return this.#apiURL;
  }

  async isReachable() {
    try {
      const response = await fetch(this.apiURL);
      return response.status === 200;
    } catch (error) {
      return { errorName: error.name, errorMessage: error.message };
    }
  }
}
