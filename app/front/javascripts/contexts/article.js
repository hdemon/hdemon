var _ = require('lodash'),
    Arda = require('arda'),
    page = require('page'),
    axios = require('axios'),
    marked = require('marked');
var ArticleContextComponent = require('../components/article_context_component');
var MainContext = require('../contexts/main');

class ArticleContext extends MainContext {
  contextCreated() {
    var name = encodeURIComponent(this.props.params.name);
    axios.get('/api/articles/' + name).then((response) => {
      var article = response.data.data.article;
      var compiledArticle = this.compile(article)
      this.update((s) => { return {article: compiledArticle} })
      this.changeTitle(article.title)
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
