var Arda = require('arda'),
    page = require('page')

class ArticleContent extends Arda.Component {
  render() {
    return (
      <div>
        <span>{this.props.article.content}</span>
      </div>
    );
  }
}

module.exports = ArticleContent
