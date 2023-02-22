export default class DOMElement {
  constructor(tagName, classString, attributes = {}, textContent = '') {
    this.tagName = tagName;
    this.className = classString;
    this.attributes = attributes;
    this.textContent = textContent;
    this.value = this.create(attributes);
  }

  create(attributes) {
    this.value = document.createElement(this.tagName);
    this.addClassString(this.className);

    if (attributes && Object.keys(attributes).length > 0)
      Object.entries(attributes).forEach(([attr, value]) => {
        this.value.setAttribute(attr, value);
      });

    if (this.textContent && this.textContent.length > 0) {
      this.value.textContent = this.textContent;
    }

    return this.value;
  }

  addClassString(classes) {
    classes
      .split(' ')
      .forEach((classElem) => this.value.classList.add(classElem));
  }
}
