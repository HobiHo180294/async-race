import GarageModel from '../models/_garage-model.mjs';
import BaseController from './_base-controller.mjs';

export default class GarageController extends BaseController {
  constructor() {
    super(GarageModel);
  }

  async getCars() {
    return this.model.getCars();
  }

  getRequestURL() {
    return this.model.requestURL;
  }
}
