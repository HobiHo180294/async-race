import DOMElement from '../../objects/_dom-element.mjs';
import {
  requestEndpoints,
  getElementByClassName,
  getCurrentMarkupFragment,
  fillContentElements,
  highlightActivePageButton,
  findElementWithClassContainingWord,
} from '../../utils/_utils.mjs';
import getGarageControllerFragment from '../garage/_layout-fragment.mjs';

// * CONSTANTS
const DIV_TAG = 'div';
const A_TAG = 'a';

// * CLASS ARRAYS
const controllerBodyClasses = ['controller__views view-controller'];
const controllerViewsClasses = [
  'view-controller__to-garage view-controller__toggler',
  'view-controller__to-winners view-controller__toggler',
];

// * TEXT VALUES
const controllerViewsText = ['To Garage', 'To Winners'];

// * ATTRIBUTES ARRAYS
const controllerBodyAttributes = {};

const controllerViewsAttributes = [
  {
    href: requestEndpoints.garage,
  },
  {
    href: requestEndpoints.winners,
  },
];

// * ELEMENT ARRAYS
const controllerBodyChildren = [];
const controllerViewsChildren = [];

// ! FILLING THE ARRAYS OF ELEMENTS
const controllerClasses = [controllerBodyClasses, controllerViewsClasses];

const controllerChildren = [controllerBodyChildren, controllerViewsChildren];

const controllerTags = [DIV_TAG, A_TAG];

const controllerAttributes = [
  controllerBodyAttributes,
  controllerViewsAttributes,
];

const controllerTextContents = ['', controllerViewsText];

fillContentElements(
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

// * ELEMENTS MODIFICATION

function getCurrentPageButton(currentPathName) {
  return currentPathName === ''
    ? getElementByClassName(
        controllerViewsChildren,
        'view-controller__to-garage'
      )
    : findElementWithClassContainingWord(currentPathName, viewController);
}

let baseGameControllerExists = false;

function getBaseGameController() {
  const controller = new DOMElement('header', 'controller').value;
  const controllerContainer = new DOMElement(DIV_TAG, 'controller__container')
    .value;
  const controllerBody = new DOMElement(DIV_TAG, 'controller__body').value;

  if (!baseGameControllerExists) {
    const currentPathnameWithoutSLash = window.location.pathname.substring(1);

    viewController.append(...controllerViewsChildren);

    const currentPageButton = getCurrentPageButton(currentPathnameWithoutSLash);

    highlightActivePageButton(currentPageButton);

    const garageControllerFragment = getGarageControllerFragment();
    controllerBody.append(...controllerBodyChildren, garageControllerFragment);
    controllerContainer.appendChild(controllerBody);
    controller.appendChild(controllerContainer);

    baseGameControllerExists = true;
  }

  return controller;
}

function getBaseGameControllerMarkupFragment() {
  const gameController = new DocumentFragment();
  const baseGameController = getBaseGameController();

  return getCurrentMarkupFragment(gameController, baseGameController);
}

export default getBaseGameControllerMarkupFragment;
