import GarageController from '../controllers/_garage-controller.mjs';
import DOMElement from '../../objects/_dom-element.mjs';
import {
  fillElementsArr,
  updateElementsProperty,
  updateElementsAttribute,
  updateSvgColor,
} from '../../utils/_utils.mjs';
import carImage from '../../../../assets/images/car.svg';

const carFragment = new DocumentFragment();

const totalCarsCountElement = document.querySelector('.view__page');

const viewContentChildrenClasses = [
  'content__controls controls-content',
  'content__engine engine-content',
  'content__field field-content',
];
const contentControlsClasses = [
  'controls-content__select',
  'controls-content__remove',
];
const contentEngineClasses = [
  'engine-content__start',
  'engine-content__stop',
  'engine-content__car-name',
];
const contentFieldClasses = ['field-content__image'];

const contentControls = [];
const viewContentChildren = [];
const contentEngineChildren = [];
const contentFieldChildren = [];

const viewContentClassesArrs = [
  viewContentChildrenClasses,
  contentControlsClasses,
  contentEngineClasses,
  contentFieldClasses,
];

const viewContentElemsArrs = [
  viewContentChildren,
  contentControls,
  contentEngineChildren,
  contentFieldChildren,
];

const tagsArr = ['div', 'button', ['button', 'button', 'h3'], 'img'];

const viewContent = document.querySelector('.view__content');
const viewContentGroup = new DOMElement('div', 'view__content_group');

export default class GarageView {
  constructor() {
    this.garageController = new GarageController();
  }

  async renderInitialState() {
    const totalCars = await this.garageController.getCars();

    GarageView.#createViewContentGroups(totalCars.limit);
    GarageView.#fillViewContentClasses();

    const viewContentGroups = document.querySelectorAll('.view__content_group');
    GarageView.#drawCarField(viewContentGroups, carFragment);

    GarageView.#renderGetCarsResponse(
      viewContentGroups,
      totalCarsCountElement,
      totalCars.data,
      totalCars.limit
    );
  }

  static #createViewContentGroups(count) {
    for (let i = 0; i < count; i++) {
      const viewContentGroupCopy = viewContentGroup.value.cloneNode(true);
      viewContent.append(viewContentGroupCopy);
    }
  }

  static #fillViewContentClasses() {
    viewContentClassesArrs.forEach((classElem, index) => {
      switch (classElem) {
        case contentFieldClasses:
          fillElementsArr(
            classElem,
            viewContentElemsArrs[index],
            tagsArr[index],
            {
              src: carImage,
              alt: 'race-car',
              width: '100',
              height: '100',
            }
          );
          break;
        case contentControlsClasses:
          fillElementsArr(
            classElem,
            viewContentElemsArrs[index],
            tagsArr[index],
            {},
            ['Select', 'Remove']
          );
          break;
        default:
          fillElementsArr(
            classElem,
            viewContentElemsArrs[index],
            tagsArr[index]
          );
          break;
      }
    });
  }

  static #drawCarField(viewContentGroups, carFrag) {
    viewContentGroups.forEach((group) => {
      const carFieldCopy = GarageView.#getCarFieldCopy(carFrag);
      group.appendChild(carFieldCopy);
    });
  }

  static #getCarFieldCopy(carFrag) {
    const carFieldCopy = carFrag.cloneNode(true);

    viewContentChildren.forEach((child) =>
      carFieldCopy.append(child.cloneNode(true))
    );

    contentEngineChildren.forEach((child) =>
      carFieldCopy
        .querySelectorAll('.content__engine')
        .forEach((engine) => engine.append(child.cloneNode(true)))
    );

    contentControls.forEach((child) =>
      carFieldCopy
        .querySelectorAll('.content__controls')
        .forEach((controller) => controller.append(child.cloneNode(true)))
    );

    contentFieldChildren.forEach((child) =>
      carFieldCopy
        .querySelectorAll('.content__field')
        .forEach((field) => field.append(child.cloneNode(true)))
    );

    return carFieldCopy;
  }

  static #displayCarNames(
    carNames,
    carNameElements = document.querySelectorAll('.engine-content__car-name')
  ) {
    updateElementsProperty(carNameElements, carNames, 'textContent', 'name');
  }

  static #fillCarImgColors(
    carColors,
    carImgElements = document.querySelectorAll('.field-content__image')
  ) {
    carImgElements.forEach(async (carImg, index) => {
      const carImgCopy = carImg;
      carImgCopy.src = await updateSvgColor(carImg.src, carColors[index].color);
    });
  }

  static #setContentGroupID(viewContentGroups, groupID) {
    updateElementsAttribute(viewContentGroups, groupID, 'data-id', 'id');
  }

  static #displayTotalCarsCount(totalCarsCountElem, count) {
    const countElement = document.createElement(totalCarsCountElem.tagName);
    countElement.classList.add(totalCarsCountElem.className);
    countElement.textContent = count;
    totalCarsCountElem.parentNode.replaceChild(
      countElement,
      totalCarsCountElem
    );
  }

  static #renderGetCarsResponse(
    contentGroupCollection,
    totalCarsCountElem,
    responseData,
    responseLimit
  ) {
    GarageView.#displayCarNames(responseData);
    GarageView.#fillCarImgColors(responseData);
    GarageView.#setContentGroupID(contentGroupCollection, responseData);
    GarageView.#displayTotalCarsCount(totalCarsCountElem, responseLimit);
  }
}
