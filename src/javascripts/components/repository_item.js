var Arda = require('arda')

class RepositoryItem extends Arda.Component {
  render() {
    return (
      <div>
        <a href={this.props.url}>{this.props.name}</a>
        <span>{this.props.description}</span>
      </div>
    );
  }
}

module.exports = RepositoryItem
