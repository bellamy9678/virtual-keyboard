import CreateDomElements from './src/CreateDomElements';
import VirtualKeyboard from './src/VirtualKeyboard';

const application = new CreateDomElements();
document.querySelector('body').appendChild(application.createDom());

const virtualKeyboard = new VirtualKeyboard();
virtualKeyboard.init().start();
