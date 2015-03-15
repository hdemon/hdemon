var Arda = require('arda')

class Header extends Arda.Component {
  onClickWorksButton() {
    this.dispatch('navigation:clickWorksButton')
  }

  onClickArticlesButton() {
    this.dispatch('navigation:clickArticlesButton')
  }

  render() {
    return (
      <div className="header">
        <div className="title">hdemon</div>
        <nav>
          <div className="works navigation-button" onClick={this.onClickWorksButton.bind(this)}>works</div>
          <div className="articles navigation-button" onClick={this.onClickArticlesButton.bind(this)}>articles</div>
        </nav>
      </div>
    );
  }
}

module.exports = Header
