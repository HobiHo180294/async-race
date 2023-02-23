export default class GarageModel {
  #requestURL;

  #page;

  #garageEndpoint = '/garage';

  #xTotalCountHeader = 'X-Total-Count';

  constructor(apiURL) {
    this.#page = Number(
      document.querySelector('.pagination-view__page').textContent
    );
    this.#requestURL = apiURL;
  }

  async getCars(page = this.#page, limit = 7) {
    const url = new URL(this.#requestURL + this.#garageEndpoint);

    const params = {
      _page: page,
      _limit: limit,
    };

    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });

    const response = await fetch(url.toString());

    return {
      data: await response.json(),
      limit: Number(response.headers.get(this.#xTotalCountHeader)),
    };
  }

  get requestURL() {
    return this.#requestURL;
  }
}
