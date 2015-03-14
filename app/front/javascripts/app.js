window.React = require('react');
window.Promise = require('ypromise');
var Arda = require('arda'),
    page = require('page')
var WorksContext = require('./contexts/works'),
    ArticlesContext = require('./contexts/articles'),
    ArticleContext = require('./contexts/article')

window.addEventListener('DOMContentLoaded', () => {
  var router = new Arda.Router(Arda.DefaultLayout, document.querySelector('#app'))

  page('/', () => { router.pushContext(ArticlesContext, {}) })
  page('/articles', () => { router.pushContext(ArticlesContext, {}) })
  page('/articles/:name', (context) => { router.pushContext(ArticleContext, context) })
  page('/works', () => { router.pushContext(WorksContext, {}) })
  page.start()
});
