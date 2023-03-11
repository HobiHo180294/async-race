import DOMElement from '../objects/_dom-element.mjs';
import {
  requestEndpoints,
  fillElementsArr,
  getElementByClassName,
  appendChildren,
  getFragmentClone,
  getCurrentMarkupFragment,
} from '../utils/_utils.mjs';

// * FUNCTIONS
function fillControllerClasses(
  controllerClassesArr,
  controllerChildrenArr,
  controllerTagsArr,
  controllerAttributesArr,
  controllerTextContentsArr
) {
  controllerClassesArr.forEach((controllerClassArr, index) => {
    fillElementsArr(
      controllerClassArr,
      controllerChildrenArr[index],
      controllerTagsArr[index],
      controllerAttributesArr[index],
      controllerTextContentsArr[index]
    );
  });
}

// * CONSTANTS
const DIV_TAG = 'div';
const A_TAG = 'a';
const BUTTON_TAG = 'button';
const OPTION_CONTROLLER_WRAPPERS_COUNT = 2;

// * DOCUMENT FRAGMENTS
const gameController = new DocumentFragment();
const optionsControllerWrapperFragment = new DocumentFragment();

// * ELEMENTS
const controller = new DOMElement('header', 'controller').value;
const controllerContainer = new DOMElement(DIV_TAG, 'controller__container')
  .value;

const controllerBody = new DOMElement(DIV_TAG, 'controller__body').value;
const optionsControllerWrapper = new DOMElement(
  DIV_TAG,
  'option-controller__wrapper'
).value;

// * CLASS ARRAYS
const controllerBodyClasses = [
  'controller__views view-controller',
  'controllers__options option-controller',
  'controller__buttons button-controller',
];

const controllerViewsClasses = [
  'view-controller__to-garage view-controller__toggler',
  'view-controller__to-winners view-controller__toggler',
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

// * TAGS ARRAYS
const optionsControllerWrapperTags = ['input', 'input', BUTTON_TAG];

// * TEXT VALUES
const controllerViewsText = ['To Garage', 'To Winners'];
const optionsControllerButtonsText = ['Create', 'Update'];
const controllerButtonsText = ['Race', 'Reset', 'Generate cars'];

// * ATTRIBUTES ARRAYS
const controllerViewsAttributes = [
  {
    href: requestEndpoints.garage,
  },
  {
    href: requestEndpoints.winners,
  },
];

const optionsControllerWrapperAttributes = [
  {
    type: 'text',
  },
  {
    type: 'color',
  },
  {},
];

// * ELEMENT ARRAYS
const controllerBodyChildren = [];
const controllerViewsChildren = [];
const optionsControllerWrapperChildren = [];
const controllerButtonsChildren = [];

// ! FILLING THE ARRAYS OF ELEMENTS
const controllerClasses = [
  controllerBodyClasses,
  controllerViewsClasses,
  optionsControllerWrapperClasses,
  controllerButtonsClasses,
];

const controllerChildren = [
  controllerBodyChildren,
  controllerViewsChildren,
  optionsControllerWrapperChildren,
  controllerButtonsChildren,
];

const controllerTags = [
  DIV_TAG,
  A_TAG,
  optionsControllerWrapperTags,
  BUTTON_TAG,
];

const controllerAttributes = [
  {},
  controllerViewsAttributes,
  optionsControllerWrapperAttributes,
  {},
];

const controllerTextContents = [
  '',
  controllerViewsText,
  '',
  controllerButtonsText,
];

fillControllerClasses(
  controllerClasses,
  controllerChildren,
  controllerTags,
  controllerAttributes,
  controllerTextContents
);

// * ELEMENTS THAT APPEARS AFTER SOME MANIPULATIONS
const viewController = getElementByClassName(
  controllerBodyChildren,
  'view-controller'
);

const optionsControllerElement = getElementByClassName(
  controllerBodyChildren,
  'option-controller'
);

const controllerButtons = getElementByClassName(
  controllerBodyChildren,
  'button-controller'
);

// * ELEMENTS MODIFICATION

function createGameControllerMarkup() {
  appendChildren(viewController, controllerViewsChildren);
  appendChildren(optionsControllerWrapper, optionsControllerWrapperChildren);

  optionsControllerWrapperFragment.appendChild(optionsControllerWrapper);

  for (let i = 0; i < OPTION_CONTROLLER_WRAPPERS_COUNT; i++) {
    const optionsControllerWrapperFragmentClone = getFragmentClone(
      optionsControllerWrapperFragment
    );

    optionsControllerElement.appendChild(optionsControllerWrapperFragmentClone);
  }

  const optionsControllerButtons = optionsControllerElement.querySelectorAll(
    '.option-controller__button'
  );

  optionsControllerButtons.forEach((button, index) => {
    const currentButton = button;
    currentButton.textContent = optionsControllerButtonsText[index];
  });

  appendChildren(controllerButtons, controllerButtonsChildren);
  appendChildren(controllerBody, controllerBodyChildren);

  controllerContainer.appendChild(controllerBody);
  controller.appendChild(controllerContainer);
}

function getGameControllerMarkup() {
  return getCurrentMarkupFragment(gameController, controller);
}

// function showGameControllerMarkup(pageWrapper) {
//   const gameControllerMarkup = getCurrentMarkupFragment(
//     gameController,
//     controller
//   );
//   pageWrapper.prepend(gameControllerMarkup);
// }

createGameControllerMarkup();

export default getGameControllerMarkup;
