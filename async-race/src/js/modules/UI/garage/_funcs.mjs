import EngineView from '../../components/views/_engine-view.mjs';
import { animationStorage } from '../../utils/_storage.mjs';
import {
  animation,
  getDistanceBtwElements,
  getElemPosition,
} from './_animation.mjs';

const engineViewInstance = new EngineView();

let timeStorage = {};

function getCurrentGaragePage() {
  return Number(document.querySelector('.pagination-view__page').textContent);
}

function getCarsAmount() {
  return Number(document.querySelector('.view__count').textContent);
}

let selectedCarID = null;
let targetCarNameElement = null;
let targetCarImgElement = null;

function dispatchUpdateEvent() {
  const updateCarInfoEvent = new CustomEvent('updateCarInfo', {
    detail: {
      selectedCarID,
      targetCarNameElement,
      targetCarImgElement,
    },
  });

  document.dispatchEvent(updateCarInfoEvent);
}

function getSelectedCarInfo(event) {
  if (event.target.classList.contains('controls-content__select')) {
    const nameUpdateInput = document.querySelector('.name-update');
    const updateButton = document.querySelector('.button-update');

    const targetGroup = event.target.closest('.view__content_group');
    targetCarNameElement = targetGroup.querySelector(
      '.engine-content__car-name'
    );
    targetCarImgElement = targetGroup.querySelector('.field-content__image');

    nameUpdateInput.value = targetCarNameElement.textContent;

    selectedCarID = {
      value: targetGroup.dataset.id,
    };

    updateButton.addEventListener('click', dispatchUpdateEvent);
  }
}

async function startDriving(event) {
  if (Object.keys(timeStorage).length !== 0) {
    timeStorage = {};
  }

  if (event.target.classList.contains('engine-content__start')) {
    if (event.target.nextElementSibling.hasAttribute('disabled'))
      event.target.nextElementSibling.removeAttribute('disabled');

    event.target.setAttribute('disabled', 'disabled');

    const targetGroup = event.target.closest('.view__content_group');
    const targetGroupID = Number(targetGroup.dataset.id);

    const { time } = await engineViewInstance.driveCar(targetGroupID);

    const targetContentField = targetGroup.querySelector('.field-content');
    const targetCar = targetContentField.querySelector('.field-content__image');
    const targetFinish = window.getComputedStyle(targetContentField, '::after');

    const carPosition = getElemPosition(targetCar);

    const finishPosition = {
      x: parseFloat(targetFinish.left),
      y: parseFloat(targetFinish.top),
    };

    const distance = Math.floor(
      getDistanceBtwElements(carPosition, finishPosition) + 100
    );

    animationStorage[targetGroupID] = animation(targetCar, distance, time);

    const { success } = await engineViewInstance.getDriveInfo(targetGroupID);

    if (success) {
      if (Object.keys(timeStorage).length > 0) {
        event.target.removeAttribute('disabled');
        return;
      }

      timeStorage[targetGroupID] = time;
    }

    if (!success)
      window.cancelAnimationFrame(animationStorage[targetGroupID].id);

    event.target.removeAttribute('disabled');
  }
}

async function stopDriving(event) {
  if (event.target.classList.contains('engine-content__stop')) {
    if (event.target.previousElementSibling.hasAttribute('disabled'))
      event.target.previousElementSibling.removeAttribute('disabled');

    event.target.setAttribute('disabled', 'disabled');

    const targetGroup = event.target.closest('.view__content_group');
    const targetContentField = targetGroup.querySelector('.field-content');
    const targetCar = targetContentField.querySelector('.field-content__image');

    const targetGroupID = Number(targetGroup.dataset.id);

    await engineViewInstance.stopCar(targetGroupID);

    targetCar.style.transform = 'translateX(0) translateY(0px)';

    if (animationStorage[targetGroupID])
      window.cancelAnimationFrame(animationStorage[targetGroupID].id);

    event.target.removeAttribute('disabled');
  }
}

function getWinnerInfo() {
  const [winnerTime] = Object.values(timeStorage);
  const winnerGroupID = Object.keys(timeStorage).find(
    (groupID) => timeStorage[groupID] === winnerTime
  );

  return { winnerTime, winnerGroupID };
}

export {
  getCurrentGaragePage,
  getCarsAmount,
  getSelectedCarInfo,
  startDriving,
  stopDriving,
  getWinnerInfo,
};
