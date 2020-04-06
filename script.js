class CreateDOMElements {
  constructor() {
    this.container;
  }

  createContainer() {
    let elem = document.createElement("div");
    elem.classList.add("wrapper");
    this.container = elem;
  }

  createHeader() {
    let elem = document.createElement("h1");
    elem.innerHTML = "Virtual Keyboard";
    this.container.appendChild(elem);
  }

  createContainerForInputAndKeyboard() {
    let elem = document.createElement("div");
    elem.classList.add("keyboard-container");
    this.container.appendChild(elem);
  }

  createTextarea() {
    let elem = document.createElement("textarea");
    elem.classList.add("output-textarea");
    elem.name = "output-textarea";
    elem.id = "output";
    elem.setAttribute("autofocus", "");
    this.container.querySelector(".keyboard-container").appendChild(elem);
  }

  createKeyboardDiv() {
    let elem = document.createElement("div");
    elem.classList.add("keyboard");
    this.container.querySelector(".keyboard-container").appendChild(elem);
  }

  createHelp() {
    let elem = document.createElement("p");
    elem.classList.add("description");
    elem.innerHTML = "EN/RU &mdash; ctrl + shift";
    this.container.querySelector(".keyboard-container").appendChild(elem);
    elem = document.createElement("p");
    elem.classList.add("description");
    elem.innerHTML = "made for Windows";
    this.container.querySelector(".keyboard-container").appendChild(elem);
  }

  CreateDOM() {
    this.createContainer();
    this.createHeader();
    this.createContainerForInputAndKeyboard();
    this.createTextarea();
    this.createKeyboardDiv();
    this.createHelp();
    return this.container;
  }
}

const keyboardElement = new CreateDOMElements();
document.querySelector("body").appendChild(keyboardElement.CreateDOM());

class KeyboardKeyCodes {
  constructor(arrayOfKeyCodes, arrayOfKeyTexts, arrayOfKeyShiftTexts) {
    this.keyboardCodes = [];
    arrayOfKeyCodes.forEach((element, i) => {
      this.keyboardCodes.push({
        keyCode: element,
        key: arrayOfKeyTexts[i],
        keyS: arrayOfKeyShiftTexts[i],
      });
    });
  }
}

