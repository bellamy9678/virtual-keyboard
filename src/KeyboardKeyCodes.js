export default class KeyboardKeyCodes {
  constructor(arrayOfKeyCodes, arrayOfKeyTexts, arrayOfKeyShiftTexts) {
    this.keyboardCodes = [];
    const keyCodePosition = 0;
    const locationPosition = 1;
    const defaultLocation = 0;

    arrayOfKeyCodes.forEach((element, i) => {
      const isElemArray = Array.isArray(element);

      if (isElemArray) {
        this.keyboardCodes.push({
          keyCode: element[keyCodePosition],
          location: element[locationPosition],
          key: arrayOfKeyTexts[i],
          keyS: arrayOfKeyShiftTexts[i],
        });
      } else {
        this.keyboardCodes.push({
          keyCode: element,
          location: defaultLocation,
          key: arrayOfKeyTexts[i],
          keyS: arrayOfKeyShiftTexts[i],
        });
      }
    });
  }
}
