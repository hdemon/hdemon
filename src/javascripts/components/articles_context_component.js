var Arda = require('arda');
var Navigation = require('./navigation'),
    Articles = require('./articles');

class ArticlesContextComponent extends Arda.Component {
  render() {
    var articles = this.context.shared.state.articles;
    var articlesComponent = {}

    if (articles) {
      articlesComponent = <Articles articles={articles}/>
    } else {
      articlesComponent = <div></div>
    }

    return (
      <div>
        <Navigation />
        {articlesComponent}
      </div>
    )
  }
}

module.exports = ArticlesContextComponent
