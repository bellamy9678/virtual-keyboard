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

let keyboardElement = new CreateDOMElements();
document.querySelector("body").appendChild(keyboardElement.CreateDOM());

class Keyboard {
  constructor() {
    this.container;
  }

  static ENG_KEYS = [
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
    "▶"
  ];
  static RUS_KEYS = [
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
    "▶"
  ];

  static ENG_KEYS_SHIFT = [
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
    "▶"
  ];
  static RUS_KEYS_SHIFT = [
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
    "▶"
  ];

  isCapsLock = false;
  pushedButtons = new Set();

  changeLanguage() {
    if (sessionStorage.getItem("lang") == "eng") {
      this.rewriteButtonsText(Keyboard.RUS_KEYS);
      sessionStorage.setItem("lang", "rus");
    } else {
      this.rewriteButtonsText(Keyboard.ENG_KEYS);
      sessionStorage.setItem("lang", "eng");
    }
  }

  rewriteButtonsText(language) {
    document.querySelectorAll(".key").forEach((elem, index) => {
      elem.innerHTML = language[index];
    });
  }

  createKeys() {
    let outCollection = document.createDocumentFragment();
    const BUTTON_AMOUNT = 65;
    let lang;

    if (sessionStorage.getItem("lang") === "rus") {
      lang = Keyboard.RUS_KEYS;
    } else {
      lang = Keyboard.ENG_KEYS;
    }

    for (let i = 0; i < BUTTON_AMOUNT; i++) {
      let key = document.createElement("div");
      key.classList.add("key");
      key.setAttribute("data-id", i);
      key.innerHTML = lang[i];
      //for keys like backspace or shift
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
    return this.container;
  }

  showUpperCase() {
    document.querySelectorAll(".key").forEach(elem => {
      elem.innerHTML = elem.innerHTML.toUpperCase();
    });
  }

  showLowerCase() {
    document.querySelectorAll(".key").forEach(elem => {
      elem.innerHTML = elem.innerHTML.toLowerCase();
    });
  }

  getSelectedKeyFromABCKeys(number) {
    if (number >= 0) {
      switch (sessionStorage.getItem("lang")) {
        case "eng": {
          if (this.pushedButtons.has(16)) {
            return Keyboard.ENG_KEYS_SHIFT[number];
          }
          return Keyboard.ENG_KEYS[number];
        }
        case "rus": {
          if (this.pushedButtons.has(16)) {
            return Keyboard.RUS_KEYS_SHIFT[number];
          }
          return Keyboard.RUS_KEYS[number];
        }
      }
    }
  }
}

let keyboard = new Keyboard();
keyboard.createKeyboard();
buttonsHandler();

function buttonsHandler() {
  //Caps Lock handler - view + click
  const CAPSLOCK = document.querySelector(".key:nth-child(30)");

  function capsLockStateUpdate() {
    if (keyboard.isCapsLock) {
      CAPSLOCK.classList.add("active");
      keyboard.showUpperCase();
    } else {
      CAPSLOCK.classList.remove("active");
      keyboard.showLowerCase();
    }
  }

  CAPSLOCK.addEventListener("click", event => {
    keyboard.isCapsLock = !keyboard.isCapsLock;
    capsLockStateUpdate();
  });

  /*
  change language handler (ctrl + shift)
  remove pushed button on keyup
  */
  window.addEventListener("keyup", function(event) {
    if (keyboard.pushedButtons.has(16) && keyboard.pushedButtons.has(17)) {
      keyboard.changeLanguage();
    }
    keyboard.pushedButtons.delete(event.keyCode);
  });

  const AREA = document.querySelector("#output");
  const KEYBOARD = document.querySelector(".keyboard");

  function printWithCapsLock(bool, symb) {
    if (bool) {
      AREA.value += symb.toUpperCase();
    } else {
      AREA.value += symb.toLowerCase();
    }
  }

  window.addEventListener("keydown", function(event) {
    event.preventDefault();

    let keyCode = event.keyCode; // 67 for example
    let keyValue = event.code;  // 'KeyC' for example
    keyboard.pushedButtons.add(keyCode); // saved pushed button code

    if (
        (keyCode >= 48 && keyCode <= 57) ||           //0 - 7
        (keyCode >= 65 && keyCode <= 90) ||           //a - z
        (keyCode >= 186 && keyCode <= 192) ||         //;...
        (keyCode >= 219 && keyCode <= 222) ||         //(...
        keyCode == 226 ||                            // \
        keyCode == 32                                // SPACE
      ) {   
        printSimpleSymbol(keyValue, keyCode);
        return;
      }
    
    if (keyCode == 20) {
        isCapsLockKeydown();
        return;
    }

    if (keyValue.includes('Arrow')) {
        isArrowKeydown(keyValue);
        return;
    }

  });

  

  function printSimpleSymbol(keyValue, keyCode) {
    let out;
    let code = keyCode;
    let value = keyValue;
    let lang = getAbcWithLanguageAndShiftControl();
    console.log(code, value, lang);


    //printWithCapsLock(keyboard.isCapsLock, out)
    return;
  }

  function getAbcWithLanguageAndShiftControl() {
    if (keyboard.pushedButtons.has(16)) {
        if (sessionStorage.getItem("lang") === "rus") {
            return Keyboard.RUS_KEYS_SHIFT;
          } else {
            return Keyboard.ENG_KEYS_SHIFT;
        }
    } else {
        if (sessionStorage.getItem("lang") === "rus") {
            return Keyboard.RUS_KEYS;
          } else {
            return Keyboard.ENG_KEYS;
        }
    }
  }

  function isCapsLockKeydown() {
    keyboard.isCapsLock = !keyboard.isCapsLock;
    capsLockStateUpdate();
    return;
  }

  function isArrowKeydown(keyValue) {
    switch (keyValue) {
        case 'ArrowLeft': {
            printWithCapsLock(false, '◀');
            break;
        }
        case 'ArrowRight': {
            printWithCapsLock(false, '▶');
            break;
        }
        case 'ArrowUp': {
            printWithCapsLock(false, '▲');
            break;
        }
        case 'ArrowDown': {
            printWithCapsLock(false, '▼');
            break;
        } 
    }
    return;
  }

} //конец функции не удалять
