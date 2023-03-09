import GarageView from '../components/views/_garage-view.mjs';

const viewContent = document.querySelector('.view__content');

const garagePage = new GarageView();

export default class Router {
  static async renderContent() {
    const url = window.location.pathname;

    switch (url) {
      case '/':
      case '/garage':
        await garagePage.renderInitialState();
        break;

      case '/winners':
        viewContent.innerHTML = '';
        break;

      default:
        console.log('404 not found');
    }
  }
}
