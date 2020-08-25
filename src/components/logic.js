class Logic {
  static countResult(screenValue, screenHistory) {
    return eval(`${screenValue}${screenHistory}`).toString();
  }

  static setScreenHistory(value, screenHistory, screenValue) {
    return `${screenHistory}${screenValue}${value}`;
  }

  static setScreenValue(value, screenValue) {
    return `${screenValue}${value}`;
  }

  static replaceLastSign(value, screenHistory) {
    return `${screenHistory.slice(0, -1)}${value}`;
  }

  static validateSign(value, screenValue, screenHistory) {
    const signs = /[+\-*/.=]/;
    const numbers = /[0-9]/;
    let lastSign = "";

    if (screenHistory.length > 0) {
      lastSign = screenHistory[screenHistory.length - 1];
    }

    // if value is a sign
    if (value.match(signs)) {
      if (lastSign.match(signs) && screenValue.length === 0) {
        return "replaceSign";
      }
      if (screenValue.length === 0) return; //check if anything is on screen
      //last sign in history cannot be sign and screen cannot be empty
      console.log("abc");
      return "addSign";
    }

    // if value is a num
    if (value.match(numbers)) {
      return "addNum";
    }
  }
}

export default Logic;
