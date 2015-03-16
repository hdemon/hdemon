var _ = require('lodash'),
    Arda = require('arda'),
    page = require('page'),
    axios = require('axios');
var ArticlesContextComponent = require('../components/articles_context_component');
var MainContext = require('../contexts/main');

class ArticlesContext extends MainContext {
  contextCreated() {
    axios.get('/api/articles').then((response) => {
      var articles = response.data.data.articles;
      this.update((s) => { return {articles: articles} })
      this.changeTitle()
    })
  }
}
ArticlesContext.component = ArticlesContextComponent;

module.exports = ArticlesContext
