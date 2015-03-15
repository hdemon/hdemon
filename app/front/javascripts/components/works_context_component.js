var Arda = require('arda');
var Header = require('./header'),
    Repositories = require('./repositories');

class WorksContextComponent extends Arda.Component {
  render() {
    var repositories = this.context.shared.state.repositories;
    var content = {}

    if (repositories) {
      content = <Repositories repositories={repositories}/>
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
