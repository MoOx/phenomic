/* eslint-disable */
// https://github.com/facebook/jest/issues/3552
jest.doMock("oniguruma", function mockOniguruma() {
  // https://github.com/atom/node-oniguruma/blob/3664b41e615697a3abd3b13e67226d177fa4143b/src/oniguruma.js
  // with just "configurable: true" on Object.defineProperty

  "use strict";

  const OnigScanner = require("oniguruma/build/Release/onig_scanner.node")
    .OnigScanner;
  const OnigString = require("oniguruma/build/Release/onig_scanner.node")
    .OnigString;

  function OnigRegExp(source) {
    this.source = source;
    this.scanner = new OnigScanner([this.source]);
  }

  OnigRegExp.prototype.captureIndicesForMatch = function(string, match) {
    var capture, captureIndices, i, len;
    if (match != null) {
      captureIndices = match.captureIndices;
      string = this.scanner.convertToString(string);
      for (i = 0, len = captureIndices.length; i < len; i++) {
        capture = captureIndices[i];
        capture.match = string.slice(capture.start, capture.end);
      }
      return captureIndices;
    } else {
      return null;
    }
  };

  OnigRegExp.prototype.searchSync = function(string, startPosition) {
    var match;
    if (startPosition == null) {
      startPosition = 0;
    }
    match = this.scanner.findNextMatchSync(string, startPosition);
    return this.captureIndicesForMatch(string, match);
  };

  OnigRegExp.prototype.search = function(string, startPosition, callback) {
    if (startPosition == null) {
      startPosition = 0;
    }
    if (typeof startPosition === "function") {
      callback = startPosition;
      startPosition = 0;
    }
    return this.scanner.findNextMatch(
      string,
      startPosition,
      (function(_this) {
        return function(error, match) {
          return typeof callback === "function"
            ? callback(error, _this.captureIndicesForMatch(string, match))
            : void 0;
        };
      })(this),
    );
  };

  OnigRegExp.prototype.testSync = function(string) {
    return this.searchSync(string) != null;
  };

  OnigRegExp.prototype.test = function(string, callback) {
    return this.search(string, 0, function(error, result) {
      return typeof callback === "function"
        ? callback(error, result != null)
        : void 0;
    });
  };

  OnigScanner.prototype.findNextMatch = function(
    string,
    startPosition,
    callback,
  ) {
    if (startPosition == null) startPosition = 0;
    if (typeof startPosition === "function") {
      callback = startPosition;
      startPosition = 0;
    }

    string = this.convertToString(string);
    startPosition = this.convertToNumber(startPosition);

    this._findNextMatch(string, startPosition, (error, match) => {
      if (match) match.scanner = this;
      return callback(error, match);
    });
  };

  OnigScanner.prototype.findNextMatchSync = function(string, startPosition) {
    if (startPosition == null) {
      startPosition = 0;
    }
    string = this.convertToString(string);
    startPosition = this.convertToNumber(startPosition);

    let match = this._findNextMatchSync(string, startPosition);
    if (match) match.scanner = this;
    return match;
  };

  OnigScanner.prototype.convertToString = function(value) {
    if (value === undefined) return "undefined";
    if (value === null) return "null";
    if (value.constructor == OnigString) return value;
    return value.toString();
  };

  OnigScanner.prototype.convertToNumber = function(value) {
    value = parseInt(value);
    if (!isFinite(value)) {
      value = 0;
    }
    value = Math.max(value, 0);
    return value;
  };

  OnigString.prototype.substring = function(start, end) {
    return this.content.substring(start, end);
  };

  OnigString.prototype.toString = function(start, end) {
    return this.content;
  };

  Object.defineProperty(OnigString.prototype, "length", {
    get() {
      return this.content.length;
    },
    // https://github.com/facebook/jest/issues/3552
    configurable: true,
  });

  // exports.OnigScanner = OnigScanner
  // exports.OnigRegExp = OnigRegExp
  // exports.OnigString = OnigString
  return { OnigScanner, OnigRegExp, OnigString };
});
/* eslint-enable */
