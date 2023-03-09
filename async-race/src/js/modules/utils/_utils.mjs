import DOMElement from '../objects/_dom-element.mjs';

const SVG_DATA_URL_PREFIX = 'data:image/svg+xml;base64,';
const SVG_MIME_TYPE = 'image/svg+xml';

const requestEndpoints = {
  asyncRace: '',
  garage: '/garage',
};

const requestHeaders = {
  xTotalCount: 'X-Total-Count',
};

function throwError(errorType, errorMessage) {
  switch (errorType) {
    case 'TypeError':
      throw new TypeError(errorMessage);
    case 'ReferenceError':
      throw new ReferenceError(errorMessage);
    case 'RangeError':
      throw new RangeError(errorMessage);
    default:
      throw new Error(errorMessage);
  }
}

function makeArrayFromInputs(item) {
  return Array.isArray(item) ? item : [item];
}

function getArrLength(array) {
  return array.length;
}

function getIndexedValue(arr, len, index) {
  return arr[index % len];
}

function fillElementsArr(
  classArr,
  elemArr,
  tagNames = 'div',
  attributes = {},
  textContent = ''
) {
  const tagNamesArr = makeArrayFromInputs(tagNames);
  const textContentArr = makeArrayFromInputs(textContent);
  const tagNamesLen = getArrLength(tagNamesArr);
  const textContentLen = getArrLength(textContentArr);

  for (let i = 0; i < classArr.length; i++) {
    const tagName = getIndexedValue(tagNamesArr, tagNamesLen, i);
    const textValue = getIndexedValue(textContentArr, textContentLen, i);
    const element = new DOMElement(tagName, classArr[i], attributes, textValue);
    elemArr.push(element.value);
  }
}

async function updateSvgColor(url, color) {
  const response = await fetch(url);
  const text = await response.text();
  const parser = new DOMParser();
  const svgDoc = parser.parseFromString(text, SVG_MIME_TYPE);

  const svgElements = svgDoc.querySelectorAll('path, circle');
  svgElements.forEach((element) => {
    const elementCopy = element;
    elementCopy.style.fill = color;
  });

  const svgCode = svgDoc.documentElement.outerHTML;
  const encodedSvg = btoa(svgCode);
  const dataUrl = SVG_DATA_URL_PREFIX + encodedSvg;

  return dataUrl;
}

function updateElementsProperty(
  elementsCollection,
  apiDataCollection,
  initialProperty,
  apiProperty
) {
  elementsCollection.forEach((element, index) => {
    const elementCopy = element;
    elementCopy[initialProperty] = apiDataCollection[index][apiProperty];
  });
}

function updateElementsAttribute(
  elementsCollection,
  apiDataCollection,
  initialAttr,
  apiAttr
) {
  elementsCollection.forEach((element, index) => {
    const elementCopy = element;
    elementCopy.setAttribute(
      `${initialAttr}`,
      apiDataCollection[index][apiAttr]
    );
  });
}

function getRequestURL(baseURL, endpoint) {
  return new URL(baseURL + endpoint);
}

async function triggerRouterAfterPageRefresh(Router) {
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

export {
  fillElementsArr,
  updateSvgColor,
  updateElementsProperty,
  updateElementsAttribute,
  throwError,
  getRequestURL,
  requestEndpoints,
  requestHeaders,
  triggerRouterAfterPageRefresh,
};
