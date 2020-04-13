export default class CreateDomElements {
  constructor() {
    this.container = {};
  }

  createContainer() {
    const elem = document.createElement('div');
    elem.classList.add('wrapper');
    this.container = elem;
  }

  createHeader() {
    const elem = document.createElement('h1');
    elem.innerHTML = 'Virtual Keyboard';
    this.container.appendChild(elem);
  }

  createContainerForInputAndKeyboard() {
    const elem = document.createElement('div');
    elem.classList.add('keyboard-container');
    this.container.appendChild(elem);
  }

  createTextarea() {
    const elem = document.createElement('textarea');
    elem.classList.add('output-textarea');
    elem.name = 'output-textarea';
    elem.id = 'output';
    elem.setAttribute('autofocus', '');
    this.container.querySelector('.keyboard-container').appendChild(elem);
  }

  createKeyboardDiv() {
    const elem = document.createElement('div');
    elem.classList.add('keyboard');
    this.container.querySelector('.keyboard-container').appendChild(elem);
  }

  createHelp() {
    let elem = document.createElement('p');
    elem.classList.add('description');
    elem.innerHTML = 'EN/RU &mdash; ctrl + shift';
    this.container.querySelector('.keyboard-container').appendChild(elem);
    elem = document.createElement('p');
    elem.classList.add('description');
    elem.innerHTML = 'made for Windows';
    this.container.querySelector('.keyboard-container').appendChild(elem);
  }

  createDom() {
    this.createContainer();
    this.createHeader();
    this.createContainerForInputAndKeyboard();
    this.createTextarea();
    this.createKeyboardDiv();
    this.createHelp();
    return this.container;
  }
}
