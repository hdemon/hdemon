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
        var repositories = response.data.data.repositories;
        repositories = _.sortBy(repositories, (repository) => { return repository.stargazers_count; }).reverse();
        this.update((s) => { return {repositories: repositories} })
        this.changeTitle()
      })
    })

    subscribe('navigation:clickWorksButton', () => {
      page('/works')
    })
    subscribe('navigation:clickArticlesButton', () => {
      page('/articles')
    })
  }

  changeTitle(title) {
    var titleNode = document.querySelector("title")
    titleNode.innerText = "hdemon.info"
  }
}
WorksContext.component = WorksContextComponent;

module.exports = WorksContext
