var Arda = require('arda'),
    page = require('page')
var TwitterShareButton = require('./twitter_share_button')

class ArticleContent extends Arda.Component {
  render() {
    return (
      <div className="article-content">
        <span dangerouslySetInnerHTML={{__html: this.props.article.content}}></span>
        <TwitterShareButton />
      </div>
    );
  }
}

module.exports = ArticleContent
