class CreateDOMElements {
    constructor () {
        this.container;
    }

    createContainer() {
        let elem = document.createElement('div');
        elem.classList.add('wrapper');
        this.container = elem;
    }

    createHeader() {
        let elem = document.createElement('h1');
        elem.innerHTML = 'Virtual Keyboard';
        this.container.appendChild(elem);
    }

    createContainerForInputAndKeyboard() {
        let elem = document.createElement('div');
        elem.classList.add('keyboard-container');
        this.container.appendChild(elem);
    }

    createTextarea() {
        let elem = document.createElement('textarea');
        elem.classList.add('output-textarea');
        elem.name = ('output-textarea');
        elem.id = "output";
        elem.setAttribute('autofocus','');
        this.container.querySelector('.keyboard-container').appendChild(elem);
    }

    createKeyboardDiv() {
        let elem = document.createElement('div');
        elem.classList.add('keyboard');
        this.container.querySelector('.keyboard-container').appendChild(elem);
    }

    createHelp() {
        let elem = document.createElement('p');
        elem.classList.add('description');
        elem.innerHTML = 'EN/RU = ctrl + shift';
        this.container.querySelector('.keyboard-container').appendChild(elem);
    }

    CreateDOM() {
        this.createContainer();
        this.createHeader();
        this.createContainerForInputAndKeyboard ();
        this.createTextarea();
        this.createKeyboardDiv();
        this.createHelp();
        return this.container;
    }
}

let keyboardElement = new CreateDOMElements();
document.querySelector('body').appendChild(keyboardElement.CreateDOM());

/*
class KeyButton {
    constructor (rus, eng = rus, shiftRus = rus, shiftEng = rus) {
        this.rus = rus;
        this.eng = eng;
        this.shiftRus = shiftRus;
        this.shiftEng = shiftEng;
    }

    print(param) {
        return this[param];
    }
}
*/

class Keyboard {

    constructor () {
        this.container;
    }

    static ENG_KEYS = ["`","1","2","3","4","5","6","7","8","9","0","-","=","backspace","tab","q","w","e","r","t","y","u","i","o","p","[","]","\\","del","caps lock","a","s","d","f","g","h","j","k","l",";","'","enter","shift","\\","z","x","c","v","b","n","m",",",".","/","▲","shift","ctrl","win","alt"," ","alt","ctrl","◀","▼","▶"];
    static RUS_KEYS = ["ё","1","2","3","4","5","6","7","8","9","0","-","=","backspace","tab","й","ц","у","к","е","н","г","ш","щ","з","х","ъ","\\","del","caps lock","ф","ы","в","а","п","р","о","л","д","ж","э","enter","shift","\\","я","ч","с","м","и","т","ь","б","ю",".","▲","shift","ctrl","win","alt"," ","alt","ctrl","◀","▼","▶"];

    changeLanguage() {
        if (sessionStorage.getItem('lang') == 'eng') {
            this.rewriteButtonsText(Keyboard.RUS_KEYS);
            sessionStorage.setItem('lang', 'rus');
        } else {
            this.rewriteButtonsText(Keyboard.ENG_KEYS);
            sessionStorage.setItem('lang', 'eng');
        }
    };

    rewriteButtonsText(language) {
        document.querySelectorAll('.key').forEach( (elem, index) => {
            elem.innerHTML = language[index];
        })
    }

    createKeys() {
        let outCollection = document.createDocumentFragment();
        const BUTTON_AMOUNT = 65;
        let lang;
        if (sessionStorage.getItem('lang') === 'rus') {
            lang = Keyboard.RUS_KEYS;
            console.log('create rus');
        } else {
            lang = Keyboard.ENG_KEYS;
            console.log('create eng');
        }
        
        for (let i = 0; i < BUTTON_AMOUNT; i++) {
            let key = document.createElement('div');
            key.classList.add('key');
            key.innerHTML = lang[i];
            if (i == 13 || i == 29 || i == 41 || i == 42 || i == 56) {
                key.classList.add('wide')
            };
            if (i == 59 ) {
                key.classList.add('space')
            };
            outCollection.appendChild(key);
        }
        
        if (sessionStorage.length == 0) {
            sessionStorage.setItem('lang', 'eng');
        }
        
        return outCollection; 
    }

    insertKeyboardInDOM(buttons) {
        document.querySelector('.keyboard').appendChild(buttons);
    };

    createKeyboard() {
        let buttons = this.createKeys();
        this.insertKeyboardInDOM(buttons);
        return this.container;
    }

    pushedButtons = new Set();

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

let keyboard = new Keyboard();
keyboard.createKeyboard();

const CAPSLOCK = document.querySelector('.key:nth-child(30)');

CAPSLOCK.addEventListener('click', function(event) {
    event.stopPropagation();
    if( CAPSLOCK.classList.contains('active') ) {
        CAPSLOCK.classList.remove('active');
        keyboard.showLowerCase();
    } else {
        CAPSLOCK.classList.add('active');
        keyboard.showUpperCase();
    }
})

const AREA = document.querySelector('#output');
const KEYBOARD = document.querySelector('.keyboard');


KEYBOARD.addEventListener('click', function(event) {
    
})

window.addEventListener('keydown', function (event) {
    event.preventDefault();
    let code = event.keyCode;
    if (
        code >= 48 && code <= 57 ||
        code >= 65 && code <= 90 ||
        code >= 186 && code <= 192 ||
        code >= 219 && code <= 222 ||
        code == 226 ||
        code == 32 
    ) {
        AREA.value += event.key;
    }

    if (code == 9) {
        AREA.value += `    `;
    }

    if (code == 13) {
        AREA.value += `\n`;
    }
    AREA.scroll(0,AREA.scrollHeight);
    
    keyboard.pushedButtons.add(code);
})


/* for changing language */

window.addEventListener('keyup', function (event) {
    if (keyboard.pushedButtons.has(16) && keyboard.pushedButtons.has(17)) {
        keyboard.changeLanguage();
    }
    keyboard.pushedButtons.delete(event.keyCode);
})
