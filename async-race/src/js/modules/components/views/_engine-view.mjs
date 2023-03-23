import EngineController from '../controllers/_engine-controller.mjs';
import BaseView from './_base-view.mjs';

export default class EngineView extends BaseView {
  constructor() {
    super(EngineController);
  }

  async driveCar(id) {
    const responseData = await this.apiController.startEngine(id);

    const time = Math.round(responseData.distance / responseData.velocity);

    return { responseData, time };
  }

  async getDriveInfo(id) {
    const responseData = await this.apiController.enableDriveMode(id);
    return responseData;
  }

  async stopCar(id) {
    const responseData = await this.apiController.stopEngine(id);

    return { responseData };
  }
}
