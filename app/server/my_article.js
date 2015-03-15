var axios = require('axios')
var Promise = require('bluebird')
var _ = require('lodash')
var Cache = require('./cache')

class MyArticle {
  constructor() {
    this.origin = "https://api.github.com"
    this.indexCache = new Cache
    this.articleCache = {}
  }

  fetchIndex() {
    if (this.indexCache.hasExpired()) {
      var path = `/repos/${process.env['GITHUB_USER_NAME']}/hdemon-articles/contents/articles`
      return axios.get(this.origin + path)
        .then((response) => {
          var data = this.formArticleIndexData(response.data)
          this.indexCache.set(data)
          return this.wrapWithMetaInfo(null, data)
        })
    } else {
      return Promise.resolve(this.wrapWithMetaInfo(null, this.indexCache.get()))
    }
  }

  fetch(name) {
    if (_.isUndefined(this.articleCache[name])) {
      this.articleCache[name] = new Cache
    }

    if (this.articleCache[name].hasExpired()) {
      var path = `/repos/${process.env['GITHUB_USER_NAME']}/hdemon-articles/contents/articles/${encodeURIComponent(name)}`
      return axios.get(this.origin + path)
        .then((response) => {
          var data = this.formArticleData(response.data)
          this.articleCache[name].set(data)
          return this.wrapWithMetaInfo(null, data)
        })
    } else {
      return Promise.resolve(this.wrapWithMetaInfo(null, this.articleCache[name].get()))
    }
  }

  wrapWithMetaInfo(err, data) {
    return {
      messages: err,
      data: data
    }
  }

  formArticleIndexData(data) {
    var _data = data.map((item) => {
      return {
        name: item.name,
        title: item.name.match(/.*(?=_.*)/)[0],
        publish_date: item.name.match(/[0-9\-]{10}(?=\.md)/)[0]
      }
    })

    return { articles: _data }
  }

  formArticleData(data) {
    var _data = {
      name: data.name,
      title: data.name.match(/.*(?=_.*)/)[0],
      publish_date: data.name.match(/[0-9\-]{10}(?=\.md)/)[0],
      content: new Buffer(data.content, 'base64').toString()
    }

    return { article: _data }
  }
}

module.exports = MyArticle
