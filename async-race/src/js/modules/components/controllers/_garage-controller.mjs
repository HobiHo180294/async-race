import { getCurrentGaragePage } from '../../UI/garage/_funcs.mjs';
import GarageModel from '../models/_garage-model.mjs';
import BaseController from './_base-controller.mjs';

const CARS_LIMIT_PER_PAGE = 7;

export default class GarageController extends BaseController {
  constructor() {
    super(GarageModel);
  }

  getCars(page = getCurrentGaragePage(), limit = CARS_LIMIT_PER_PAGE) {
    return this.model.getCars(page, limit);
  }

  getCar(id) {
    return this.model.getCar(id);
  }

  createCar(name, color) {
    return this.model.createCar(name, color);
  }

  deleteCar(id) {
    return this.model.deleteCar(id);
  }

  updateCar(id, name, color) {
    return this.model.updateCar(id, name, color);
  }

  getRequestURL() {
    return this.model.requestURL;
  }
}
