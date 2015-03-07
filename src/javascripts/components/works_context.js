var Arda = require('arda');
var Navigation = require('./navigation'),
    Repositories = require('./repositories');

class WorksContext extends Arda.Component {
  render() {
    var repositories = this.context.shared.state.repositories;
    var reposComponent = {}

    if (repositories) {
      reposComponent = <Repositories repositories={repositories}/>
    } else {
      reposComponent = <div></div>
    }

    return (
      <div>
        <Navigation />
        {reposComponent}
      </div>
    )
  }
}

module.exports = WorksContext
