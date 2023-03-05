import AsyncRaceAPIController from '../controllers/_api-controller.mjs';
import BaseView from './_base-view.mjs';
import { throwError } from '../../utils/_utils.mjs';

export default class AsyncRaceAPIView extends BaseView {
  constructor() {
    super(AsyncRaceAPIController);
  }

  async renderModelReachability() {
    const response = await this.apiController.isModelReachable();

    if (Object.prototype.toString.call(response) === '[object Object]')
      throwError(response.errorName, response.errorMessage);
  }
}
