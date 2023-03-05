import AsyncRaceAPIModel from '../models/_api-model.mjs';
import BaseController from './_base-controller.mjs';

export default class AsyncRaceAPIController extends BaseController {
  constructor() {
    super(AsyncRaceAPIModel);
  }

  async isModelReachable() {
    return this.model.isReachable();
  }
}
