import { updateElementsAttribute } from '../utils/_funcs.mjs';

export default class AsyncRaceAPI {
  #garageEndpoint = '/garage';

  #xTotalCountHeader = 'X-Total-Count';

  constructor(url) {
    this.url = url;
    this.isReachable = false;
  }

  static setContentGroupID(viewContentGroups, groupID) {
    updateElementsAttribute(viewContentGroups, groupID, 'data-id', 'id');
  }

  async #checkReachability() {
    try {
      const response = await fetch(this.url);
      return response.status === 200;
    } catch (error) {
      return false;
    }
  }

  async initialize() {
    this.isReachable = await this.#checkReachability();
  }

  async getCars(page = 1, limit = 7) {
    const url = new URL(this.url + this.#garageEndpoint);

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
}
