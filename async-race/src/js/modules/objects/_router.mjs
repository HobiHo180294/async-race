import {
  requestEndpoints,
  DEFAULT_TITLE_STATE,
  highlightActivePageButton,
} from '../utils/_utils.mjs';
import {
  customizeController,
  customizeView,
} from '../UI/base/_customization.mjs';
import GarageView from '../components/views/_garage-view.mjs';
import { getSelectedCarInfo } from '../UI/garage/_funcs.mjs';

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
    const viewContent = document.querySelector('.view__content');
    const curentPathname = window.location.pathname;

    customizeController(curentPathname);
    customizeView(curentPathname);

    switch (curentPathname) {
      case requestEndpoints.root:
      case requestEndpoints.garage:
        await garagePage.renderInitialState();
        viewContent.addEventListener('click', removeTargetCarGroup);
        viewContent.addEventListener('click', getSelectedCarInfo);

        break;

      case requestEndpoints.winners:
        // console.log('render winners');
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

// export default getSelectedCarInfo;
