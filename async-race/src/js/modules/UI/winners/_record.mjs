import DOMElement from '../../objects/_dom-element.mjs';
import {
  convertToSeconds,
  fillElementsArr,
  getFragmentClone,
} from '../../utils/_utils.mjs';
import { getWinnerInfo } from '../garage/_funcs.mjs';

const bodyRowClasses = [
  'body-row__number',
  'body-row__car',
  'body-row__name',
  'body-row__wins',
  'body-row__time',
];

const bodyRowChildren = [];

function getWinnerFragment() {
  const winnerFragment = new DocumentFragment();
  const bodyRow = new DOMElement('tr', 'table-body__row body-row').value;

  fillElementsArr(bodyRowClasses, bodyRowChildren, 'td', {}, '');

  bodyRow.append(...bodyRowChildren);
  winnerFragment.appendChild(bodyRow);

  return getFragmentClone(winnerFragment);
}

function fillWinnerFragment(tableBodyElment, winnerName, winnerImgSrc) {
  const { winnerTime } = getWinnerInfo();

  const winnerImgElem = new DOMElement('img', 'body-row__car_img', {
    src: winnerImgSrc,
    alt: winnerName,
  }).value;

  const winnersCountElem = document.querySelector('.view__count');

  if (Number(winnersCountElem.textContent) > 0) {
    winnersCountElem.textContent = 1;
  }

  const winnerNumberElem = tableBodyElment.querySelector('.body-row__number');
  const winnerCarElem = tableBodyElment.querySelector('.body-row__car');
  const winnerCarName = tableBodyElment.querySelector('.body-row__name');
  const winnerTimeElem = tableBodyElment.querySelector('.body-row__time');
  const winsCountElem = tableBodyElment.querySelector('.body-row__wins');

  winnerCarElem.appendChild(winnerImgElem);

  winnerCarName.textContent = winnerName;

  winnerNumberElem.textContent = String(Number(winnersCountElem.textContent));
  winnerTimeElem.textContent = String(convertToSeconds(winnerTime));

  winsCountElem.textContent = winnerNumberElem.textContent;
}

export { getWinnerFragment, fillWinnerFragment };
