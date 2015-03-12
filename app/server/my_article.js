var axios = require('axios')

class MyArticle {
  constructor() {
    this.origin = "https://api.github.com"
  }

  fetchIndex() {
    var path = `/repos/${process.env['GITHUB_USER_NAME']}/hdemon-articles/contents/articles`
    return axios.get(this.origin + path)
      .then((response) => {
        return response.data
      })
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
