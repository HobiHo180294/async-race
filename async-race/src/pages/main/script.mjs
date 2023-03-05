import './index.html';
import './style.scss';
import AsyncRaceAPIView from '../../js/modules/components/views/_api-view.mjs';
import GarageView from '../../js/modules/components/views/_garage-view.mjs';

const asyncRaceAPI = new AsyncRaceAPIView();
await asyncRaceAPI.renderModelReachability();

const garagePage = new GarageView();
await garagePage.renderInitialState();
