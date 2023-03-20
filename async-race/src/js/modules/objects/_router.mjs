import {
  requestEndpoints,
  DEFAULT_TITLE_STATE,
  highlightActivePageButton,
} from '../utils/_utils.mjs';
import {
  customizeController,
  customizeView,
} from '../UI/base/_customization.mjs';

export default class Router {
  static async renderContent() {
    const GarageViewModule = await import(
      '../components/views/_garage-view.mjs'
    );
    const GarageView = GarageViewModule.default;

    let garagePage;
    const curentPathname = window.location.pathname;

    customizeController(curentPathname);
    customizeView(curentPathname);

    switch (curentPathname) {
      case requestEndpoints.root:
      case requestEndpoints.garage:
        // console.log('render garage');
        garagePage = new GarageView();
        await garagePage.renderInitialState();
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
