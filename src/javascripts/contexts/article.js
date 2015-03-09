var _ = require('lodash'),
    Arda = require('arda'),
    axios = require('axios');
var ArticleContextComponent = require('../components/article_context_component');

class ArticleContext extends Arda.Context {
  delegate(subscribe) {
    super.delegate()
    subscribe('context:created', () => {
      var name = encodeURIComponent(this.props.params.name);
      axios.get('https://hdemon-backend.herokuapp.com/api/articles/' + name).then((response) => {
        var article = response.data.data;
        this.update((s) => { return {article: article} })
      })
    })

    subscribe('navigation:clickWorksButton', () => {
    })
    subscribe('navigation:clickArticlesButton', () => {
    })
  }
}
ArticleContext.component = ArticleContextComponent;

module.exports = ArticleContext
