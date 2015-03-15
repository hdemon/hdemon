var Arda = require('arda');
var Header = require('./header'),
    ArticleContent = require('./article_content');

class ArticleContextComponent extends Arda.Component {
  render() {
    var article = this.context.shared.state.article;
    var content = {}

    if (article) {
      content = <ArticleContent article={article}/>
    } else {
      content = <div></div>
    }

    return (
      <div>
        <Header />
        {content}
      </div>
    )
  }
}

module.exports = ArticleContextComponent
