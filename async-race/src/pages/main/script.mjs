import './index.html';
import './style.scss';
import AsyncRaceAPIView from '../../js/modules/components/views/_api-view.mjs';
import GarageView from '../../js/modules/components/views/_garage-view.mjs';

const view = new AsyncRaceAPIView();
await view.renderModelReachability();

const garageControl = new GarageView();
await garageControl.renderInitialState();
