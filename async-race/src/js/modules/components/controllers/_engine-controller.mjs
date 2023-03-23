import EngineModel from '../models/_engine-model.mjs';
import BaseController from './_base-controller.mjs';

export default class EngineController extends BaseController {
  constructor() {
    super(EngineModel);
  }

  startEngine(id, status = 'started') {
    return this.model.switchEngine(id, status);
  }

  stopEngine(id, status = 'stopped') {
    return this.model.switchEngine(id, status);
  }

  enableDriveMode(id, status = 'drive') {
    return this.model.enableDriveMode(id, status);
  }
}
