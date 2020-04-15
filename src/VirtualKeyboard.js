import KeyboardKeyCodes from './KeyboardKeyCodes';

export default class VirtualKeyboard {
  constructor() {
    this.container = {};
  }

  static createKeys() {
    const outCollection = document.createDocumentFragment();
    const buttonAmount = 65;
    const wideButtonsId = [13, 29, 41, 42, 56];
    const spaceId = 59;

    for (let i = 0; i < buttonAmount; i += 1) {
      const key = document.createElement('div');
      key.classList.add('key');
      key.setAttribute('data-id', i);

      key.innerHTML = i;

      if (wideButtonsId.indexOf(i) !== -1) {
        key.classList.add('wide');
      }
      if (i === spaceId) {
        key.classList.add('space');
      }
      outCollection.appendChild(key);
    }

    if (sessionStorage.length === 0) {
      sessionStorage.setItem('lang', 'eng');
    }

    return outCollection;
  }

  static insertKeyboardInDOM(buttons) {
    document.querySelector('.keyboard').appendChild(buttons);
  }

  createKeyboard() {
    const buttons = VirtualKeyboard.createKeys();
    VirtualKeyboard.insertKeyboardInDOM(buttons);
    return this;
  }

  init() {
    function checkSessionStorage() {
      if (sessionStorage.length === 0) {
        sessionStorage.setItem('lang', 'eng');
      }
    }
    checkSessionStorage();
    this.createKeyboard();
    return this;
  }

