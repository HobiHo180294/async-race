import DOMElement from '../../objects/_dom-element.mjs';
import {
  getElementByClassName,
  getCurrentMarkupFragment,
  fillContentElements,
  requestEndpoints,
} from '../../utils/_utils.mjs';
import getWinnersTableSkeleton from '../winners/_layout-fragment.mjs';

// * DOCUMENT FRAGMENTS
const viewField = new DocumentFragment();

// * ELEMENTS
const viewStart = new DOMElement('main', 'view').value;
const viewContainer = new DOMElement('div', 'view__container').value;

// * CLASS ARRAYS
const viewContainerClasses = [
  'view__title',
  'view__content',
  'view__pagination pagination-view',
];

const viewPaginationClasses = [
  'pagination-view__prev',
  'pagination-view__page',
  'pagination-view__next',
];

const viewFieldClasses = [viewContainerClasses, viewPaginationClasses];

// * CHILDREN ARRAYS
const viewContainerChildren = [];
const viewPaginationChildren = [];

const viewFieldChildren = [viewContainerChildren, viewPaginationChildren];

// * TAGS ARRAYS
const viewContainerTags = ['h2', 'div', 'div'];
const viewPaginationTags = ['button', 'span', 'button'];

const viewFieldTags = [viewContainerTags, viewPaginationTags];

// * TEXT ARRAYS
const viewContainerTexts = ['', '', ''];
const viewPaginationTexts = ['Prev', '1', 'Next'];

const viewFieldTexts = [viewContainerTexts, viewPaginationTexts];

// * ATTRIBUTES

const viewFieldAttributes = {};

// * ELEMENTS MODIFICATION
fillContentElements(
  viewFieldClasses,
  viewFieldChildren,
  viewFieldTags,
  viewFieldAttributes,
  viewFieldTexts
);

const viewTitleElement = getElementByClassName(
  viewContainerChildren,
  'view__title'
);

function createViewTitle() {
  const viewTitleBeginning = document.createTextNode(
    `${
      window.location.pathname === requestEndpoints.winners
        ? 'Winners ('
        : 'Garage ('
    }`
  );
  const viewPageElement = new DOMElement('span', 'view__page', {}, '0').value;
  const viewTitleEnding = document.createTextNode(')');

  viewTitleElement.append(viewTitleBeginning, viewPageElement, viewTitleEnding);
}

function appendViewChildren(viewParents, viewChildren) {
  viewParents.forEach((parent, index) => {
    parent.append(...viewChildren[index]);
  });
}

function createBaseViewMarkup() {
  const viewContent = getElementByClassName(
    viewContainerChildren,
    'view__content'
  );

  if (window.location.pathname === requestEndpoints.winners) {
    const tableSkeleton = getWinnersTableSkeleton();
    viewContent.append(tableSkeleton);
  } else if (viewContent.innerHTML !== '') viewContent.innerHTML = '';

  const viewPaginationElement = getElementByClassName(
    viewContainerChildren,
    'pagination-view'
  );

  const viewParents = [viewPaginationElement, viewContainer];
  const viewFieldChildrenReverse = viewFieldChildren.reverse();

  createViewTitle();

  appendViewChildren(viewParents, viewFieldChildrenReverse);

  viewStart.appendChild(viewContainer);
}

function getBaseViewMarkup() {
  createBaseViewMarkup();

  return getCurrentMarkupFragment(viewField, viewStart);
}

export default getBaseViewMarkup;
