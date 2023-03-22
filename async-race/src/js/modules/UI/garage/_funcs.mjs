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

export { getCurrentGaragePage, getCarsAmount, getSelectedCarInfo };
