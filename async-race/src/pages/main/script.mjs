import './index.html';
import './style.scss';
import AsyncRaceAPI from '../../js/modules/objects/_api.mjs';
import { updateSvgColor } from '../../js/modules/utils/_funcs.mjs';
import {
  fillViewContentClasses,
  drawCarField,
  createViewContentGroups,
  // displayTotalCarsCount,
  renderGetCarsResponse,
} from '../../js/modules/utils/_view.mjs';
import carImage from '../../assets/images/car.svg';
// import DOMElement from '../../js/modules/objects/_dom-element.mjs';

const UNREACHABLE_ERROR =
  'Server is unreachable! Please check if it is working...';

const SERVER_URL = 'http://127.0.0.1:3000';

const totalCarsCountElement = document.querySelector('.view__page');
const garagePageNumber = Number(
  document.querySelector('.pagination-view__page').textContent
);

const carFragment = new DocumentFragment();

const asyncRaceServer = new AsyncRaceAPI(SERVER_URL);
await asyncRaceServer.initialize();

if (!asyncRaceServer.isReachable) throw new Error(UNREACHABLE_ERROR);

const totalCars = await asyncRaceServer.getCars(garagePageNumber);
createViewContentGroups(totalCars.limit);
fillViewContentClasses();

const viewContentGroups = document.querySelectorAll('.view__content_group');
drawCarField(viewContentGroups, carFragment);
renderGetCarsResponse(
  viewContentGroups,
  totalCarsCountElement,
  totalCars.data,
  totalCars.limit
);

// ! UPDATE
const carSelector = document.querySelector('.field-content__image');
carSelector.src = await updateSvgColor(carImage, 'blue');
// ! UPDATE
