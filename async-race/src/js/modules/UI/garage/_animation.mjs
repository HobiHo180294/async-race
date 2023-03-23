function getElemPosition(elem) {
  const { top, left, width, height } = elem.getBoundingClientRect();

  return {
    x: left + width / 2,
    y: top + height / 2,
  };
}

function getDistanceBtwElements(firstElemPos, secondElemPos) {
  return Math.hypot(
    firstElemPos.x - secondElemPos.x,
    firstElemPos.y - secondElemPos.y
  );
}

const animation = (car, distanceBtwElem, animationTime) => {
  //   const EDGE_KOEFFICIENT = 1.6;

  const targetCar = car;
  let start = null;
  const state = { id: 1 };

  const screenWidth = window.innerWidth;
  const carWidth = targetCar.offsetWidth;

  const maxTranslateX = screenWidth - carWidth;

  const getStep = (timestamp) => {
    if (!start) start = timestamp;
    const time = timestamp - start;
    const passed = Math.round(time * (distanceBtwElem / animationTime));
    let translateX = Math.min(passed, distanceBtwElem);
    if (translateX > maxTranslateX) translateX = maxTranslateX;

    targetCar.style.transform = `translateX(${translateX}px) translateY(14px)`;

    if (passed < distanceBtwElem) {
      state.id = window.requestAnimationFrame(getStep);
    }
  };

  state.id = window.requestAnimationFrame(getStep);

  return state;
};

export { getDistanceBtwElements, getElemPosition, animation };
