import {
  containsFragment,
  getFirstTextNode,
  removeChildrenWithoutClass,
  removeFragment,
  requestEndpoints,
  showFragment,
} from '../../utils/_utils.mjs';
import getGarageControllerFragment from '../garage/_layout-fragment.mjs';
import getWinnersTableSkeleton from '../winners/_layout-fragment.mjs';

function customizeController(currentPathname) {
  const gameControllerBody = document.querySelector('.controller__body');
  const garageControllerFragment = getGarageControllerFragment();

  if (currentPathname === requestEndpoints.winners)
    removeFragment(gameControllerBody, garageControllerFragment);

  if (currentPathname !== requestEndpoints.winners)
    showFragment(gameControllerBody, garageControllerFragment);
}

function customizeView(currentPathname) {
  const viewTitle = document.querySelector('.view__title');
  const viewContent = document.querySelector('.view__content');

  const firstTextNode = getFirstTextNode(viewTitle);
  const viewContentTableFragment = getWinnersTableSkeleton();

  if (
    currentPathname === requestEndpoints.winners &&
    firstTextNode.textContent !== 'Winners ('
  )
    firstTextNode.textContent = 'Winners (';

  if (
    currentPathname !== requestEndpoints.winners &&
    firstTextNode.textContent !== 'Garage ('
  )
    firstTextNode.textContent = 'Garage (';

  if (
    currentPathname === requestEndpoints.winners &&
    viewContent.innerHTML !== ''
  ) {
    if (!containsFragment(viewContent, viewContentTableFragment)) {
      viewContent.innerHTML = '';
      viewContent.appendChild(viewContentTableFragment);
    } else removeChildrenWithoutClass(viewContent, 'content-table');
  }
}

export { customizeController, customizeView };
