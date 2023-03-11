import { requestEndpoints } from '../utils/_utils.mjs';

export default class Router {
  static async renderContent() {
    const GarageViewModule = await import(
      '../components/views/_garage-view.mjs'
    );
    const GarageView = GarageViewModule.default;

    let garagePage;
    let viewContent;

    const url = window.location.pathname;

    switch (url) {
      case requestEndpoints.root:
      case requestEndpoints.garage:
        garagePage = new GarageView();
        await garagePage.renderInitialState();
        break;

      case requestEndpoints.winners:
        viewContent = document.querySelector('.view__content');
        viewContent.innerHTML = '';
        break;

      default:
        console.log('404 not found');
    }
  }
}
