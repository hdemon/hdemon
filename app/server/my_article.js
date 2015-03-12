var axios = require('axios')
var Promise = require('bluebird')
var Cache = require('./cache')

class MyArticle {
  constructor() {
    this.origin = "https://api.github.com"
    this.indexCache = new Cache
  }

  fetchIndex() {
    if (this.indexCache.hasExpired()) {
      var path = `/repos/${process.env['GITHUB_USER_NAME']}/hdemon-articles/contents/articles`
      return axios.get(this.origin + path)
        .then((response) => {
          this.indexCache.set(response.data)
          return response.data
        })
    } else {
      return Promise.resolve(this.indexCache.get())
    }
  }

  fetch(name) {
    var path = `/repos/${process.env['GITHUB_USER_NAME']}/hdemon-articles/contents/articles/${encodeURIComponent(name)}`
    return axios.get(this.origin + path)
      .then((response) => {
        return response.data
      })
  }
}

module.exports = MyArticle
