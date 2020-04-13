class CreateDomElements {
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

  CreateDom() {
    this.createContainer();
    this.createHeader();
    this.createContainerForInputAndKeyboard();
    this.createTextarea();
    this.createKeyboardDiv();
    this.createHelp();
    return this.container;
  }
}

const application = new CreateDomElements();
document.querySelector("body").appendChild(application.CreateDom());

class VirtualKeyboard {
  
  constructor() {
    this.container;
  }

    createKeys() {
      let outCollection = document.createDocumentFragment();
      const BUTTON_AMOUNT = 65;
      const WIDE_BUTTONS_ID = [13,29,41,42,56];
      const SPACE_ID = 59;

      for (let i = 0; i < BUTTON_AMOUNT; i++) {
        let key = document.createElement("div");
        key.classList.add("key");
        key.setAttribute("data-id", i);

        key.innerHTML = i;

        if (WIDE_BUTTONS_ID.indexOf(i) != -1) {
          key.classList.add("wide");
        }
        if (i == SPACE_ID) {
          key.classList.add("space");
        }
        outCollection.appendChild(key);
      }
  
      if (sessionStorage.length == 0) {
        sessionStorage.setItem("lang", "eng");
      }
  
      return outCollection;
    }
  
    insertKeyboardInDom(buttons) {
      document.querySelector(".keyboard").appendChild(buttons);
    }
  
    createKeyboard() {
      let buttons = this.createKeys();
      this.insertKeyboardInDom(buttons);
      return this;
    }
  
  init() {
    checkSessionStorage();
    this.createKeyboard();
    return this;

    function checkSessionStorage(){
      if (sessionStorage.length === 0) {
        sessionStorage.getItem("lang") === "eng"
      }
    }
  }