  start() {
    this.container = {};

    const acceptKeyCodes = [192, 49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 189, 187, 8, 9, 81, 87,
      69, 82, 84, 89, 85, 73, 79, 80, 219, 221, 220, 46, 20, 65, 83, 68, 70, 71, 72, 74, 75, 76,
      186, 222, [13, 0], [16, 1], 226, 90, 88, 67, 86, 66, 78, 77, 188, 190, 191, 38, [16, 2],
      [17, 1], [91, 1], [18, 1], 32, [18, 2], [17, 2], 37, 40, 39];
    const engKeyboardLayout = ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'backspace', 'tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\', 'del', 'caps lock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'enter', 'shift', '\\', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '▲', 'shift', 'ctrl', 'win', 'alt', ' ', 'alt', 'ctrl', '◀', '▼', '▶'];
    const rusKeyboardLayout = ['ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'backspace', 'tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '\\', 'del', 'caps lock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'enter', 'shift', '\\', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', '▲', 'shift', 'ctrl', 'win', 'alt', ' ', 'alt', 'ctrl', '◀', '▼', '▶'];
    const engShiftKeyboardLayout = ['~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', 'backspace', 'tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '{', '}', '|', 'del', 'caps lock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ':', '"', 'enter', 'shift', '|', 'z', 'x', 'c', 'v', 'b', 'n', 'm', '<', '>', '?', '▲', 'shift', 'ctrl', 'win', 'alt', ' ', 'alt', 'ctrl', '◀', '▼', '▶'];
    const rusShiftKeyboardLayout = ['ё', '!', '"', '№', ';', '%', ':', '?', '*', '(', ')', '_', '+', 'backspace', 'tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '/', 'del', 'caps lock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'enter', 'shift', '/', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', ',', '▲', 'shift', 'ctrl', 'win', 'alt', ' ', 'alt', 'ctrl', '◀', '▼', '▶'];
    const keyboardDOMElement = document.querySelector('.keyboard');
    const textareaDOMElement = document.querySelector('#output');

    const idCapsLock = 29;
    const idTab = 14;
    const idEnter = 41;
    const idBackspace = 13;
    const idDelete = 28;
    const idShiftArray = [42, 55];
    const idCtrlArray = [56, 61];
    const idFunctionalButtonsArray = [57, 58, 60];
    const shiftKeyCode = 16;
    const ctrlKeyCode = 17;

    let isCapsLock = false;
    let isShift = false;
    const pushedButtons = new Set();
    let carriageCurrentPosition = 0;

    const keyboardEnglish = new KeyboardKeyCodes(
      acceptKeyCodes,
      engKeyboardLayout,
      engShiftKeyboardLayout,
    );
    const keyboardRussian = new KeyboardKeyCodes(
      acceptKeyCodes,
      rusKeyboardLayout,
      rusShiftKeyboardLayout,
    );

    function getShiftKeyboard(lang) {
      const buttons = keyboardDOMElement.querySelectorAll('.key');
      if (isShift) {
        for (let i = 0; i < buttons.length; i += 1) {
          buttons[i].innerHTML = lang[i].keyS.toUpperCase();
        }
      } else {
        for (let i = 0; i < buttons.length; i += 1) {
          buttons[i].innerHTML = lang[i].key.toLowerCase();
        }
      }
    }

    function getCapsKeyboard() {
      const buttons = keyboardDOMElement.querySelectorAll('.key');
      if (isCapsLock) {
        for (let i = 0; i < buttons.length; i += 1) {
          buttons[i].innerHTML = buttons[i].innerHTML.toUpperCase();
        }
      } else {
        for (let i = 0; i < buttons.length; i += 1) {
          buttons[i].innerHTML = buttons[i].innerHTML.toLowerCase();
        }
      }
    }

    function getCurrentLanguageKeyboardCodes() {
      if (sessionStorage.getItem('lang') === 'rus') {
        return keyboardRussian.keyboardCodes;
      }
      if (sessionStorage.getItem('lang') === 'eng') {
        return keyboardEnglish.keyboardCodes;
      }
      return null;
    }

    function updateKeyboard() {
      const lang = getCurrentLanguageKeyboardCodes();
      getShiftKeyboard(lang);
      getCapsKeyboard();
    }

    updateKeyboard();

    function getElementIdByKeyCodeAndLocation(abcObjectsArray, keyCode, location = 0) {
      return abcObjectsArray.findIndex((el) => el.keyCode === keyCode && el.location === location);
    }

    function print(something) {
      function transformSymbolIfNeeded(someText) {
        if (isCapsLock) {
          return someText.toUpperCase();
        }
        return someText;
      }

      textareaDOMElement.selectionStart = carriageCurrentPosition;
      textareaDOMElement.focus();

      const first = textareaDOMElement.value.slice(0, carriageCurrentPosition);
      const last = textareaDOMElement.value.slice(carriageCurrentPosition);

      textareaDOMElement.innerHTML = first + transformSymbolIfNeeded(something) + last;
      carriageCurrentPosition = first.length + something.length;

      textareaDOMElement.selectionStart = carriageCurrentPosition;
      textareaDOMElement.focus();
    }

    function deleteHandler() {
      textareaDOMElement.selectionStart = carriageCurrentPosition;
      textareaDOMElement.focus();

      const first = textareaDOMElement.value.slice(0, carriageCurrentPosition);
      const last = textareaDOMElement.value.slice(carriageCurrentPosition + 1);

      textareaDOMElement.innerHTML = first + last;
      carriageCurrentPosition = first.length;

      textareaDOMElement.selectionStart = carriageCurrentPosition;
      textareaDOMElement.focus();
    }

    function backspaceHandler() {
      textareaDOMElement.selectionStart = carriageCurrentPosition;
      textareaDOMElement.focus();

      const first = (carriageCurrentPosition <= 0) ? '' : textareaDOMElement.value.slice(0, carriageCurrentPosition - 1);
      const last = textareaDOMElement.value.slice(carriageCurrentPosition);

      textareaDOMElement.innerHTML = first + last;
      carriageCurrentPosition = first.length;

      textareaDOMElement.selectionStart = carriageCurrentPosition;
      textareaDOMElement.focus();
    }

    function capsLockClickHandler(event) {
      isCapsLock = !isCapsLock;
      if (isCapsLock) {
        event.target.classList.add('active');
      } else {
        event.target.classList.remove('active');
      }
      updateKeyboard();
    }

    function tabHandler() {
      print('    ');
    }

    function enterHandler() {
      print('\n');
    }

    function updateSessionStorage() {
      if (sessionStorage.getItem('lang') === 'eng') {
        sessionStorage.setItem('lang', 'rus');
      } else {
        sessionStorage.setItem('lang', 'eng');
      }
    }

    function cleanCtrlAndShift() {
      keyboardDOMElement.querySelector('.key:nth-child(43)').classList.remove('active');
      keyboardDOMElement.querySelector('.key:nth-child(56)').classList.remove('active');
      keyboardDOMElement.querySelector('.key:nth-child(57)').classList.remove('active');
      keyboardDOMElement.querySelector('.key:nth-child(62)').classList.remove('active');
    }

    function disableCtrlAndShift() {
      cleanCtrlAndShift();
      isShift = !isShift;
      pushedButtons.delete(ctrlKeyCode);
      pushedButtons.delete(shiftKeyCode);
      updateKeyboard();
    }

    function checkLanguage() {
      if (pushedButtons.has(shiftKeyCode)
      && pushedButtons.has(ctrlKeyCode)) {
        updateSessionStorage();
        updateKeyboard();
        disableCtrlAndShift();
      }
    }

    function shiftClickHandler() {
      const SHIFT_LEFT = keyboardDOMElement.querySelector('.key:nth-child(43)');
      const SHIFT_RIGHT = keyboardDOMElement.querySelector('.key:nth-child(56)');

      isShift = !isShift;
      if (isShift) {
        SHIFT_LEFT.classList.add('active');
        SHIFT_RIGHT.classList.add('active');
        pushedButtons.add(shiftKeyCode);
      } else {
        SHIFT_LEFT.classList.remove('active');
        SHIFT_RIGHT.classList.remove('active');
        pushedButtons.delete(shiftKeyCode);
      }
      checkLanguage();
      updateKeyboard();
    }

    function ctrlClickHandler() {
      const CTRL_LEFT = keyboardDOMElement.querySelector('.key:nth-child(57)');
      const CTRL_RIGHT = keyboardDOMElement.querySelector('.key:nth-child(62)');

      if (pushedButtons.has(ctrlKeyCode)) {
        CTRL_LEFT.classList.remove('active');
        CTRL_RIGHT.classList.remove('active');
        pushedButtons.delete(ctrlKeyCode);
      } else {
        CTRL_LEFT.classList.add('active');
        CTRL_RIGHT.classList.add('active');
        pushedButtons.add(ctrlKeyCode);
      }
      checkLanguage();
    }

    function symbolButtonClickHandler(event) {
      const { id } = event.target.dataset;
      let elem = getCurrentLanguageKeyboardCodes();
      if (isShift) {
        elem = elem[id].keyS.toUpperCase();
      } else {
        elem = elem[id].key;
      }
      print(elem);
    }

    function keyboardClickHandler(event) {
      const id = +event.target.dataset.id;

      switch (true) {
        case id === idCapsLock: {
          capsLockClickHandler(event);
          break;
        }
        case id === idTab: {
          tabHandler();
          break;
        }
        case id === idEnter: {
          enterHandler();
          break;
        }
        case id === idBackspace: {
          backspaceHandler();
          break;
        }
        case id === idDelete: {
          deleteHandler();
          break;
        }
        case (idShiftArray.indexOf(id) !== -1): {
          shiftClickHandler();
          break;
        }
        case (idFunctionalButtonsArray.indexOf(id) !== -1): {
          break;
        }
        case (idCtrlArray.indexOf(id) !== -1): {
          ctrlClickHandler();
          break;
        }
        default: {
          symbolButtonClickHandler(event);
          break;
        }
      }
    }

    function capsLockKeyupHandler(elem) {
      isCapsLock = !isCapsLock;
      if (isCapsLock) {
        elem.classList.add('active');
      } else {
        elem.classList.remove('active');
      }
      updateKeyboard();
    }

    function shiftKeydownHandler() {
      isShift = true;
      updateKeyboard();
      pushedButtons.add(shiftKeyCode);
    }

    function checkKeyboardLanguage() {
      if (pushedButtons.has(shiftKeyCode)
      && pushedButtons.has(ctrlKeyCode)) {
        updateSessionStorage();
        updateKeyboard();
        pushedButtons.delete(shiftKeyCode);
        pushedButtons.delete(ctrlKeyCode);
        cleanCtrlAndShift();
      }
    }

    function shiftKeyupHandler() {
      isShift = false;
      updateKeyboard();
      checkKeyboardLanguage();
      pushedButtons.delete(shiftKeyCode);
      cleanCtrlAndShift();
    }

    function ctrlKeydownHandler() {
      pushedButtons.add(ctrlKeyCode);
    }

    function ctrlKeyupHandler() {
      updateKeyboard();
      checkKeyboardLanguage();
      pushedButtons.delete(ctrlKeyCode);
      cleanCtrlAndShift();
    }

    function symbolButtonKeydownHandler(id) {
      let elem = getCurrentLanguageKeyboardCodes();
      if (isShift) {
        elem = elem[id].keyS.toUpperCase();
      } else {
        elem = elem[id].key;
      }
      print(elem);
    }

    function setActiveStyle(elem) {
      if (!elem.classList.contains('active')) {
        elem.classList.add('active');
      }
    }

    function removeActiveStyle(elem) {
      if (elem.classList.contains('active')) {
        elem.classList.remove('active');
      }
    }

    function keydownHandler(elem, id) {
      setActiveStyle(elem);

      switch (true) {
        case id === idCapsLock: {
          break;
        }
        case id === idTab: {
          tabHandler();
          break;
        }
        case id === idEnter: {
          enterHandler();
          break;
        }
        case id === idBackspace: {
          backspaceHandler();
          break;
        }
        case id === idDelete: {
          deleteHandler();
          break;
        }
        case (idShiftArray.indexOf(id) !== -1): {
          shiftKeydownHandler(elem);
          break;
        }
        case (idFunctionalButtonsArray.indexOf(id) !== -1): {
          break;
        }
        case (idCtrlArray.indexOf(id) !== -1): {
          ctrlKeydownHandler(elem);
          break;
        }
        default: {
          symbolButtonKeydownHandler(id);
          break;
        }
      }
    }

    function keyupHandler(elem, id) {
      removeActiveStyle(elem);

      switch (true) {
        case id === idCapsLock: {
          capsLockKeyupHandler(elem);
          break;
        }
        case (idShiftArray.indexOf(id) !== -1): {
          shiftKeyupHandler(elem);
          break;
        }
        case (idCtrlArray.indexOf(id) !== -1): {
          ctrlKeyupHandler(elem);
          break;
        }
        default: {
          break;
        }
      }
    }

    function getKeyElemFromVirtualKeyboard(id) {
      return keyboardDOMElement.querySelector(`.key:nth-child(${id + 1})`);
    }

    keyboardDOMElement.addEventListener('mousedown', (event) => {
      if (event.target.classList.contains('key')) {
        event.target.classList.add('pushed');
      }
    });

    keyboardDOMElement.addEventListener('mouseup', (event) => {
      if (event.target.classList.contains('key')) {
        event.target.classList.remove('pushed');
      }
    });

    keyboardDOMElement.addEventListener('mouseout', (event) => {
      if (event.target.classList.contains('key')) {
        event.target.classList.remove('pushed');
      }
    });

    keyboardDOMElement.addEventListener('click', (ev) => {
      if (ev.target.classList.contains('key')) {
        keyboardClickHandler(ev);
      }
    });

    textareaDOMElement.addEventListener('click', (ev) => {
      carriageCurrentPosition = ev.toElement.selectionEnd;
    });

    window.addEventListener('keydown', (event) => {
      event.preventDefault();
      const lang = getCurrentLanguageKeyboardCodes();
      const id = getElementIdByKeyCodeAndLocation(lang, event.keyCode, event.location);
      if (id !== -1) {
        const elem = keyboardDOMElement.querySelector(`.key:nth-child(${id + 1})`);
        keydownHandler(elem, id);
      }
    });

    window.addEventListener('keyup', (event) => {
      event.preventDefault();
      const lang = getCurrentLanguageKeyboardCodes();
      const id = getElementIdByKeyCodeAndLocation(lang, event.keyCode, event.location);

      if (id !== -1) {
        const elem = getKeyElemFromVirtualKeyboard(id);
        keyupHandler(elem, id);
      }
    });
  } // end of function start()
}
