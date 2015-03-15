var axios = require('axios')
var _ = require('lodash')
var Cache = require('./cache')

class Works {
  constructor() {
    this.origin = "https://api.github.com"
    this.rawCache = {}
    this.responseCache = new Cache
  }

  fetchIndex() {
    if (this.responseCache.hasExpired()) {
      var reposArray = []
      return this._fetchIndex()
        .then((data) => {
          this.responseCache.set(data)
          return this.wrapWithMetaInfo(null, data)
        })
    } else {
      return Promise.resolve(this.wrapWithMetaInfo(null, this.responseCache.get()))
    }
  }

  _fetchIndex() {
    return new Promise((resolve, reject) => {
      this._fetchPaginatedReposRecursively().then((_reposArray) => {
        resolve(this._formReposData(this._filterDisplayItem(_reposArray)))
      })
    })
  }

  _fetchPaginatedReposRecursively() {
    return new Promise((resolve, reject) => {
      var reposArray = []
      var func = (page) => {
        this._fetchPaginatedRepos(page).then((data) => {
          if (!_.isEmpty(data.data)) {
            reposArray = reposArray.concat(this._formPaginatedReposData(data.data))
            func((page + 1))
          } else {
            resolve(reposArray)
          }
        })
      }

      func(1)
    })
  }

  _fetchPaginatedRepos(page) {
    if (_.isUndefined(this.rawCache[page])) {
      this.rawCache[page] = new Cache
    }

    return new Promise((resolve, reject) => {
      if (this.rawCache[page].hasExpired()) {
        var path = `/users/${process.env['GITHUB_USER_NAME']}/repos?type=owner&page=${page}`
        return axios.get(this.origin + path)
          .then((response) => {
            this.rawCache[page].set(response)
            resolve(this.rawCache[page].get())
          })
      } else {
        resolve(this.rawCache[page].get())
      }
    })
  }

  wrapWithMetaInfo(err, data) {
    return {
      messages: err,
      data: data
    }
  }

  _formReposData(data) {
    return { repositories: data }
  }

  _formPaginatedReposData(data) {
    var _data = data.map((item) => {
      return {
        name: item.name,
        description: item.description,
        html_url: item.html_url,
        stargazers_count: item.stargazers_count
      }
    })

    return _data
  }

  _filterDisplayItem(reposArray) {
    return _.filter(reposArray, (item) => {
      return item.description.match(/\s{3}$/)
    })
  }
}

module.exports = Works
