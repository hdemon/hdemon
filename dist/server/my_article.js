"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var axios = require("axios");

var MyArticle = (function () {
  function MyArticle() {
    _classCallCheck(this, MyArticle);

    this.origin = "https://api.github.com";
  }

  _prototypeProperties(MyArticle, null, {
    fetchIndex: {
      value: function fetchIndex() {
        var path = "/repos/" + process.env.USER_NAME + "/hdemon-articles/contents/articles";
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