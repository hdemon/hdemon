var _ = require('lodash'),
    Arda = require('arda'),
    page = require('page'),
    axios = require('axios');
var WorksContextComponent = require('../components/works_context_component');

class WorksContext extends Arda.Context {
  delegate(subscribe) {
    super.delegate()
    subscribe('context:created', () => {
      axios.get('/api/works').then((response) => {
        console.log(response.data.data);
        var repositories = response.data.data.repositories;
        repositories = _.sortBy(repositories, (repository) => { return repository.stargazers_count; }).reverse();
        this.update((s) => { return {repositories: repositories} })
      })
    })

    subscribe('navigation:clickWorksButton', () => {
      page('/works')
    })
    subscribe('navigation:clickArticlesButton', () => {
      page('/articles')
    })
  }
}
WorksContext.component = WorksContextComponent;

module.exports = WorksContext
