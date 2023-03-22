import GarageController from '../controllers/_garage-controller.mjs';
import BaseView from './_base-view.mjs';
import {
  requestEndpoints,
  DEFAULT_TITLE_STATE,
  removeChildrenWithoutClass,
  updateSvgColor,
  getFragmentClone,
  getInputValue,
} from '../../utils/_utils.mjs';
import {
  createViewContentElements,
  createViewContentGroups,
  drawCarField,
  getCarFieldCopy,
  renderGetCarsResponse,
} from '../../UI/garage/_initial-state.mjs';
import DOMElement from '../../objects/_dom-element.mjs';

function incrementCarCount() {
  const viewCountElement = document.querySelector('.view__count');
  const currentAmount = Number(viewCountElement.textContent);
  viewCountElement.textContent = String(currentAmount + 1);
}

function decrementCarCount() {
  const viewCountElement = document.querySelector('.view__count');
  const currentAmount = Number(viewCountElement.textContent);
  viewCountElement.textContent = String(currentAmount - 1);
}

async function updateCarProps(carParent, textName, color) {
  const carNameElement = carParent.querySelector('.engine-content__car-name');
  const carImgElement = carParent.querySelector('.field-content__image');

  carNameElement.textContent = textName;
  carImgElement.src = await updateSvgColor(carImgElement.src, color);
}

async function getNewCar(name, color, groupID) {
  const carFieldFragment = new DocumentFragment();

  const viewContentGroup = new DOMElement('div', 'view__content_group').value;
  const carFieldCopy = getCarFieldCopy();

  await updateCarProps(carFieldCopy, name, color);

  // const carNameElement = carFieldCopy.querySelector(
  //   '.engine-content__car-name'
  // );
  // const carImgElement = carFieldCopy.querySelector('.field-content__image');

  // carNameElement.textContent = name;
  // carImgElement.src = await updateSvgColor(carImgElement.src, color);

  viewContentGroup.setAttribute('data-id', groupID);

  viewContentGroup.appendChild(carFieldCopy);
  carFieldFragment.appendChild(viewContentGroup);

  incrementCarCount();

  return getFragmentClone(carFieldFragment);
}

// async function updateCarByID(name, color, groupID) {
//   const targetCarGroup = document.querySelector(`[data-id="${groupID}"]`);
//   await updateCarProps(targetCarGroup, name, color);
// }

export default class GarageView extends BaseView {
  constructor() {
    super(GarageController);
  }

  async renderInitialState() {
    const viewContent = document.querySelector('.view__content');

    if (window.location.pathname === requestEndpoints.root)
      window.history.replaceState(
        {
          requestEndpoint: requestEndpoints.garage,
        },
        DEFAULT_TITLE_STATE,
        requestEndpoints.garage
      );

    if (viewContent.innerHTML !== '')
      removeChildrenWithoutClass(viewContent, 'view__content_group');

    const totalCarsCountElement = document.querySelector('.view__count');

    const totalCars = await this.apiController.getCars();
    const totalCarsLimit = totalCars.limit;

    createViewContentGroups(viewContent, totalCarsLimit);
    const viewContentGroups = document.querySelectorAll('.view__content_group');

    createViewContentElements(viewContent, totalCarsLimit);

    drawCarField(viewContentGroups);

    renderGetCarsResponse(
      viewContentGroups,
      totalCarsCountElement,
      totalCars.data,
      totalCarsLimit
    );
  }

  async drawNewCar() {
    const newNameValue = getInputValue(document.querySelector('.name-create'));
    const newColorValue = getInputValue(
      document.querySelector('.color-create')
    );

    const newCarData = await this.apiController.createCar(
      newNameValue,
      newColorValue
    );

    const viewContent = document.querySelector('.view__content');
    const newCar = await getNewCar(
      newCarData.name,
      newCarData.color,
      newCarData.id
    );
    viewContent.appendChild(newCar);
  }

  async removeCarFromPage(carID) {
    await this.apiController.deleteCar(carID);
    decrementCarCount();
  }

  async renderCarUpdate(groupID, name, color) {
    await this.apiController.updateCar(groupID, name, color);
  }
}
