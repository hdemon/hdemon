var Arda = require('arda')

class ArticleItem extends Arda.Component {
  propTypes: {
    showArticle: React.PropTypes.func.isRequired
  }

  showArticle() {
    this.props.showArticle(this.props.name);
  }

  render() {
    return (
      <div>
        <span onClick={this.showArticle}>{this.props.title}</span>
        <span>{this.props.publishDate}</span>
      </div>
    );
  }
}

module.exports = ArticleItem
