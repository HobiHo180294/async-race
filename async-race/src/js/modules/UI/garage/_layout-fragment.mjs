import DOMElement from '../../objects/_dom-element.mjs';
import {
  fillContentElements,
  getElementByClassName,
  getFragmentClone,
  addActionClassNames,
} from '../../utils/_utils.mjs';

// * CLASSES
const controllerBodyClasses = [
  'controllers__options option-controller',
  'controller__buttons button-controller',
];

const optionsControllerWrapperClasses = [
  'option-controller__car',
  'option-controller__color',
  'option-controller__button',
];

const controllerButtonsClasses = [
  'button-controller__race',
  'button-controller__reset',
  'button-controller__gen-cars',
];

// * CHILDREN
const controllerBodyChildren = [];
const optionsControllerWrapperChildren = [];
const controllerButtonsChildren = [];

// * TAGS
const controllerBodyTags = 'div';
const optionsControllerWrapperTags = ['input', 'input', 'button'];
const controllerButtonsTags = 'button';

// * TEXT
const controllerBodyText = '';
const optionsControllerWrapperText = '';
const optionsControllerButtonsText = ['Create', 'Update'];
const controllerButtonsText = ['Race', 'Reset', 'Generate cars'];

// * ATTRIBUTES
const controllerBodyAttributes = {};
const optionsControllerWrapperAttributes = [
  {
    type: 'text',
  },
  {
    type: 'color',
  },
  {},
];
const controllerButtonsAttributes = {};

const contentClassesArr = [
  controllerBodyClasses,
  optionsControllerWrapperClasses,
  controllerButtonsClasses,
];

const contentChildrenArr = [
  controllerBodyChildren,
  optionsControllerWrapperChildren,
  controllerButtonsChildren,
];

const contentTagsArr = [
  controllerBodyTags,
  optionsControllerWrapperTags,
  controllerButtonsTags,
];

const contentAttributesArr = [
  controllerBodyAttributes,
  optionsControllerWrapperAttributes,
  controllerButtonsAttributes,
];

const contentTextsArr = [
  controllerBodyText,
  optionsControllerWrapperText,
  controllerButtonsText,
];

fillContentElements(
  contentClassesArr,
  contentChildrenArr,
  contentTagsArr,
  contentAttributesArr,
  contentTextsArr
);

// * FLAGS
let optionsControllerElementExists = false;
let controllerButtonsExists = false;

function getOptionsControllerWrapperElement() {
  const optionsControllerWrapperElement = new DOMElement(
    'div',
    'option-controller__wrapper'
  ).value;

  optionsControllerWrapperElement.append(...optionsControllerWrapperChildren);

  return optionsControllerWrapperElement;
}

function getOptionsControllerWrapperFragment() {
  const optionsControllerWrapperFragment = new DocumentFragment();
  const optionsControllerWrapperElement = getOptionsControllerWrapperElement();

  optionsControllerWrapperFragment.appendChild(optionsControllerWrapperElement);

  return getFragmentClone(optionsControllerWrapperFragment);
}

function customizeOptionsControllerButtons(optionsControllerButtons) {
  addActionClassNames(
    optionsControllerButtons,
    'option-controller__button',
    'button'
  );

  optionsControllerButtons.forEach((button, index) => {
    const currentButton = button;

    if (currentButton.textContent === '')
      currentButton.textContent = optionsControllerButtonsText[index];
  });
}

function customizeOptionsControllerInputs(...optionsControllerInputs) {
  const [nameInputs, colorInputs] = [...optionsControllerInputs];

  addActionClassNames(nameInputs, 'option-controller__car', 'name');
  addActionClassNames(colorInputs, 'option-controller__color', 'color');
}

function appendOptionsControllerWrapperFragment(parentElement, times = 2) {
  for (let i = 0; i < times; i++) {
    const optionsControllerWrapperFragment =
      getOptionsControllerWrapperFragment();

    parentElement.appendChild(optionsControllerWrapperFragment);
  }
}

function getOptionsControllerElement() {
  const optionsControllerElement = getElementByClassName(
    controllerBodyChildren,
    'option-controller'
  );

  if (!optionsControllerElementExists) {
    appendOptionsControllerWrapperFragment(optionsControllerElement);

    const optionsControllerButtons = optionsControllerElement.querySelectorAll(
      '.option-controller__button'
    );
    const optionsControllerNameInputs =
      optionsControllerElement.querySelectorAll('.option-controller__car');
    const optionsControllerColorInputs =
      optionsControllerElement.querySelectorAll('.option-controller__color');

    customizeOptionsControllerButtons(optionsControllerButtons);

    customizeOptionsControllerInputs(
      optionsControllerNameInputs,
      optionsControllerColorInputs
    );

    optionsControllerElementExists = true;
  }

  return optionsControllerElement;
}

function getOptionsControllerFragment() {
  const optionsControllerFragment = new DocumentFragment();
  const optionsControllerElement = getOptionsControllerElement();

  optionsControllerFragment.appendChild(optionsControllerElement);

  return getFragmentClone(optionsControllerFragment);
}

function getControllerButtonsElement() {
  const controllerButtonsElement = getElementByClassName(
    controllerBodyChildren,
    'button-controller'
  );

  if (!controllerButtonsExists) {
    controllerButtonsElement.append(...controllerButtonsChildren);
    controllerButtonsExists = true;
  }

  return controllerButtonsElement;
}

function getControllerButtonsFragment() {
  const controllerButtonsFragment = new DocumentFragment();
  const controllerButtonsElement = getControllerButtonsElement();

  controllerButtonsFragment.append(controllerButtonsElement);

  return getFragmentClone(controllerButtonsFragment);
}

function getGarageControllerFragment() {
  const garageControllerFragment = new DocumentFragment();

  const optionsControllerFragment = getOptionsControllerFragment();
  const controllerButtons = getControllerButtonsFragment();

  garageControllerFragment.append(optionsControllerFragment, controllerButtons);

  return getFragmentClone(garageControllerFragment);
}

export default getGarageControllerFragment;