const ARRAY_OF_KEY_CODES = [
  192,
  49,
  50,
  51,
  52,
  53,
  54,
  55,
  56,
  57,
  48,
  189,
  187,
  8,
  9,
  81,
  87,
  69,
  82,
  84,
  89,
  85,
  73,
  79,
  80,
  219,
  221,
  220,
  46,
  20,
  65,
  83,
  68,
  70,
  71,
  72,
  74,
  75,
  76,
  186,
  222,
  13,
  [16, 1],
  226,
  90,
  88,
  67,
  86,
  66,
  78,
  77,
  188,
  190,
  191,
  38,
  [16, 2],
  [17, 1],
  91,
  [18, 1],
  32,
  [18, 2],
  [17, 2],
  37,
  40,
  39,
];
const ENG_KEYS = [
  "`",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "0",
  "-",
  "=",
  "backspace",
  "tab",
  "q",
  "w",
  "e",
  "r",
  "t",
  "y",
  "u",
  "i",
  "o",
  "p",
  "[",
  "]",
  "\\",
  "del",
  "caps lock",
  "a",
  "s",
  "d",
  "f",
  "g",
  "h",
  "j",
  "k",
  "l",
  ";",
  "'",
  "enter",
  "shift",
  "\\",
  "z",
  "x",
  "c",
  "v",
  "b",
  "n",
  "m",
  ",",
  ".",
  "/",
  "▲",
  "shift",
  "ctrl",
  "win",
  "alt",
  " ",
  "alt",
  "ctrl",
  "◀",
  "▼",
  "▶",
];
const RUS_KEYS = [
  "ё",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "0",
  "-",
  "=",
  "backspace",
  "tab",
  "й",
  "ц",
  "у",
  "к",
  "е",
  "н",
  "г",
  "ш",
  "щ",
  "з",
  "х",
  "ъ",
  "\\",
  "del",
  "caps lock",
  "ф",
  "ы",
  "в",
  "а",
  "п",
  "р",
  "о",
  "л",
  "д",
  "ж",
  "э",
  "enter",
  "shift",
  "\\",
  "я",
  "ч",
  "с",
  "м",
  "и",
  "т",
  "ь",
  "б",
  "ю",
  ".",
  "▲",
  "shift",
  "ctrl",
  "win",
  "alt",
  " ",
  "alt",
  "ctrl",
  "◀",
  "▼",
  "▶",
];
const ENG_KEYS_SHIFT = [
  "~",
  "!",
  "@",
  "#",
  "$",
  "%",
  "^",
  "&",
  "*",
  "(",
  ")",
  "_",
  "+",
  "backspace",
  "tab",
  "q",
  "w",
  "e",
  "r",
  "t",
  "y",
  "u",
  "i",
  "o",
  "p",
  "{",
  "}",
  "|",
  "del",
  "caps lock",
  "a",
  "s",
  "d",
  "f",
  "g",
  "h",
  "j",
  "k",
  "l",
  ":",
  '"',
  "enter",
  "shift",
  "|",
  "z",
  "x",
  "c",
  "v",
  "b",
  "n",
  "m",
  "<",
  ">",
  "?",
  "▲",
  "shift",
  "ctrl",
  "win",
  "alt",
  " ",
  "alt",
  "ctrl",
  "◀",
  "▼",
  "▶",
];
const RUS_KEYS_SHIFT = [
  "ё",
  "!",
  '"',
  "№",
  ";",
  "%",
  ":",
  "?",
  "*",
  "(",
  ")",
  "_",
  "+",
  "backspace",
  "tab",
  "й",
  "ц",
  "у",
  "к",
  "е",
  "н",
  "г",
  "ш",
  "щ",
  "з",
  "х",
  "ъ",
  "/",
  "del",
  "caps lock",
  "ф",
  "ы",
  "в",
  "а",
  "п",
  "р",
  "о",
  "л",
  "д",
  "ж",
  "э",
  "enter",
  "shift",
  "/",
  "я",
  "ч",
  "с",
  "м",
  "и",
  "т",
  "ь",
  "б",
  "ю",
  ",",
  "▲",
  "shift",
  "ctrl",
  "win",
  "alt",
  " ",
  "alt",
  "ctrl",
  "◀",
  "▼",
  "▶",
];

const KEYBOARD_ENG = new KeyboardKeyCodes(
  ARRAY_OF_KEY_CODES,
  ENG_KEYS,
  ENG_KEYS_SHIFT
);
const KEYBOARD_RUS = new KeyboardKeyCodes(
  ARRAY_OF_KEY_CODES,
  RUS_KEYS,
  RUS_KEYS_SHIFT
);

class KeyboardView {
  constructor() {
    this.container;
  }

  isCapsLock = false;
  isShift = false;
  pushedButtons = new Set();

  changeLanguage() {
    if (sessionStorage.getItem("lang") == "eng") {
      this.rewriteButtonsText(KEYBOARD_ENG);
      sessionStorage.setItem("lang", "rus");
    } else {
      this.rewriteButtonsText(KEYBOARD_RUS);
      sessionStorage.setItem("lang", "eng");
    }
  }

  rewriteButtonsText(language) {
    document.querySelectorAll(".key").forEach((elem, index) => {
      elem.innerHTML = language.keyboardCodes[index].key;
    });
  }

  createKeys() {
    let outCollection = document.createDocumentFragment();
    const BUTTON_AMOUNT = 65;
    let lang;

    if (sessionStorage.getItem("lang") === "rus") {
      lang = RUS_KEYS;
    } else {
      lang = ENG_KEYS;
    }

    for (let i = 0; i < BUTTON_AMOUNT; i++) {
      let key = document.createElement("div");
      key.classList.add("key");
      key.setAttribute("data-id", i);
      key.innerHTML = lang[i];
      if (i == 13 || i == 29 || i == 41 || i == 42 || i == 56) {
        key.classList.add("wide");
      }
      if (i == 59) {
        key.classList.add("space");
      }
      outCollection.appendChild(key);
    }

    if (sessionStorage.length == 0) {
      sessionStorage.setItem("lang", "eng");
    }

    return outCollection;
  }

  insertKeyboardInDOM(buttons) {
    document.querySelector(".keyboard").appendChild(buttons);
  }

