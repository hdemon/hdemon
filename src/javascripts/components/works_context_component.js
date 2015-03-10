var Arda = require('arda');
var Navigation = require('./navigation'),
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
        <Navigation />
        {content}
      </div>
    )
  }
}

module.exports = WorksContextComponent
