import './index.html';
import './style.scss';
import AsyncRaceAPIView from '../../js/modules/components/views/_api-view.mjs';
import Router from '../../js/modules/objects/_router.mjs';
import getBaseGameControllerMarkupFragment from '../../js/modules/UI/base/_base-game-controller.mjs';
import getBaseViewMarkup from '../../js/modules/UI/base/_base-view-field.mjs';
import DOMElement from '../../js/modules/objects/_dom-element.mjs';
import GarageView from '../../js/modules/components/views/_garage-view.mjs';
import { updateSvgColor } from '../../js/modules/utils/_utils.mjs';

const garageView = new GarageView();

function initBaseMarkup() {
  const pageWrapper = new DOMElement('div', '_wrapper').value;

  const gameControllerPart = getBaseGameControllerMarkupFragment();
  const viewPart = getBaseViewMarkup();

  pageWrapper.append(gameControllerPart, viewPart);
  document.body.appendChild(pageWrapper);

  const createButton = document.querySelector('.button-create');

  createButton.addEventListener('click', async () => {
    await garageView.drawNewCar();
  });
}

const asyncRaceAPI = new AsyncRaceAPIView();
await asyncRaceAPI.renderModelReachability();

window.addEventListener('load', async () => {
  initBaseMarkup();
  await Router.triggerOnPageLoad();
});

window.addEventListener('popstate', Router.renderContent);

document.addEventListener('click', Router.handlePageState);

document.addEventListener('updateCarInfo', async (event) => {
  const { selectedCarID, targetCarNameElement, targetCarImgElement } =
    event.detail;

  const nameUpdateInputValue = document.querySelector('.name-update').value;
  const colorUpdateInputValue = document.querySelector('.color-update').value;

  targetCarNameElement.textContent = nameUpdateInputValue;
  targetCarImgElement.src = await updateSvgColor(
    targetCarImgElement.src,
    colorUpdateInputValue
  );

  await garageView.renderCarUpdate(
    selectedCarID.value,
    nameUpdateInputValue,
    colorUpdateInputValue
  );
});
