import './index.html';
import './style.scss';
import AsyncRaceAPIView from '../../js/modules/components/views/_api-view.mjs';
import Router from '../../js/modules/objects/_router.mjs';
import {
  triggerRouterAfterPageLoad,
  appendMarkup,
  DEFAULT_TITLE_STATE,
} from '../../js/modules/utils/_utils.mjs';
import getGameControllerMarkup from '../../js/modules/UI/_game-controller.mjs';
import getViewFieldMarkup from '../../js/modules/UI/_view-field.mjs';
import DOMElement from '../../js/modules/objects/_dom-element.mjs';

const BUTTON_TAG_NAME = 'A';

function initMarkup() {
  const pageWrapper = new DOMElement('div', '_wrapper').value;

  const gameControllerPart = getGameControllerMarkup();
  const viewPart = getViewFieldMarkup();

  appendMarkup(pageWrapper, gameControllerPart, viewPart);

  document.body.appendChild(pageWrapper);
}

async function handlePageState(event) {
  if (event.target.tagName === BUTTON_TAG_NAME) {
    event.preventDefault();
    const url = event.target.getAttribute('href');

    if (url !== window.location.pathname) {
      window.history.pushState(
        {
          requestEndpoint: url,
        },
        DEFAULT_TITLE_STATE,
        url
      );

      await Router.renderContent();
    }
  }
}

document.addEventListener('DOMContentLoaded', initMarkup);

const asyncRaceAPI = new AsyncRaceAPIView();
await asyncRaceAPI.renderModelReachability();

document.addEventListener(
  'DOMContentLoaded',
  await triggerRouterAfterPageLoad(Router)
);

window.addEventListener('popstate', async () => {
  await Router.renderContent();
});

document.addEventListener('click', handlePageState);
