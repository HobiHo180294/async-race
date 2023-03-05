import BaseModel from './_base-model.mjs';
import { requestEndpoints } from '../../utils/_utils.mjs';

export default class AsyncRaceAPIModel extends BaseModel {
  constructor() {
    super(requestEndpoints.asyncRace);
  }

  async isReachable() {
    try {
      const response = await fetch(this.requestURL);
      return response.status === 200;
    } catch (error) {
      return { errorName: error.name, errorMessage: error.message };
    }
  }
}
