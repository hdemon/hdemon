var _ = require('lodash'),
    Arda = require('arda'),
    page = require('page'),
    axios = require('axios');
var WorksContextComponent = require('../components/works_context_component');
var MainContext = require('../contexts/main');

class WorksContext extends MainContext {
  contextCreated() {
    axios.get('/api/works').then((response) => {
      var repositories = response.data.data.repositories;
      repositories = _.sortBy(repositories, (repository) => { return repository.stargazers_count; }).reverse();
      this.update((s) => { return {repositories: repositories} })
      this.changeTitle()
    })
  }
}
WorksContext.component = WorksContextComponent;

module.exports = WorksContext
