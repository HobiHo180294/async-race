import DOMElement from '../objects/_dom-element.mjs';

const SERVER_URL = 'http://127.0.0.1:3000';

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

function fillElementsArr(
  classArr,
  elemArr,
  tagNames = 'div',
  attributes = {},
  textContent = ''
) {
  let tagNamesCopy = tagNames;
  let textContentCopy = textContent;

  if (!Array.isArray(tagNames)) tagNamesCopy = [tagNames];

  if (!Array.isArray(textContent)) textContentCopy = [textContent];

  for (let i = 0; i < classArr.length; i++) {
    const tagName = tagNamesCopy[i % tagNamesCopy.length];
    const textValue = textContentCopy[i % textContentCopy.length];
    const element = new DOMElement(tagName, classArr[i], attributes, textValue);
    elemArr.push(element.value);
  }
}

async function updateSvgColor(url, color) {
  const response = await fetch(url);
  const text = await response.text();
  const parser = new DOMParser();
  const svgDoc = parser.parseFromString(text, SVG_MIME_TYPE);

  // Change the color of the SVG elements
  const svgElements = svgDoc.querySelectorAll('path, circle');
  svgElements.forEach((element) => {
    const elementCopy = element;
    elementCopy.style.fill = color;
  });

  // Encode the updated SVG code as a data URL
  const svgCode = svgDoc.documentElement.outerHTML;
  const encodedSvg = btoa(svgCode);
  const dataUrl = SVG_DATA_URL_PREFIX + encodedSvg;

  // Return the data URL for the updated SVG image
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

function getRequestURL(endpoint) {
  return new URL(SERVER_URL + endpoint);
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
  SERVER_URL,
};
