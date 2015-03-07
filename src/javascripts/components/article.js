var Arda = require('arda')

class Article extends Arda.Component {
  render() {
    return (
      <div>
        {this.props.content}
      </div>
    );
  }
}

module.exports = Article
