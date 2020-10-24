class CalcLogic {
  constructor() {
    this._result = "";
    this.forbiddenCombination = /^0{1,}/;
    this.numbers = /[0-9]/;
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

  setResult(option, value = "") {
    if (value === Infinity) {
      this._result = "Do not divide by 0";
      return;
    }
    if (value.toString() === "NaN") {
      this._result = "Unknown result";
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
      screenValue.endsWith(".")
        ? (trimmedValue = screenValue.slice(0, -1))
        : (trimmedValue = screenValue);
      return `${screenHistory}${trimmedValue}${value}`;
    } else if (arguments.length === 2) {
      return `${screenHistory.slice(0, -1)}${value}`;
    } else {
      throw new Error("incorrect number of arguments - use 2 or 3");
    }
  }

  setScreenValue(value, screenValue) {
    return `${screenValue}${value}`;
  }

  validateSign(value, screenValue, screenHistory, resetFlag = false) {
    const signs = /[+\-*/=]/;
    let lastSign = "";

    // if history exist
    if (screenHistory.length > 0) {
      lastSign = screenHistory[screenHistory.length - 1];
    }
    // dot validation
    if (
      value === "." &&
      screenValue.indexOf(".") < 0 &&
      screenValue.length > 0
    ) {
      if (resetFlag) return;
      return "addNum";
    }

    // if value is a sign
    if (value.match(signs)) {
      if (value === "=" && lastSign === "=") {
        return "notAdd";
      }

      if (lastSign.match(signs) && screenValue.length === 0)
        return "replaceSign";
      if (screenValue.length === 0) return "notAdd";
      if (lastSign === "=" && value !== "=") return "replaceSign";
      if (lastSign === "=") return "reset";

      return "addSign";
    }

    // if value is a num
    if (value.match(this.numbers)) {
      if (screenValue.length > 14 && resetFlag === false) return;
      if (
        screenValue.match(this.forbiddenCombination) &&
        value === "0" &&
        screenValue.length <= 1
      )
        return;

      if (screenValue.length === 1 && screenValue === "0" && value !== 0) {
        return "replace";
      }
      return "addNum";
    }
  }
}

const Logic = new CalcLogic();

export default Logic;
