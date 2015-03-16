var Arda = require('arda')

class RepositoryItem extends Arda.Component {
  render() {
    return (
      <a className="repository-item" href={this.props.url} target="_blank">
        <p className="name">{this.props.name}</p>
        <span>{this.props.description}</span>
        <span className="stars">
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" width="12" height="12" viewBox="0 0 32 32">
            <path d="M32 12.408l-11.056-1.607-4.944-10.018-4.944 10.018-11.056 1.607 8 7.798-1.889 11.011 9.889-5.199 9.889 5.199-1.889-11.011 8-7.798zM16 23.547l-6.983 3.671 1.334-7.776-5.65-5.507 7.808-1.134 3.492-7.075 3.492 7.075 7.807 1.134-5.65 5.507 1.334 7.776-6.983-3.671z" fill="#444444"></path>
          </svg>
          {this.props.stargazersCount}
        </span>
      </a>
    );
  }
}

module.exports = RepositoryItem
