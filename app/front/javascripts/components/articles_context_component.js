var Arda = require('arda');
var Header = require('./header'),
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
        <Header />
        {content}
      </div>
    )
  }
}

module.exports = ArticlesContextComponent
