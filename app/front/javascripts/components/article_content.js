var Arda = require('arda'),
    page = require('page')

class ArticleContent extends Arda.Component {
  render() {
    return (
      <div className="article-content">
        <span>{this.props.article.content}</span>
      </div>
    );
  }
}

module.exports = ArticleContent
