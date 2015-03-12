"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var axios = require("axios");
var Promise = require("bluebird");
var Cache = require("./cache");

var MyArticle = (function () {
  function MyArticle() {
    _classCallCheck(this, MyArticle);

    this.origin = "https://api.github.com";
    this.indexCache = new Cache();
  }

  _prototypeProperties(MyArticle, null, {
    fetchIndex: {
      value: function fetchIndex() {
        var _this = this;

        console.log(this.indexCache.hasExpired());
        console.log(this.indexCache.previousPeriod);
        if (this.indexCache.hasExpired()) {
          var path = "/repos/" + process.env.GITHUB_USER_NAME + "/hdemon-articles/contents/articles";
          return axios.get(this.origin + path).then(function (response) {
            _this.indexCache.set(response.data);
            return response.data;
          });
        } else {
          console.log("cache");
          return Promise.resolve(this.indexCache.get());
        }
      },
      writable: true,
      configurable: true
    },
    fetch: {
      value: function fetch(name) {
        var path = "/repos/" + process.env.GITHUB_USER_NAME + "/hdemon-articles/contents/articles/" + encodeURIComponent(name);
        return axios.get(this.origin + path).then(function (response) {
          return response.data;
        });
      },
      writable: true,
      configurable: true
    }
  });

  return MyArticle;
})();

module.exports = MyArticle;