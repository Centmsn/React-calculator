class CalcLogic {
  constructor() {
    this._result = "";
  }
  countResult(screenValue, screenHistory) {
    if (screenHistory.length > 0 && this._result.length === 0) {
      const historyResult = eval(`${screenHistory.slice(0, -1)}`);

      this.setResult(
        "set",
        eval(`${historyResult}${screenHistory.slice(-1)}${screenValue}`)
      );
      return this._result;
    } else if (this._result.length > 0) {
      this.setResult(
        "set",
        eval(`${this._result}${screenHistory.slice(-1)}${screenValue}`)
      );
      return this._result;
    } else {
      this.setResult("set", eval(`${screenHistory}${screenValue}`));
      return this._result;
    }
  }

  getResult() {
    return this._result;
  }

  setResult(option, value) {
    if (value === Infinity) {
      this._result = "Do not divide by 0";
      return;
    }
    if (option === "reset") {
      this._result = "";
    } else if (option === "set") {
      this._result = value.toString();
    } else {
      throw new Error("incorrect option - use set or reset");
    }
  }

  setScreenHistory(value, screenHistory, screenValue) {
    if (arguments.length === 3) {
      let trimmedValue = "";
      // if last sign is a dot - remove it
      screenValue.endsWith(".")
        ? (trimmedValue = screenValue.slice(0, -1))
        : (trimmedValue = screenValue);
      // if 3 args then set history
      return `${screenHistory}${trimmedValue}${value}`;
    } else if (arguments.length === 2) {
      // if 2 args then replace last sign in history
      return `${screenHistory.slice(0, -1)}${value}`;
    }
  }

  setScreenValue(value, screenValue) {
    return `${screenValue}${value}`;
  }

  validateSign(value, screenValue, screenHistory) {
    const signs = /[+\-*/=]/;
    const numbers = /[0-9]/;
    let lastSign = "";

    if (screenHistory.length > 0) {
      lastSign = screenHistory[screenHistory.length - 1];
    }
    if (value === "." && screenValue.indexOf(".") === -1) return "addNum";

    // if value is a sign
    if (value.match(signs)) {
      if (screenValue.length === 0) return "notAdd";
      if (value === "=" && lastSign === "=") return "notAdd";
      if (lastSign.match(signs) && screenValue.length === 0) {
        return "replaceSign";
      }
      //check if anything is on screen
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

const Logic = new CalcLogic();

export default Logic;
