var _ = require('lodash'),
    Arda = require('arda'),
    page = require('page'),
    axios = require('axios');
var ArticlesContextComponent = require('../components/articles_context_component');

class ArticlesContext extends Arda.Context {
  delegate(subscribe) {
    super.delegate()
    subscribe('context:created', () => {
      axios.get('/api/articles').then((response) => {
        var articles = response.data.data.articles;
        this.update((s) => { return {articles: articles} })
        this.changeTitle()
      })
    })

    subscribe('navigation:clickWorksButton', () => {
      page('/works')
    })
    subscribe('navigation:clickArticlesButton', () => {
      page('/articles')
    })
  }

  changeTitle(title) {
    var titleNode = document.querySelector("title")
    titleNode.innerText = "hdemon.info"
  }
}
ArticlesContext.component = ArticlesContextComponent;

module.exports = ArticlesContext
