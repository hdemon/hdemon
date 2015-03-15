var Arda = require('arda'),
    page = require('page')

class ArticleItem extends Arda.Component {
  propTypes: {
    showArticle: React.PropTypes.func.isRequired
  }

  showArticle() {
    var path = '/articles/' + encodeURIComponent(this.props.name)
    page(path)
  }

  render() {
    return (
      <div className="article-item" onClick={this.showArticle.bind(this)}>
        <p className="title">{this.props.title}</p>
        <p>{this.props.publishDate}</p>
      </div>
    );
  }
}

module.exports = ArticleItem
