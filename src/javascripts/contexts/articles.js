var _ = require('lodash'),
    Arda = require('arda'),
    axios = require('axios');
var ArticlesContextComponent = require('../components/articles_context_component');

class ArticlesContext extends Arda.Context {
  delegate(subscribe) {
    super.delegate()
    subscribe('context:created', () => {
      axios.get('https://hdemon-backend.herokuapp.com/api/articles').then((response) => {
        var articles = response.data.data;
        this.update((s) => { return {articles: articles} })
      })
    })

    subscribe('navigation:clickWorksButton', () => {
    })
    subscribe('navigation:clickArticlesButton', () => {
    })
  }
}
ArticlesContext.component = ArticlesContextComponent;

module.exports = ArticlesContext