  start() {

    const ACCEPT_KEY_CODES = [ 192, 49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 189, 187, 8, 9, 81, 87, 69, 82, 84, 89, 85, 73, 79, 80, 219, 221, 220, 46, 20, 65, 83, 68, 70, 71, 72, 74, 75, 76, 186, 222, [13, 0], [16, 1], 226, 90, 88, 67, 86, 66, 78, 77, 188, 190, 191, 38, [16, 2], [17, 1], [91, 1], [18, 1], 32, [18, 2], [17, 2], 37, 40, 39, ];
    const ENG_KEYBOARD_LAYOUT = [ "`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "backspace", "tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "\\", "del", "caps lock", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "enter", "shift", "\\", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", "▲", "shift", "ctrl", "win", "alt", " ", "alt", "ctrl", "◀", "▼", "▶", ];
    const RUS_KEYBOARD_LAYOUT = [ "ё", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "backspace", "tab", "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ", "\\", "del", "caps lock", "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э", "enter", "shift", "\\", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", ".", "▲", "shift", "ctrl", "win", "alt", " ", "alt", "ctrl", "◀", "▼", "▶", ];
    const ENG_SHIFT_KEYBOARD_LAYOUT = [ "~", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "+", "backspace", "tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "{", "}", "|", "del", "caps lock", "a", "s", "d", "f", "g", "h", "j", "k", "l", ":", '"', "enter", "shift", "|", "z", "x", "c", "v", "b", "n", "m", "<", ">", "?", "▲", "shift", "ctrl", "win", "alt", " ", "alt", "ctrl", "◀", "▼", "▶", ];
    const RUS_SHIFT_KEYBOARD_LAYOUT = [ "ё", "!", '"', "№", ";", "%", ":", "?", "*", "(", ")", "_", "+", "backspace", "tab", "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ", "/", "del", "caps lock", "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э", "enter", "shift", "/", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", ",", "▲", "shift", "ctrl", "win", "alt", " ", "alt", "ctrl", "◀", "▼", "▶", ];
    const KEYBOARD = document.querySelector(".keyboard");
    const AREA = document.querySelector("#output");
    
    let isCapsLock = false;
    let isShift = false;
    let pushedButtons = new Set();
    let carriageCurrentPosition = 0;
    
    class KeyboardKeyCodes {
      constructor(arrayOfKeyCodes, arrayOfKeyTexts, arrayOfKeyShiftTexts) {
        this.keyboardCodes = [];
        arrayOfKeyCodes.forEach((element, i) => {
          this.keyboardCodes.push({
            keyCode: element[0] || element,
            location: element[1] || 0,        
            key: arrayOfKeyTexts[i],
            keyS: arrayOfKeyShiftTexts[i],
          });
        });
      }
    }

    const KEYBOARD_ENG = new KeyboardKeyCodes(
      ACCEPT_KEY_CODES,
      ENG_KEYBOARD_LAYOUT,
      ENG_SHIFT_KEYBOARD_LAYOUT
    );
    
    const KEYBOARD_RUS = new KeyboardKeyCodes(
      ACCEPT_KEY_CODES,
      RUS_KEYBOARD_LAYOUT,
      RUS_SHIFT_KEYBOARD_LAYOUT
    );

    updateKeyboard();
    
    function getElementIdByKeyCodeAndLocation (abcObjectsArray, keyCode, location = 0) {
      
      for (let i = 0; i < abcObjectsArray.length; i++) {
        if (abcObjectsArray[i].keyCode == keyCode && abcObjectsArray[i].location == location) {
          return i;
        }
      }
      return -1;
      
      /*
      const keyCodePos = abcObjectsArray.map( el => el.keyCode ).indexOf(keyCode);
      console.log(keyCodePos, abcObjectsArray);
      if (abcObjectsArray[keyCodePos].location == location) {
        return keyCodePos;
      }
      return -1;
      */
    }

    function getCurrentLanguageKeyboardCodes () {
      if (sessionStorage.getItem("lang") === "rus") {
        return KEYBOARD_RUS.keyboardCodes;
      }
      if (sessionStorage.getItem("lang") === "eng") {
        return KEYBOARD_ENG.keyboardCodes;
      }
    }

    function updateKeyboard() {
      let lang = getCurrentLanguageKeyboardCodes();
      getShiftKeyboard(lang);
      getCapsKeyboard();
    }

    function getShiftKeyboard(lang) {
      if (isShift) {
        KEYBOARD.querySelectorAll('.key').forEach( (elem, index) => {
          elem.innerHTML = lang[index].keyS.toUpperCase();
        })
      } else {
        KEYBOARD.querySelectorAll('.key').forEach( (elem, index) => {
          elem.innerHTML = lang[index].key.toLowerCase();
        })
      }
    }

    function getCapsKeyboard() {
      if (isCapsLock) {
        KEYBOARD.querySelectorAll('.key').forEach( (elem) => {
          elem.innerHTML = elem.innerHTML.toUpperCase();
        })
      } else {
        KEYBOARD.querySelectorAll('.key').forEach( (elem) => {
          elem.innerHTML = elem.innerHTML.toLowerCase();
        })
      }
    }

    //realization

    function print(smth) {
      AREA.selectionStart = carriageCurrentPosition;
      AREA.focus();
      
      let first = AREA.value.slice(0, carriageCurrentPosition);
      let last = AREA.value.slice(carriageCurrentPosition); 

      AREA.innerHTML = first + transformSymbolIfNeeded(smth) + last;
      carriageCurrentPosition = first.length + smth.length;

      AREA.selectionStart = carriageCurrentPosition;
      AREA.focus();

      function transformSymbolIfNeeded(smth) {
        if (isCapsLock) {
          return smth.toUpperCase();
        } else {
          return smth;
        }
      }
    }

    function deleteHandler() {
      AREA.selectionStart = carriageCurrentPosition;
      AREA.focus();
      
      let first = AREA.value.slice(0, carriageCurrentPosition);
      let last = AREA.value.slice(carriageCurrentPosition + 1); 
              
      AREA.innerHTML = first + last;
      carriageCurrentPosition = first.length;

      AREA.selectionStart = carriageCurrentPosition;
      AREA.focus();
    }

    function backspaceHandler() {
      AREA.selectionStart = carriageCurrentPosition;
      AREA.focus();

      let first = (carriageCurrentPosition <= 0) ? '' : AREA.value.slice(0, carriageCurrentPosition - 1);
      let last = AREA.value.slice(carriageCurrentPosition); 
              
      AREA.innerHTML = first + last;
      carriageCurrentPosition = first.length;

      AREA.selectionStart = carriageCurrentPosition;
      AREA.focus();
    }

    function capsLockClickHandler(event){
      isCapsLock = !isCapsLock;
      if(isCapsLock) {
        event.target.classList.add('active')
      } else {
        event.target.classList.remove('active')
      }
      updateKeyboard();
    }

    function tabHandler(){
      print('    ');
    }

    function enterHandler(){
      print('\n');
    }

    function updateSessionStorage() {
      if (sessionStorage.getItem("lang") == "eng") {
        sessionStorage.setItem("lang", "rus");
      } else {
        sessionStorage.setItem("lang", "eng");
      }
    }

    function checkLanguage() {
      if (pushedButtons.has(16) && pushedButtons.has(17)) {
        updateSessionStorage();
        updateKeyboard();
        shiftClickHandler();
        ctrlClickHandler();
      }
    }

    function shiftClickHandler() {
      const SHIFT_LEFT = KEYBOARD.querySelector(".key:nth-child(43)");
      const SHIFT_RIGHT = KEYBOARD.querySelector(".key:nth-child(56)");

      isShift = !isShift;
      if(isShift) {
        SHIFT_LEFT.classList.add('active');
        SHIFT_RIGHT.classList.add('active');
        pushedButtons.add(16);
      } else {
        SHIFT_LEFT.classList.remove('active');
        SHIFT_RIGHT.classList.remove('active');
        pushedButtons.delete(16);
      }
      checkLanguage();
      updateKeyboard();
    }

    function ctrlClickHandler(){
      const CTRL_LEFT = KEYBOARD.querySelector(".key:nth-child(57)");
      const CTRL_RIGHT = KEYBOARD.querySelector(".key:nth-child(62)");

      if(pushedButtons.has(17)) {
        CTRL_LEFT.classList.remove('active');
        CTRL_RIGHT.classList.remove('active');
        pushedButtons.delete(17);
      } else {
        CTRL_LEFT.classList.add('active');
        CTRL_RIGHT.classList.add('active');
        pushedButtons.add(17);
      }
      checkLanguage();
      updateKeyboard();
    }

    function symbolButtonClickHandler(event) {
      const id = event.target.dataset.id;
      let elem = getCurrentLanguageKeyboardCodes();
      if (isShift) {
        elem = elem[id].keyS.toUpperCase();
      } else {
        elem = elem[id].key;
      }
      print(elem);
    }

    KEYBOARD.addEventListener("mousedown", (event) => {
      if (event.target.classList.contains("key")) {
        event.target.classList.add("pushed");
      }
    });
    
    KEYBOARD.addEventListener("mouseup", (event) => {
      if (event.target.classList.contains("key")) {
        event.target.classList.remove("pushed");
      }
    });

    KEYBOARD.addEventListener("mouseout", (event) => {
      if (event.target.classList.contains("key")) {
        event.target.classList.remove("pushed");
      }
    });

    KEYBOARD.addEventListener('click', (ev) => {
      if (ev.target.classList.contains('key')) {
        keyboardClickHandler(ev);
      }
    })

    AREA.addEventListener('click', (ev) => {
      carriageCurrentPosition = ev.toElement.selectionEnd;
    })
    
    function keyboardClickHandler(event) {
      let id = event.target.dataset.id;
      const CAPS_ID = 29,
            TAB_ID = 14,
            ENTER_ID = 41,
            BACKSPACE_ID = 13,
            DELETE_ID = 28,
            SHIFT_ID_ARR = [42,55],
            CTRL_ID_ARR = [56,61],
            FUNC_BUTTONS_ID_ARR = [57,58,60];

      if (id == CAPS_ID){
        capsLockClickHandler(event);
        return;
      }
    
      if (id == TAB_ID){
        tabHandler();
        return;
      }
    
      if (id == ENTER_ID){
        enterHandler();
        return;
      }
    
      if (id == BACKSPACE_ID){
        backspaceHandler();
        return;
      }
    
      if (id == DELETE_ID){
        deleteHandler();
        return;
      }
    
      if (SHIFT_ID_ARR.indexOf(id) != -1) {
        shiftClickHandler();
        return;
      }

      if (FUNC_BUTTONS_ID_ARR.indexOf(id) != -1){
        return;
      }

      if (CTRL_ID_ARR.indexOf(id) != -1){
        ctrlClickHandler();
        return;
      } else {
        symbolButtonClickHandler(event);
      }
    } // end of function keyboardClickHandler(event) 
  
    window.addEventListener('keydown', (event) => {
      event.preventDefault();
      const lang = getCurrentLanguageKeyboardCodes();
      const id = getElementIdByKeyCodeAndLocation(lang, event.keyCode, event.location);      
      if (id != -1) {
        let elem = KEYBOARD.querySelector(`.key:nth-child(${id + 1})`);
        keydownHandler(elem, id);
      }
    })

    window.addEventListener('keyup', (event) => {
      event.preventDefault();
      const lang = getCurrentLanguageKeyboardCodes();
      const id = getElementIdByKeyCodeAndLocation(lang, event.keyCode, event.location);
      
      if (id != -1) {
        let elem = getKeyElemFromVirtualKeyboard(id);
        keyupHandler(elem, id);
      }
    })

    function keydownHandler(elem, id) {
      const CAPS_ID = 29,
            TAB_ID = 14,
            ENTER_ID = 41,
            BACKSPACE_ID = 13,
            DELETE_ID = 28,
            SHIFT_ID_ARR = [42,55],
            CTRL_ID_ARR = [56,61],
            FUNC_BUTTONS_ID_ARR = [57,58,60];

      setActiveStyle(elem);
    
      if (id == CAPS_ID){
        return;
      }
    
      if (id == TAB_ID){
        tabHandler();
        return;
      }
    
      if (id == ENTER_ID){
        enterHandler();
        return;
      }
    
      if (id == BACKSPACE_ID){
        backspaceHandler();
        return;
      }
    
      if (id == DELETE_ID){
        deleteHandler();
        return;
      }

      if (FUNC_BUTTONS_ID_ARR.indexOf(id) != -1){
        return;
      }
    
      if (SHIFT_ID_ARR.indexOf(id) != -1){
        shiftKeydownHandler(elem);
        return;
      }

      if (CTRL_ID_ARR.indexOf(id) != -1){
        ctrlKeydownHandler(elem);
        return;
      } else {
        symbolButtonKeydownHandler(id);
      }
    } // end of function keydownHandler() 

    function keyupHandler(elem, id) {
      const CAPS_ID = 29,
            SHIFT_ID_ARR = [42,55],
            CTRL_ID_ARR = [56,61];

      removeActiveStyle(elem);

      if (id == CAPS_ID){
        capsLockKeyupHandler(elem);
        return;
      }
    
      if (SHIFT_ID_ARR.indexOf(id) != -1){
        shiftKeyupHandler(elem);
        return;
      }

      if (CTRL_ID_ARR.indexOf(id) != -1){
        ctrlKeyupHandler(elem);
        return;
      }
      
    } // end of function keyupHandler

    function getKeyElemFromVirtualKeyboard(id) {
      return KEYBOARD.querySelector(`.key:nth-child(${id + 1})`);
    }

    function setActiveStyle(elem) {
      if (!elem.classList.contains('active')){
        elem.classList.add('active'); 
      }
    }

    function removeActiveStyle(elem) {
      if (elem.classList.contains('active')){
        elem.classList.remove('active'); 
      }
    }

    function capsLockKeyupHandler(elem) {
      isCapsLock = !isCapsLock;
      if (isCapsLock) {
        elem.classList.add('active')
      } else {
        elem.classList.remove('active')
      }
      updateKeyboard();
    }

    function shiftKeydownHandler() {
      const SHIFT_KEYCODE = 16;

      isShift = true;
      updateKeyboard();
      pushedButtons.add(SHIFT_KEYCODE);
    }

    function shiftKeyupHandler() {
      const SHIFT_KEYCODE = 16;
      isShift = false;
      updateKeyboard();
      checkKeyboardLanguage();
      pushedButtons.delete(SHIFT_KEYCODE);
      cleanCtrlAndShift();
    }

    function ctrlKeydownHandler() {
      const CTRL_KEYCODE = 17;
      pushedButtons.add(CTRL_KEYCODE);
    }

    function ctrlKeyupHandler() {
      const CTRL_KEYCODE = 17;
      updateKeyboard();
      checkKeyboardLanguage();
      pushedButtons.delete(CTRL_KEYCODE);
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

    function checkKeyboardLanguage() {
      const SHIFT_KEYCODE = 16,
            CTRL_KEYCODE = 17;
      if (pushedButtons.has(SHIFT_KEYCODE) && pushedButtons.has(CTRL_KEYCODE)) {
        updateSessionStorage();
        updateKeyboard();
        pushedButtons.delete(SHIFT_KEYCODE);
        pushedButtons.delete(CTRL_KEYCODE);
        cleanCtrlAndShift();
      }
    }

    function cleanCtrlAndShift() {
      KEYBOARD.querySelector(".key:nth-child(43)").classList.remove('active');
      KEYBOARD.querySelector(".key:nth-child(56)").classList.remove('active');
      KEYBOARD.querySelector(".key:nth-child(57)").classList.remove('active');
      KEYBOARD.querySelector(".key:nth-child(62)").classList.remove('active');
    }
    

  } // end of function start() 
}

const virtualKeyboard = new VirtualKeyboard();
virtualKeyboard.init().start();