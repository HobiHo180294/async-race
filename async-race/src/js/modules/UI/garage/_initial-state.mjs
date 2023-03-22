import DOMElement from '../../objects/_dom-element.mjs';
import {
  fillContentElements,
  getFragmentClone,
  updateElementsAttribute,
  updateElementsProperty,
  updateSvgColor,
} from '../../utils/_utils.mjs';
import carImage from '../../../../assets/images/car.svg';

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

const viewContentClassesArr = [
  viewContentChildrenClasses,
  contentControlsClasses,
  contentEngineClasses,
  contentFieldClasses,
];

const viewContentChildrenArr = [
  viewContentChildren,
  contentControls,
  contentEngineChildren,
  contentFieldChildren,
];

const viewContentTagsArr = ['div', 'button', ['button', 'button', 'h3'], 'img'];

const viewContentAttributesArr = [
  {},
  {},
  {},
  {
    src: carImage,
    alt: 'race-car',
    width: '100',
    height: '100',
  },
];

const viewContentTextsArr = ['', ['Select', 'Remove'], '', ''];

function createViewContentGroups(viewContentElement, count) {
  const viewContentGroup = new DOMElement('div', 'view__content_group');

  for (let i = 0; i < count; i++) {
    const viewContentGroupCopy = viewContentGroup.value.cloneNode(true);
    viewContentElement.append(viewContentGroupCopy);
  }
}

function createViewContentElements(viewContentElement, limit) {
  if (viewContentElement.childElementCount === limit) {
    const hasNonEmptyArray = viewContentChildrenArr.some(
      (arr) => arr.length > 0
    );

    if (hasNonEmptyArray) return;
  }

  fillContentElements(
    viewContentClassesArr,
    viewContentChildrenArr,
    viewContentTagsArr,
    viewContentAttributesArr,
    viewContentTextsArr
  );
}

function getCarFieldCopy() {
  const carFragment = new DocumentFragment();

  carFragment.append(...viewContentChildren);

  const engineElements = carFragment.querySelectorAll('.content__engine');
  engineElements.forEach((engine) => {
    engine.append(...contentEngineChildren);
  });

  const controlElements = carFragment.querySelectorAll('.content__controls');
  controlElements.forEach((control) => {
    control.append(...contentControls);
  });

  const fieldElements = carFragment.querySelectorAll('.content__field');
  fieldElements.forEach((field) => {
    field.append(...contentFieldChildren);
  });

  return getFragmentClone(carFragment);
}

function drawCarField(viewContentGroups) {
  viewContentGroups.forEach((group) => {
    const carFieldCopy = getCarFieldCopy();
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

function setContentGroupID(viewContentGroups, groupID) {
  updateElementsAttribute(viewContentGroups, groupID, 'data-id', 'id');
}

function displayTotalCarsCount(totalCarsCountElem, count) {
  const countElement = new DOMElement(
    totalCarsCountElem.tagName,
    totalCarsCountElem.className,
    {},
    String(count)
  );

  totalCarsCountElem.parentNode.replaceChild(
    countElement.value,
    totalCarsCountElem
  );
}

function renderGetCarsResponse(
  contentGroupCollection,
  totalCarsCountElem,
  responseData,
  responseLimit
) {
  displayCarNames(responseData);
  fillCarImgColors(responseData);
  setContentGroupID(contentGroupCollection, responseData);
  displayTotalCarsCount(totalCarsCountElem, responseLimit);
}

export {
  getCarFieldCopy,
  createViewContentGroups,
  createViewContentElements,
  drawCarField,
  renderGetCarsResponse,
};
