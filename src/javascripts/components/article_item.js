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
      <div>
        <span onClick={this.showArticle.bind(this)}>{this.props.title}</span>
        <span>{this.props.publishDate}</span>
      </div>
    );
  }
}

module.exports = ArticleItem
