import BaseModel from './_base-model.mjs';
import {
  getRequestURL,
  requestEndpoints,
  requestHeaders,
} from '../../utils/_utils.mjs';

export default class GarageModel extends BaseModel {
  constructor() {
    super(requestEndpoints.garage);
  }

  async getCars(page, limit) {
    const params = {
      _page: page,
      _limit: limit,
    };

    Object.entries(params).forEach(([key, value]) => {
      this.requestURL.searchParams.append(key, value);
    });

    const response = await fetch(this.requestURL.toString());

    this.requestURL.search = '';

    return {
      data: await response.json(),
      limit: Number(response.headers.get(requestHeaders.xTotalCount)),
    };
  }

  async getCar(id) {
    const requestStr = getRequestURL(
      this.requestURL.toString(),
      `/${id}`
    ).toString();

    const response = await fetch(requestStr);
    const responseData = await response.json();

    if (!response.ok)
      return {
        statusCode: response.status,
        statusText: response.statusText,
        data: responseData,
      };

    return {
      data: responseData,
    };
  }

  async createCar(name, color) {
    const response = await fetch(this.requestURL.toString(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        color,
      }),
    });

    const responseData = await response.json();

    return {
      name: responseData.name,
      color: responseData.color,
      id: responseData.id,
    };
  }

  async deleteCar(id) {
    const requestStr = getRequestURL(
      this.requestURL.toString(),
      `/${id}`
    ).toString();

    const response = await fetch(requestStr, {
      method: 'DELETE',
    });
    const responseData = await response.json();

    if (!response.ok)
      return {
        statusCode: response.status,
        statusText: response.statusText,
        data: responseData,
      };

    return {
      data: responseData,
    };
  }

  async updateCar(id, name, color) {
    const requestStr = getRequestURL(
      this.requestURL.toString(),
      `/${id}`
    ).toString();

    const response = await fetch(requestStr, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        color,
      }),
    });
    const responseData = await response.json();

    if (!response.ok)
      return {
        statusCode: response.status,
        statusText: response.statusText,
        data: responseData,
      };

    return {
      name: responseData.name,
      color: responseData.color,
      id: responseData.id,
    };
  }
}
