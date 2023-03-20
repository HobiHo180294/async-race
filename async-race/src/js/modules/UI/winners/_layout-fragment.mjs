import DOMElement from '../../objects/_dom-element.mjs';
import {
  fillContentElements,
  getElementByClassName,
  getFragmentClone,
} from '../../utils/_utils.mjs';

function createSortFragment(sortTitle, sortClassName, sortTitleText) {
  const sortFragment = new DocumentFragment();

  const sortElement = new DOMElement(
    'th',
    `head-row__${sortTitle} ${sortClassName}`
  ).value;

  const sortElementTitle = new DOMElement(
    'span',
    `${sortClassName}__title`,
    {},
    `${sortTitleText}`
  ).value;

  sortElement.appendChild(sortElementTitle);
  sortFragment.appendChild(sortElement);

  return sortFragment;
}

// *FRAGMENT
const contentTableFragment = new DocumentFragment();

const contentTable = new DOMElement(
  'table',
  'view__content_table content-table'
).value;

// * CLASSES
const contentTableClasses = [
  'content-table__head table-head',
  'content-table__body table-body',
];

const headRowClasses = ['head-row__number', 'head-row__car', 'head-row__name'];

// * ELEMENTS
const contentTableChildren = [];
const headRowChildren = [];
const winsSortFragment = createSortFragment('wins', 'wins-sort', 'Wins');
const timeSortFragment = createSortFragment(
  'time',
  'time-sort',
  'Best time (sec)'
);

// * TAGS
const contentTableTags = ['thead', 'tbody'];

// * TEXTS
const headRowTexts = ['№', 'Car', 'Name'];

// * TOTAL
const totalTableClasses = [contentTableClasses, headRowClasses];
const totalTableChildren = [contentTableChildren, headRowChildren];
const totalTableTags = [contentTableTags, 'th'];
const totalTableTexts = ['', headRowTexts];

function getWinnersTableSkeleton() {
  if (contentTableFragment.childNodes.length > 0)
    return getFragmentClone(contentTableFragment);

  fillContentElements(
    totalTableClasses,
    totalTableChildren,
    totalTableTags,
    {},
    totalTableTexts
  );

  const tableHeadElement = getElementByClassName(
    contentTableChildren,
    'table-head'
  );
  const headRow = new DOMElement('tr', 'table-head__row head-row').value;

  headRow.append(...headRowChildren);
  headRow.append(winsSortFragment, timeSortFragment);
  tableHeadElement.appendChild(headRow);
  contentTable.append(...contentTableChildren);
  contentTableFragment.appendChild(contentTable);

  return getFragmentClone(contentTableFragment);
}

export default getWinnersTableSkeleton;
