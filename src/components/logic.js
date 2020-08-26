class Logic {
  static countResult(screenValue, screenHistory) {
    return eval(`${screenValue}${screenHistory}`).toString();
  }

  static setScreenHistory(value, screenHistory, screenValue) {
    if (arguments.length === 3) {
      // if 3 args then set history
      return `${screenHistory}${screenValue}${value}`;
    } else if (arguments.length === 2) {
      // if 2 args then replace last sign in history
      return `${screenHistory.slice(0, -1)}${value}`;
    }
  }

  static setScreenValue(value, screenValue) {
    return `${screenValue}${value}`;
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

      // if last sign is = then reset history
      if (lastSign === "=" && value !== "=") {
        return "replaceSign";
      }
      if (lastSign === "=") {
        return "reset";
      }
      return "addSign";
    }

    // if value is a num
    if (value.match(numbers)) {
      // if (screenValue.length > 16) return;
      return "addNum";
    }
  }
}

export default Logic;
