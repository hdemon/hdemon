var _ = require('lodash'),
    Arda = require('arda'),
    page = require('page'),
    axios = require('axios'),
    marked = require('marked');
var ArticleContextComponent = require('../components/article_context_component');

class ArticleContext extends Arda.Context {
  delegate(subscribe) {
    super.delegate()
    subscribe('context:created', () => {
      var name = encodeURIComponent(this.props.params.name);
      axios.get('/api/articles/' + name).then((response) => {
        var article = response.data.data.article;
        this.changeTitle(article.title)
        var compiledArticle = this.compile(article)
        this.update((s) => { return {article: compiledArticle} })
      })
    })

    subscribe('navigation:clickWorksButton', () => {
      page('/works')
    })
    subscribe('navigation:clickArticlesButton', () => {
      page('/articles')
    })
  }

  compile(article) {
    var _article = article

    marked.setOptions({
      gfm: true,
    });

    _article.content = marked(article.content)
    return _article
  }

  changeTitle(title) {
    var titleNode = document.querySelector("title")
    titleNode.innerText = title + " - hdemon"
  }
}
ArticleContext.component = ArticleContextComponent;

module.exports = ArticleContext
