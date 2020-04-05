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
        arrayOfKeyCodes.forEach( (element, i) => {
            this.keyboardCodes.push({
                'keyCode'  : element,
                'key'      : arrayOfKeyTexts[i],
                'keyS'     : arrayOfKeyShiftTexts[i]
            })
        });
    }
}

const ARRAY_OF_KEY_CODES = [192,49,50,51,52,53,54,55,56,57,48,189,187,8,9,81,87,69,82,84,89,85,73,79,80,219,221,220,46,20,65,83,68,70,71,72,74,75,76,186,222,13,[16,1],226,90,88,67,86,66,78,77,188,190,191,38,[16,2],[17,1],91,[18,1],32,[18,2],[17,2],37,40,39];
const ENG_KEYS = ["`","1","2","3","4","5","6","7","8","9","0","-","=","backspace","tab","q","w","e","r","t","y","u","i","o","p","[","]","\\","del","caps lock","a","s","d","f","g","h","j","k","l",";","'","enter","shift","\\","z","x","c","v","b","n","m",",",".","/","▲","shift","ctrl","win","alt"," ","alt","ctrl","◀","▼","▶"];
const RUS_KEYS = ["ё","1","2","3","4","5","6","7","8","9","0","-","=","backspace","tab","й","ц","у","к","е","н","г","ш","щ","з","х","ъ","\\","del","caps lock","ф","ы","в","а","п","р","о","л","д","ж","э","enter","shift","\\","я","ч","с","м","и","т","ь","б","ю",".","▲","shift","ctrl","win","alt"," ","alt","ctrl","◀","▼","▶"];
const ENG_KEYS_SHIFT = ["~","!","@","#","$","%","^","&","*","(",")","_","+","backspace","tab","q","w","e","r","t","y","u","i","o","p","{","}","|","del","caps lock","a","s","d","f","g","h","j","k","l",":",'"',"enter","shift","|","z","x","c","v","b","n","m","<",">","?","▲","shift","ctrl","win","alt"," ","alt","ctrl","◀","▼","▶"];
const RUS_KEYS_SHIFT = ["ё","!",'"',"№",";","%",":","?","*","(",")","_","+","backspace","tab","й","ц","у","к","е","н","г","ш","щ","з","х","ъ","/","del","caps lock","ф","ы","в","а","п","р","о","л","д","ж","э","enter","shift","/","я","ч","с","м","и","т","ь","б","ю",",","▲","shift","ctrl","win","alt"," ","alt","ctrl","◀","▼","▶"];

const KEYBOARD_ENG = new KeyboardKeyCodes(ARRAY_OF_KEY_CODES, ENG_KEYS, ENG_KEYS_SHIFT);
const KEYBOARD_RUS = new KeyboardKeyCodes(ARRAY_OF_KEY_CODES, RUS_KEYS, RUS_KEYS_SHIFT);

class KeyboardView {
    constructor() {
      this.container;
    }
  
    isCapsLock = false;
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
      return this;
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

}

const keyboard = new KeyboardView();
keyboard.createKeyboard();
const AREA = document.querySelector("#output");
buttonsHandler();

function buttonsHandler() {

    const CAPSLOCK = document.querySelector(".key:nth-child(30)");
    capsControl();

    window.addEventListener('keydown', () => {
        const keyCode= event.keyCode;
        keyboard.pushedButtons.add(keyCode);

        if (keyCode == 20) {
            capsControl(true);
            return;
        }

    })
    
    window.addEventListener("keyup", function(event) {
        if (keyboard.pushedButtons.has(16) && keyboard.pushedButtons.has(17)) {
          keyboard.changeLanguage();
        }
        keyboard.pushedButtons.delete(event.keyCode);
    });

    function capsControl(isPushed = false) {
        function capsLockStateUpdate() {
            keyboard.isCapsLock = !keyboard.isCapsLock;
            if (keyboard.isCapsLock) {
            CAPSLOCK.classList.add("active");
            keyboard.showUpperCase();
            } else {
            CAPSLOCK.classList.remove("active");
            keyboard.showLowerCase();
            }
        }
        if (isPushed) {
            capsLockStateUpdate();
            return;
        }
        CAPSLOCK.addEventListener("click", capsLockStateUpdate);
    }
    

}





  