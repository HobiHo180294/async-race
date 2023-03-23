import {
  requestEndpoints,
  DEFAULT_TITLE_STATE,
  highlightActivePageButton,
  convertToSeconds,
  containsFragment,
  removeFragment,
} from '../utils/_utils.mjs';
import {
  customizeController,
  customizeView,
} from '../UI/base/_customization.mjs';
import GarageView from '../components/views/_garage-view.mjs';
import {
  getSelectedCarInfo,
  getWinnerInfo,
  startDriving,
  stopDriving,
} from '../UI/garage/_funcs.mjs';
import {
  getWinnerFragment,
  fillWinnerFragment,
} from '../UI/winners/_record.mjs';
import { winnersStorage } from '../utils/_storage.mjs';

const garagePage = new GarageView();

async function removeTargetCarGroup(event) {
  if (event.target.classList.contains('controls-content__remove')) {
    const targetGroup = event.target.closest('.view__content_group');

    await garagePage.removeCarFromPage(targetGroup.dataset.id);

    targetGroup.remove();
  }
}

export default class Router {
  static async renderContent() {
    let raceButton = null;
    let tableBodyElement = null;
    let winnerFrag = null;

    document.querySelector('.button-controller__race');

    const viewContent = document.querySelector('.view__content');
    const curentPathname = window.location.pathname;

    customizeController(curentPathname);
    customizeView(curentPathname);

    switch (curentPathname) {
      case requestEndpoints.root:
      case requestEndpoints.garage:
        await garagePage.renderInitialState();

        raceButton = document.querySelector('.button-controller__race');
        raceButton.addEventListener('click', async () => {
          const startButtons = document.querySelectorAll(
            '.engine-content__start'
          );
          const promises = [];

          startButtons.forEach((button) => {
            promises.push(startDriving({ target: button }));
          });

          await Promise.all(promises)
            .then(async () => {
              const { winnerTime, winnerGroupID } = getWinnerInfo();
              const winnerGroup = document.querySelector(
                `.view__content_group[data-id="${winnerGroupID}"]`
              );

              const winnnerCarNameElem = winnerGroup.querySelector(
                '.engine-content__car-name'
              );

              const winnnerCarImgElem = winnerGroup.querySelector(
                '.field-content__image'
              );

              const winnerCarName = winnnerCarNameElem.textContent;
              const winnerImageSrc = winnnerCarImgElem.src;

              winnersStorage.name = winnerCarName;
              winnersStorage.src = winnerImageSrc;

              const winnerTimeInSec = convertToSeconds(winnerTime);

              alert(`${winnerCarName} wins in ${winnerTimeInSec} sec`);
            })
            .catch((error) => {
              console.log(error.message);
            });
        });
        viewContent.addEventListener('click', removeTargetCarGroup);
        viewContent.addEventListener('click', getSelectedCarInfo);
        viewContent.addEventListener('click', startDriving);
        viewContent.addEventListener('click', stopDriving);

        break;

      case requestEndpoints.winners:
        tableBodyElement = document.querySelector('.table-body');
        winnerFrag = getWinnerFragment();

        if (containsFragment(tableBodyElement, winnerFrag)) {
          removeFragment(tableBodyElement, winnerFrag);
        }

        if (!containsFragment(tableBodyElement, winnerFrag)) {
          tableBodyElement.appendChild(winnerFrag);

          fillWinnerFragment(
            tableBodyElement,
            winnersStorage.name,
            winnersStorage.src
          );
        }

        break;

      default:
        console.log('404 not found');
    }
  }

  static async handlePageState(event) {
    if (event.target.tagName === 'A') {
      event.preventDefault();
      const url = event.target.getAttribute('href');

      highlightActivePageButton(event.target);

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

  static async triggerOnPageLoad() {
    window.addEventListener('beforeunload', () => {
      localStorage.setItem('unload', Date.now());
    });

    const DECIDED_TIME = 1000;

    const lastUnload = localStorage.getItem('unload');
    const lastUnloadTimestamp = parseInt(lastUnload, 10);

    if (lastUnload)
      if (Date.now() - lastUnloadTimestamp <= DECIDED_TIME) {
        const currentPathname = window.location.pathname;

        window.history.replaceState(
          {
            requestEndpoint: currentPathname,
          },
          '',
          currentPathname
        );

        await Router.renderContent();
      } else await Router.renderContent();
  }
}
