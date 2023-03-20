import DOMElement from '../objects/_dom-element.mjs';

const SVG_DATA_URL_PREFIX = 'data:image/svg+xml;base64,';
const SVG_MIME_TYPE = 'image/svg+xml';
const DEFAULT_TITLE_STATE = '';

const requestEndpoints = {
  asyncRace: '',
  root: '/',
  garage: '/garage',
  winners: '/winners',
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
  const attributesArr = makeArrayFromInputs(attributes);
  const attributesLen = getArrLength(attributesArr);

  for (let i = 0; i < classArr.length; i++) {
    const tagName = getIndexedValue(tagNamesArr, tagNamesLen, i);
    const textValue = getIndexedValue(textContentArr, textContentLen, i);
    const attributesObj = getIndexedValue(attributesArr, attributesLen, i);
    const element = new DOMElement(
      tagName,
      classArr[i],
      attributesObj,
      textValue
    );
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

function getElementByClassName(arrayOfElements, className) {
  return (
    arrayOfElements.find((element) => element.classList.contains(className)) ||
    null
  );
}

// function appendChildren(parent, childrenArr) {
//   childrenArr.forEach((child) => {
//     parent.appendChild(child);
//   });
// }

function getFragmentClone(documentFragment) {
  return documentFragment.cloneNode(true);
}

function getCurrentMarkupFragment(currentFragment, currentElement) {
  return currentFragment.appendChild(currentElement);
}

function appendMarkup(pageWrapper, ...markUpParts) {
  pageWrapper.append(...markUpParts);
}

function removeChildrenWithoutClass(parentElem, className) {
  Array.from(parentElem.children).forEach((element) => {
    if (!element.classList.contains(className)) element.remove();
  });
}

function addClassToChildrenIfMissing(
  parentElem,
  neededClassName,
  newClassName
) {
  Array.from(parentElem.children).forEach((element) => {
    if (!element.classList.contains(neededClassName))
      element.classList.add(newClassName);
  });
}

function removeClassFromChildrenIfPresent(parentElem, className) {
  Array.from(parentElem.children).forEach((element) => {
    if (element.classList.contains(className))
      element.classList.remove(className);
  });
}

function getFirstTextNode(parent) {
  return parent.firstChild.nodeType === Node.TEXT_NODE
    ? parent.firstChild
    : null;
}

function removeDuplicatesByClass(parentElement, className) {
  const elements = parentElement.querySelectorAll(`.${className}`);
  const elementsCount = elements.length;

  if (elementsCount <= 1) return;

  for (let i = elementsCount - 1; i >= 1; i--) elements[i].remove();
}

function hasChildWithClass(parentElement, className) {
  return parentElement.querySelector(`.${className}`) !== null;
}

function fillContentElements(
  contentClassesArr,
  contentChildrenArr,
  contentTagsArr,
  contentAttributesArr,
  contentTextContentsArr
) {
  contentClassesArr.forEach((contentClassArr, index) => {
    fillElementsArr(
      contentClassArr,
      contentChildrenArr[index],
      contentTagsArr[index],
      contentAttributesArr[index],
      contentTextContentsArr[index]
    );
  });
}

function findElementWithClassContainingWord(word, parentElement = document) {
  let resultElement = null;
  const targetElements = parentElement.querySelectorAll('*');

  targetElements.forEach((element) => {
    const targetClasses = element.className.split(' ');
    targetClasses.forEach((className) => {
      if (className.includes(word)) resultElement = element;
    });
  });

  return resultElement;
}

function highlightActivePageButton(activeButton) {
  if (!activeButton.classList.contains('_active-page'))
    activeButton.classList.add('_active-page');

  if (
    (
      activeButton.nextElementSibling || activeButton.previousElementSibling
    ).classList.contains('_active-page')
  )
    (
      activeButton.nextElementSibling || activeButton.previousElementSibling
    ).classList.remove('_active-page');

  // console.log('target:', activeButton);
  // console.log('next:', activeButton.nextElementSibling);
  // console.log('prev:', activeButton.previousElementSibling);
}

function removeElementsByValues(arr, ...vals) {
  for (let i = arr.length - 1; i >= 0; i--)
    if (vals.includes(arr[i])) arr.splice(i, 1);

  return arr;
}

function changeElementStyleProperty(element, property, value) {
  const elementStyle = element.style;
  const currentStyleValue = window.getComputedStyle(element)[property];

  if (currentStyleValue !== value) elementStyle[property] = value;
}

function containsFragment(element, documentFragment) {
  let contains = false;

  documentFragment.childNodes.forEach((fragmentNode) => {
    contains = Array.from(element.childNodes).some(
      (elementNode) => fragmentNode.innerHTML === elementNode.innerHTML
    );
  });

  return contains;
}

function removeFragment(element, documentFragment) {
  for (let i = 0; i < documentFragment.childNodes.length; i++) {
    const fragmentNode = documentFragment.childNodes[i];
    for (let j = 0; j < element.childNodes.length; j++) {
      const elementNode = element.childNodes[j];
      if (
        fragmentNode.classList.toString() === elementNode.classList.toString()
      )
        elementNode.remove();
    }
  }
}

// function removeFragment(element, documentFragment) {
//   element.childNodes.forEach((node) => {
//     if (documentFragment.contains(node)) element.removeChild(node);
//   });
// }

export {
  fillElementsArr,
  updateSvgColor,
  updateElementsProperty,
  updateElementsAttribute,
  throwError,
  getRequestURL,
  requestEndpoints,
  requestHeaders,
  getElementByClassName,
  // appendChildren,
  getFragmentClone,
  getCurrentMarkupFragment,
  appendMarkup,
  DEFAULT_TITLE_STATE,
  removeChildrenWithoutClass,
  getFirstTextNode,
  fillContentElements,
  addClassToChildrenIfMissing,
  removeClassFromChildrenIfPresent,
  findElementWithClassContainingWord,
  highlightActivePageButton,
  removeElementsByValues,
  removeDuplicatesByClass,
  hasChildWithClass,
  changeElementStyleProperty,
  containsFragment,
  removeFragment,
};
