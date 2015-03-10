var Arda = require('arda');
var Navigation = require('./navigation'),
    ArticleContent = require('./article_content');

class ArticleContextComponent extends Arda.Component {
  render() {
    var article = this.context.shared.state.article;
    var articleContent = {}

    if (article) {
      articleContent = <ArticleContent article={article}/>
    } else {
      articleContent = <div></div>
    }

    return (
      <div>
        <Navigation />
        {articleContent}
      </div>
    )
  }
}

module.exports = ArticleContextComponent
