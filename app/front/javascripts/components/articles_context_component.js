var Arda = require('arda');
var Navigation = require('./navigation'),
    Articles = require('./articles');

class ArticlesContextComponent extends Arda.Component {
  render() {
    var articles = this.context.shared.state.articles;
    var content = {}

    if (articles) {
      content = <Articles articles={articles}/>
    } else {
      content = <div></div>
    }

    return (
      <div>
        <Navigation />
        {content}
      </div>
    )
  }
}

module.exports = ArticlesContextComponent
