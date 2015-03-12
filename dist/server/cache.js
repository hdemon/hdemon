"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _ = require("lodash");

var Cache = (function () {
  function Cache() {
    _classCallCheck(this, Cache);

    this.cache = {};
    this.previousPeriod = null;
    this.durationSecond = 600;
  }

  _prototypeProperties(Cache, null, {
    expire: {
      value: function expire() {
        this.cache = {};
      },
      writable: true,
      configurable: true
    },
    set: {
      value: function set(object) {
        this.cache = object;
        this.previousPeriod = Date.now();
      },
      writable: true,
      configurable: true
    },
    get: {
      value: function get() {
        return this.cache;
      },
      writable: true,
      configurable: true
    },
    hasExpired: {
      value: function hasExpired() {
        if (_.isNull(this.previousPeriod)) {
          return true;
        } else {
          return (Date.now() - this.previousPeriod) / 1000 > this.durationSecond;
        }
      },
      writable: true,
      configurable: true
    }
  });

  return Cache;
})();

module.exports = Cache;