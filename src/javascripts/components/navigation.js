var Arda = require('arda')

class Navigation extends Arda.Component {
  onClickWorksButton() {
    this.dispatch('navigation:clickWorksButton')
  }

  onClickArticlesButton() {
    this.dispatch('navigation:clickArticlesButton')
  }

  render() {
    return (
      <nav>
        <div className="works button" onClick={this.onClickWorksButton.bind(this)}>works</div>
        <div className="articles button" onClick={this.onClickArticlesButton.bind(this)}>articles</div>
      </nav>
    );
  }
}

module.exports = Navigation
