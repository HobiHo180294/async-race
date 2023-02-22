import {
  fillElementsArr,
  updateSvgColor,
  updateElementsProperty,
} from './_funcs.mjs';
import carImage from '../../../assets/images/car.svg';
import DOMElement from '../objects/_dom-element.mjs';
import AsyncRaceAPI from '../objects/_api.mjs';

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

// DOM
const viewContent = document.querySelector('.view__content');
const viewContentGroup = new DOMElement('div', 'view__content_group');

function fillViewContentClasses() {
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
        fillElementsArr(classElem, viewContentElemsArrs[index], tagsArr[index]);
        break;
    }
  });
}

function createViewContentGroups(count) {
  for (let i = 0; i < count; i++) {
    const viewContentGroupCopy = viewContentGroup.value.cloneNode(true);
    viewContent.append(viewContentGroupCopy);
  }
}

function getCarFieldCopy(carFragment) {
  const carFieldCopy = carFragment.cloneNode(true);

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

function drawCarField(viewContentGroups, carFragment) {
  viewContentGroups.forEach((group) => {
    const carFieldCopy = getCarFieldCopy(carFragment);
    group.appendChild(carFieldCopy);
  });
}

function displayCarNames(
  carNames,
  carNameElements = document.querySelectorAll('.engine-content__car-name')
) {
  updateElementsProperty(carNameElements, carNames, 'textContent', 'name');
}

function fillCarImgColors(
  carColors,
  carImgElements = document.querySelectorAll('.field-content__image')
) {
  carImgElements.forEach(async (carImg, index) => {
    const carImgCopy = carImg;
    carImgCopy.src = await updateSvgColor(carImg.src, carColors[index].color);
  });
}

function displayTotalCarsCount(totalCarsCountElement, count) {
  const countElement = document.createElement(totalCarsCountElement.tagName);
  countElement.classList.add(totalCarsCountElement.className);
  countElement.textContent = count;
  totalCarsCountElement.parentNode.replaceChild(
    countElement,
    totalCarsCountElement
  );
}

function renderGetCarsResponse(
  contentGroupCollection,
  totalCarsCountElement,
  responseData,
  responseLimit
) {
  displayCarNames(responseData);
  fillCarImgColors(responseData);
  AsyncRaceAPI.setContentGroupID(contentGroupCollection, responseData);
  displayTotalCarsCount(totalCarsCountElement, responseLimit);
}

export {
  fillViewContentClasses,
  createViewContentGroups,
  drawCarField,
  displayTotalCarsCount,
  renderGetCarsResponse,
};
