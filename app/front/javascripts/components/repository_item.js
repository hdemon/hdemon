var Arda = require('arda')

class RepositoryItem extends Arda.Component {
  render() {
    return (
      <a className="repository-item" href={this.props.url}>
        <p className="name">{this.props.name}</p>
        <p>{this.props.description}</p>
      </a>
    );
  }
}

module.exports = RepositoryItem
