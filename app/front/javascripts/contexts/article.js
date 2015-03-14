var _ = require('lodash'),
    Arda = require('arda'),
    page = require('page'),
    axios = require('axios');
var ArticleContextComponent = require('../components/article_context_component');

class ArticleContext extends Arda.Context {
  delegate(subscribe) {
    super.delegate()
    subscribe('context:created', () => {
      var name = encodeURIComponent(this.props.params.name);
      axios.get('/api/articles/' + name).then((response) => {
        var article = response.data.data;
        this.update((s) => { return {article: article} })
      })
    })

    subscribe('navigation:clickWorksButton', () => {
      page('/works')
    })
    subscribe('navigation:clickArticlesButton', () => {
      page('/articles')
    })
  }
}
ArticleContext.component = ArticleContextComponent;

module.exports = ArticleContext
