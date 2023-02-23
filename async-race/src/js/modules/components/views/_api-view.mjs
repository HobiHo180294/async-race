import AsyncRaceAPIController from '../controllers/_api-controller.mjs';
import { throwError } from '../../utils/_utils.mjs';

export default class AsyncRaceAPIView {
  constructor() {
    this.apiController = new AsyncRaceAPIController();
  }

  async renderModelReachability() {
    const response = await this.apiController.isModelReachable();

    if (Object.prototype.toString.call(response) === '[object Object]')
      throwError(response.errorName, response.errorMessage);
  }
}
