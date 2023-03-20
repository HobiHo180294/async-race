import DOMElement from '../../objects/_dom-element.mjs';
import {
  fillElementsArr,
  getElementByClassName,
  getFragmentClone,
} from '../../utils/_utils.mjs';

// * CLASSES
const controllerBodyClasses = [
  'controllers__options option-controller',
  'controller__buttons button-controller',
];

const optionsControllerWrapperClasses = [
  'option-controller__car _car-name__input',
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

fillElementsArr(
  controllerBodyClasses,
  controllerBodyChildren,
  controllerBodyTags,
  controllerBodyAttributes,

  controllerBodyText
);

fillElementsArr(
  optionsControllerWrapperClasses,
  optionsControllerWrapperChildren,
  optionsControllerWrapperTags,
  optionsControllerWrapperAttributes,
  optionsControllerWrapperText
);

fillElementsArr(
  controllerButtonsClasses,
  controllerButtonsChildren,
  controllerButtonsTags,
  controllerButtonsAttributes,
  controllerButtonsText
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

function getOptionsControllerElement() {
  const optionsControllerElement = getElementByClassName(
    controllerBodyChildren,
    'option-controller'
  );

  if (!optionsControllerElementExists) {
    const OPTION_CONTROLLER_WRAPPERS_COUNT = 2;

    for (let i = 0; i < OPTION_CONTROLLER_WRAPPERS_COUNT; i++) {
      const optionsControllerWrapperFragment =
        getOptionsControllerWrapperFragment();

      optionsControllerElement.appendChild(optionsControllerWrapperFragment);
    }

    const optionsControllerButtons = optionsControllerElement.querySelectorAll(
      '.option-controller__button'
    );

    optionsControllerButtons.forEach((button, index) => {
      const currentButton = button;

      if (currentButton.textContent === '')
        currentButton.textContent = optionsControllerButtonsText[index];
    });

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
