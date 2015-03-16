var _ = require('lodash'),
    Arda = require('arda'),
    page = require('page'),
    axios = require('axios');

class MainContext extends Arda.Context {
  delegate(subscribe) {
    super.delegate()
    subscribe('context:created', this.contextCreated)
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

module.exports = MainContext
