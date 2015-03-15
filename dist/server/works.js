"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var axios = require("axios");
var _ = require("lodash");
var Cache = require("./cache");

var Works = (function () {
  function Works() {
    _classCallCheck(this, Works);

    this.origin = "https://api.github.com";
    this.rawCache = {};
    this.responseCache = new Cache();
  }

  _prototypeProperties(Works, null, {
    fetchIndex: {
      value: function fetchIndex() {
        var _this = this;

        if (this.responseCache.hasExpired()) {
          var reposArray = [];
          return this._fetchIndex().then(function (data) {
            _this.responseCache.set(data);
            return _this.wrapWithMetaInfo(null, data);
          });
        } else {
          return Promise.resolve(this.wrapWithMetaInfo(null, this.responseCache.get()));
        }
      },
      writable: true,
      configurable: true
    },
    _fetchIndex: {
      value: function _fetchIndex() {
        var _this = this;

        return new Promise(function (resolve, reject) {
          _this._fetchPaginatedReposRecursively().then(function (_reposArray) {
            resolve(_this._formReposData(_this._filterDisplayItem(_reposArray)));
          });
        });
      },
      writable: true,
      configurable: true
    },
    _fetchPaginatedReposRecursively: {
      value: function _fetchPaginatedReposRecursively() {
        var _this = this;

        return new Promise(function (resolve, reject) {
          var reposArray = [];
          var func = function (page) {
            _this._fetchPaginatedRepos(page).then(function (data) {
              if (!_.isEmpty(data.data)) {
                reposArray = reposArray.concat(_this._formPaginatedReposData(data.data));
                func(page + 1);
              } else {
                resolve(reposArray);
              }
            });
          };

          func(1);
        });
      },
      writable: true,
      configurable: true
    },
    _fetchPaginatedRepos: {
      value: function _fetchPaginatedRepos(page) {
        var _this = this;

        if (_.isUndefined(this.rawCache[page])) {
          this.rawCache[page] = new Cache();
        }

        return new Promise(function (resolve, reject) {
          if (_this.rawCache[page].hasExpired()) {
            var path = "/users/" + process.env.GITHUB_USER_NAME + "/repos?type=owner&page=" + page;
            return axios.get(_this.origin + path).then(function (response) {
              _this.rawCache[page].set(response);
              resolve(_this.rawCache[page].get());
            });
          } else {
            resolve(_this.rawCache[page].get());
          }
        });
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
    _formReposData: {
      value: function _formReposData(data) {
        return { repositories: data };
      },
      writable: true,
      configurable: true
    },
    _formPaginatedReposData: {
      value: function _formPaginatedReposData(data) {
        var _data = data.map(function (item) {
          return {
            name: item.name,
            description: item.description,
            html_url: item.html_url,
            stargazers_count: item.stargazers_count
          };
        });

        return _data;
      },
      writable: true,
      configurable: true
    },
    _filterDisplayItem: {
      value: function _filterDisplayItem(reposArray) {
        return _.filter(reposArray, function (item) {
          return item.description.match(/\s{3}$/);
        });
      },
      writable: true,
      configurable: true
    }
  });

  return Works;
})();

module.exports = Works;