  createKeyboard() {
    let buttons = this.createKeys();
    this.insertKeyboardInDOM(buttons);
    return this;
  }

  showUpperCase() {
    document.querySelectorAll(".key").forEach((elem) => {
      elem.innerHTML = elem.innerHTML.toUpperCase();
    });
  }

  showLowerCase() {
    document.querySelectorAll(".key").forEach((elem) => {
      elem.innerHTML = elem.innerHTML.toLowerCase();
    });
  }
}

const keyboard = new KeyboardView();
keyboard.createKeyboard();

const AREA = document.querySelector("#output");
const KEYBOARD = document.querySelector(".keyboard");

buttonsHandler();

function buttonsHandler() {
  const CAPSLOCK = document.querySelector(".key:nth-child(30)");
  const SHIFT_LEFT = document.querySelector(".key:nth-child(43)");
  const SHIFT_RIGHT = document.querySelector(".key:nth-child(56)");
  capsControl();
  shiftControl(false, 0, true);

  KEYBOARD.addEventListener("click", (event) => {
    if (event.target.classList.contains("key")) {
      let id = event.target.dataset.id;
      let content = "";
      event.preventDefault();

      if (sessionStorage.getItem("lang") == "eng") {
        content = KEYBOARD_ENG.keyboardCodes[id];
      } else {
        content = KEYBOARD_RUS.keyboardCodes[id];
      }

      if (keyboard.isShift) {
        content = content["keyS"].toUpperCase();
      } else {
        content = content["key"];
      }

      if (keyboard.isCapsLock) {
        content = content.toUpperCase();
      }

      if (id == 14) {
        content = `    `;
      }

      if (id == 41) {
        content = `\n`;
      }

      if (id == 29 || id == 42 || id == 55) {
        return;
      }

      AREA.innerHTML += content;
      AREA.scrollTo(0, AREA.scrollHeight);
    }
  });

  window.addEventListener("keydown", (event) => {
    keyboard.pushedButtons.add(event.keyCode);

    if (event.keyCode === 20) {
      event.preventDefault();
      capsControl(true);
      AREA.focus();
      return;
    }

    if (event.keyCode === 16) {
      event.preventDefault();
      shiftControl(true, event.location);
      AREA.focus();
      return;
    }

    //backspace and delete
    if (event.keyCode === 8 || event.keyCode === 46) {
      handleActiveButton(event.keyCode, event.location);
      AREA.scrollTo(0, AREA.scrollHeight);
      AREA.focus();
      return;
    }

    //alt and ctrl
    if (event.keyCode === 17 || event.keyCode === 18) {
      event.preventDefault();
      handleActiveButton(event.keyCode, event.location);
      AREA.innerHTML += getPrintedKeydownButton(event.keyCode, event.location);
      AREA.scrollTo(0, AREA.scrollHeight);
      AREA.focus();
      return;
    }

    event.preventDefault();

    if (ARRAY_OF_KEY_CODES.indexOf(event.keyCode) === -1) {
      return;
    } else {
      handleActiveButton(event.keyCode, event.location);
      AREA.innerHTML += getPrintedKeydownButton(event.keyCode, event.location);
      AREA.scrollTo(0, AREA.scrollHeight);

      return;
    }
  });

  window.addEventListener("keyup", function (event) {
    if (keyboard.pushedButtons.has(16) && keyboard.pushedButtons.has(17)) {
      keyboard.changeLanguage();
    }
    keyboard.pushedButtons.delete(event.keyCode);
    if (event.keyCode == 16) {
      shiftControl(event.keyCode, event.location, true);
      return;
    }

    if (event.keyCode === 17 || event.keyCode === 18 || event.keyCode === 91) {
      handleActiveButton(event.keyCode, event.location);
      return;
    }

    if (ARRAY_OF_KEY_CODES.indexOf(event.keyCode) === -1) {
      return;
    }

    if (event.keyCode != 20) {
      handleActiveButton(event.keyCode, event.location);
    }
  });

  function getPrintedKeydownButton(keyCode, location) {
    if (keyCode === 9) {
      return `    `;
    }

    if (keyCode === 17 || keyCode === 18) {
      return "";
    }

    if (keyCode === 13) {
      return "\n";
    }

    function searchItem(keyCode) {
      let element;
      if (sessionStorage.getItem("lang") == "eng") {
        element = KEYBOARD_ENG.keyboardCodes.find((elem) => {
          return elem.keyCode == keyCode;
        });
      } else {
        element = KEYBOARD_RUS.keyboardCodes.find((elem) => {
          return elem.keyCode == keyCode;
        });
      }

      if (keyboard.isShift) {
        return element["keyS"].toUpperCase();
      } else {
        return element["key"];
      }
    }

    return searchItem(keyCode);
  }

  function capsControl(isKeyDown = false) {
    if (isKeyDown) {
      capsLockStateUpdate();
      return;
    }
    function capsLockStateUpdate() {
      keyboard.isCapsLock = !keyboard.isCapsLock;

      if (keyboard.isCapsLock) {
        CAPSLOCK.classList.add("active");
        keyboard.showUpperCase();
      } else {
        CAPSLOCK.classList.remove("active");
        if (!keyboard.isShift) {
          keyboard.showLowerCase();
        }
      }
    }

    if (!isKeyDown) {
      CAPSLOCK.addEventListener("click", capsLockStateUpdate);
    }
  }

  function shiftControl(isKeyDown = false, location = 0, isKeyUp = false) {
    if (!isKeyDown) {
      SHIFT_LEFT.addEventListener("click", shiftClickHandler);
      SHIFT_RIGHT.addEventListener("click", shiftClickHandler);
    } else {
      let position = getPosition(16, location);
      let elem = KEYBOARD.querySelector(`.key:nth-child(${position + 1})`);
      changeActiveStatus(elem, 16);
      keyboard.isShift = true;
    }

    if (isKeyUp) {
      rewriteWithoutShiftKeyboard();
      keyboard.isShift = false;
    } else {
      rewriteShiftKeyboard();
    }

    function shiftClickHandler() {
      keyboard.isShift = !keyboard.isShift;

      if (keyboard.isShift) {
        SHIFT_LEFT.classList.add("active");
        SHIFT_RIGHT.classList.add("active");
        rewriteShiftKeyboard();
      } else {
        SHIFT_LEFT.classList.remove("active");
        SHIFT_RIGHT.classList.remove("active");
        if (!keyboard.isCapsLock) {
          rewriteWithoutShiftKeyboard();
        }
      }
    }

    function rewriteShiftKeyboard() {
      let lang = getCurrentLanguageWithShift();
      KEYBOARD.querySelectorAll(".key").forEach((elem, index) => {
        elem.innerHTML = lang[index].toUpperCase();
      });
    }

    function rewriteWithoutShiftKeyboard() {
      let lang = getCurrentLanguageWithoutShift();
      KEYBOARD.querySelectorAll(".key").forEach((elem, index) => {
        elem.innerHTML = lang[index].toLowerCase();
      });
      SHIFT_LEFT.classList.remove("active");
      SHIFT_RIGHT.classList.remove("active");
    }

    function getCurrentLanguageWithShift() {
      if (sessionStorage.getItem("lang") == "eng") {
        return ENG_KEYS_SHIFT;
      }
      if (sessionStorage.getItem("lang") == "rus") {
        return RUS_KEYS_SHIFT;
      }
      return;
    }

    function getCurrentLanguageWithoutShift() {
      if (sessionStorage.getItem("lang") == "eng") {
        return ENG_KEYS;
      }
      if (sessionStorage.getItem("lang") == "rus") {
        return RUS_KEYS;
      }
      return;
    }
  }

  function handleActiveButton(keyCode, location) {
    let position = getPosition(keyCode, location);
    let elem = KEYBOARD.querySelector(`.key:nth-child(${position + 1})`);
    changeActiveStatus(elem, keyCode);
  }

  function getPosition(keyCode, location) {
    if (location == 0) {
      return ARRAY_OF_KEY_CODES.findIndex((element) => {
        return keyCode == element;
      });
    } else {
      return ARRAY_OF_KEY_CODES.findIndex((element) => {
        return keyCode == element[0] && location == element[1];
      });
    }
  }

  function changeActiveStatus(elem, keyCode) {
    if (keyboard.pushedButtons.has(keyCode)) {
      elem.classList.add("active");
    } else {
      elem.classList.remove("active");
    }
  }
}
