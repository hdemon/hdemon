var _ = require('lodash'),
    Arda = require('arda'),
    axios = require('axios');
var WorksContextComponent = require('../components/works_context');

class WorksContext extends Arda.Context {
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
WorksContext.component = WorksContextComponent;

module.exports = WorksContext
