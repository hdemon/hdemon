var Arda = require('arda'),
    page = require('page')
var TwitterShareButton = require('./twitter_share_button'),
    HatebuButton = require('./hatebu_button')

class ArticleContent extends Arda.Component {
  render() {
    return (
      <div className="article-container">
        <div dangerouslySetInnerHTML={{__html: this.props.article.content}}></div>
        <div className="share-buttons-container">
          <TwitterShareButton />
          <HatebuButton />
        </div>
      </div>
    );
  }
}

module.exports = ArticleContent
