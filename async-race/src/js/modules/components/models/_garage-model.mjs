import BaseModel from './_base-model.mjs';
import { requestEndpoints, requestHeaders } from '../../utils/_utils.mjs';

const PAGINATION_VIEW_PAGE_ELEMENT = document.querySelector(
  '.pagination-view__page'
);

const MAX_CARS_PER_PAGE = 7;

export default class GarageModel extends BaseModel {
  #page;

  constructor() {
    super(requestEndpoints.garage);
    this.#page = Number(PAGINATION_VIEW_PAGE_ELEMENT.textContent);
  }

  async getCars(page = this.#page, limit = MAX_CARS_PER_PAGE) {
    const params = {
      _page: page,
      _limit: limit,
    };

    Object.entries(params).forEach(([key, value]) => {
      this.requestURL.searchParams.append(key, value);
    });

    const response = await fetch(this.requestURL.toString());

    return {
      data: await response.json(),
      limit: Number(response.headers.get(requestHeaders.xTotalCount)),
    };
  }
}
