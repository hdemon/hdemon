var _ = require('lodash'),
    Arda = require('arda'),
    axios = require('axios');
var RepositoriesContextComponent = require('../components/repositories_context_component');

class RepositoriesContext extends Arda.Context {
  delegate(subscribe) {
    super.delegate()
    subscribe('context:created', () => {
      axios.get('https://hdemon-backend.herokuapp.com/api/repositories').then((response) => {
        var repositories = response.data.data;
        repositories = _.sortBy(repositories, (repository) => { return repository.stargazers_count; }).reverse();
        this.update((s) => { return {repositories: repositories} })
      })
    })

    subscribe('navigation:clickWorksButton', () => {
    })
    subscribe('navigation:clickArticlesButton', () => {
    })
  }
}
RepositoriesContext.component = RepositoriesContextComponent;

module.exports = RepositoriesContext
