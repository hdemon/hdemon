window.React = require('react');
window.Promise = require('ypromise');
var Arda = require('arda'),
    page = require('page')
var WorksContext = require('./contexts/works'),
    ArticlesContext = require('./contexts/articles')

window.addEventListener('DOMContentLoaded', () => {
  var router = new Arda.Router(Arda.DefaultLayout, document.querySelector('#app'))

  page.start({hashbang: true})
  page('/articles', () => { router.pushContext(ArticlesContext, {}) })
  page('/works', () => { router.pushContext(WorksContext, {}) })
  page('/articles')
});
