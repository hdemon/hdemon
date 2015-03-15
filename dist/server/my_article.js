"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var axios = require("axios");
var Promise = require("bluebird");
var _ = require("lodash");
var Cache = require("./cache");

var MyArticle = (function () {
  function MyArticle() {
    _classCallCheck(this, MyArticle);

    this.origin = "https://api.github.com";
    this.indexCache = new Cache();
    this.articleCache = {};
  }

  _prototypeProperties(MyArticle, null, {
    fetchIndex: {
      value: function fetchIndex() {
        var _this = this;

        if (this.indexCache.hasExpired()) {
          var path = "/repos/" + process.env.GITHUB_USER_NAME + "/hdemon-articles/contents/articles";
          return axios.get(this.origin + path).then(function (response) {
            var data = _this.formArticleIndexData(response.data);
            _this.indexCache.set(data);
            return _this.wrapWithMetaInfo(null, data);
          });
        } else {
          return Promise.resolve(this.wrapWithMetaInfo(null, this.indexCache.get()));
        }
      },
      writable: true,
      configurable: true
    },
    fetch: {
      value: function fetch(name) {
        var _this = this;

        if (_.isUndefined(this.articleCache[name])) {
          this.articleCache[name] = new Cache();
        }

        if (this.articleCache[name].hasExpired()) {
          var path = "/repos/" + process.env.GITHUB_USER_NAME + "/hdemon-articles/contents/articles/" + encodeURIComponent(name);
          return axios.get(this.origin + path).then(function (response) {
            var data = _this.formArticleData(response.data);
            _this.articleCache[name].set(data);
            return _this.wrapWithMetaInfo(null, data);
          });
        } else {
          return Promise.resolve(this.wrapWithMetaInfo(null, this.articleCache[name].get()));
        }
      },
      writable: true,
      configurable: true
    },
    wrapWithMetaInfo: {
      value: function wrapWithMetaInfo(err, data) {
        return {
          messages: err,
          data: data
        };
      },
      writable: true,
      configurable: true
    },
    formArticleIndexData: {
      value: function formArticleIndexData(data) {
        var _data = data.map(function (item) {
          return {
            name: item.name,
            title: item.name.match(/.*(?=_.*)/)[0],
            publish_date: item.name.match(/[0-9\-]{10}(?=\.md)/)[0]
          };
        });

        return { articles: _data };
      },
      writable: true,
      configurable: true
    },
    formArticleData: {
      value: function formArticleData(data) {
        var _data = {
          name: data.name,
          title: data.name.match(/.*(?=_.*)/)[0],
          publish_date: data.name.match(/[0-9\-]{10}(?=\.md)/)[0],
          content: new Buffer(data.content, "base64").toString()
        };

        return { article: _data };
      },
      writable: true,
      configurable: true
    }
  });

  return MyArticle;
})();

module.exports = MyArticle;