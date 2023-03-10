import './index.html';
import './style.scss';
import AsyncRaceAPIView from '../../js/modules/components/views/_api-view.mjs';
import Router from '../../js/modules/objects/_router.mjs';
import { triggerRouterAfterPageLoad } from '../../js/modules/utils/_utils.mjs';
import showGameControllerMarkup from '../../js/modules/UI/_game-controller.mjs';
// import DOMElement from '../../js/modules/objects/_dom-element.mjs';

const pageWrapper = document.querySelector('._wrapper');

// const pageWrapper = new DOMElement('div', '_wrapper').value;

showGameControllerMarkup(pageWrapper);

const asyncRaceAPI = new AsyncRaceAPIView();
await asyncRaceAPI.renderModelReachability();

document.addEventListener(
  'DOMContentLoaded',
  await triggerRouterAfterPageLoad(Router)
);

window.addEventListener('popstate', async () => {
  await Router.renderContent();
});

document.addEventListener('click', async (event) => {
  if (event.target.tagName === 'A') {
    event.preventDefault();
    const url = event.target.getAttribute('href');

    if (url !== window.location.pathname) {
      window.history.pushState(
        {
          requestEndpoint: url,
        },
        '',
        url
      );

      await Router.renderContent();
    }
  }
});

// -------------------
console.log('MARKUP:');
// console.log(getGameController());

// console.log('Controller:', controller);
// console.log('Controller container:', controllerContainer);
// console.log('Controller body:', controllerBody);
// console.log('viewController:', viewController);
// console.log('optionsControllerElement:', optionsControllerElement);
// console.log('controllerButtons:', controllerButtons);
