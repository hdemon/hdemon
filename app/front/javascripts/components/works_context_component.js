var Arda = require('arda');
var Header = require('./header'),
    Repositories = require('./repositories'),
    Slides = require('./slides');

class WorksContextComponent extends Arda.Component {
  render() {
    var repositories = this.context.shared.state.repositories;
    var content = {}

    if (repositories) {
      content = (
        <div>
          <Repositories repositories={repositories}/>
          <Slides />
        </div>
      )
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

module.exports = WorksContextComponent
