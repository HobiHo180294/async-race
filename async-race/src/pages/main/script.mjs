import './index.html';
import './style.scss';
import AsyncRaceAPIView from '../../js/modules/components/views/_api-view.mjs';
import Router from '../../js/modules/objects/_router.mjs';
import { triggerRouterAfterPageRefresh } from '../../js/modules/utils/_utils.mjs';

const asyncRaceAPI = new AsyncRaceAPIView();
await asyncRaceAPI.renderModelReachability();

document.addEventListener(
  'DOMContentLoaded',
  await triggerRouterAfterPageRefresh(Router)
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
