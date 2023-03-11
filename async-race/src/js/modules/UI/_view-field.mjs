import DOMElement from '../objects/_dom-element.mjs';
import {
  fillElementsArr,
  getElementByClassName,
  appendChildren,
  getCurrentMarkupFragment,
} from '../utils/_utils.mjs';

function fillViewFieldClasses(
  viewFieldClassesArr,
  viewFieldChildrenArr,
  viewFieldTagsArr,
  viewFieldTextsArr
) {
  viewFieldClassesArr.forEach((classArr, index) => {
    fillElementsArr(
      classArr,
      viewFieldChildrenArr[index],
      viewFieldTagsArr[index],
      {},
      viewFieldTextsArr[index]
    );
  });
}

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

// * ELEMENTS MODIFICATION
fillViewFieldClasses(
  viewFieldClasses,
  viewFieldChildren,
  viewFieldTags,
  viewFieldTexts
);

function createViewMarkup() {
  const viewTitleElement = getElementByClassName(
    viewContainerChildren,
    'view__title'
  );

  const viewPaginationElement = getElementByClassName(
    viewContainerChildren,
    'pagination-view'
  );

  const viewTitleBeginning = document.createTextNode('Garage (');
  const viewPageElement = new DOMElement('span', 'view__page', {}, '0').value;
  const viewTitleEnding = document.createTextNode(')');

  viewTitleElement.append(viewTitleBeginning, viewPageElement, viewTitleEnding);

  const viewParents = [viewPaginationElement, viewContainer];
  const viewFieldChildrenReverse = viewFieldChildren.reverse();

  viewParents.forEach((parent, index) => {
    appendChildren(parent, viewFieldChildrenReverse[index]);
  });

  viewStart.appendChild(viewContainer);
}

function getViewFieldMarkup() {
  return getCurrentMarkupFragment(viewField, viewStart);
}

// function showViewMarkup(pageWrapper) {
//   const viewFieldMarkup = ;
//   pageWrapper.appendChild(viewFieldMarkup);
// }

createViewMarkup();

export default getViewFieldMarkup;
