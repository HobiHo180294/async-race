import './index.html';
import './style.scss';
import AsyncRaceAPIView from '../../js/modules/components/views/_api-view.mjs';
import Router from '../../js/modules/objects/_router.mjs';
import getBaseGameControllerMarkupFragment from '../../js/modules/UI/base/_base-game-controller.mjs';
import getBaseViewMarkup from '../../js/modules/UI/base/_base-view-field.mjs';
import DOMElement from '../../js/modules/objects/_dom-element.mjs';

function initBaseMarkup() {
  const pageWrapper = new DOMElement('div', '_wrapper').value;

  const gameControllerPart = getBaseGameControllerMarkupFragment();
  const viewPart = getBaseViewMarkup();

  pageWrapper.append(gameControllerPart, viewPart);
  document.body.appendChild(pageWrapper);
}

document.addEventListener('DOMContentLoaded', initBaseMarkup);

const asyncRaceAPI = new AsyncRaceAPIView();
await asyncRaceAPI.renderModelReachability();

window.addEventListener('load', Router.triggerOnPageLoad);

window.addEventListener('popstate', Router.renderContent);

document.addEventListener('click', Router.handlePageState);

export default initBaseMarkup;
