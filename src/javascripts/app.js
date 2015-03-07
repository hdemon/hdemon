window.React = require('react');
window.Promise = require('ypromise');
var Arda = require('arda');
var WorksContext = require('./contexts/works'),
    ArticlesContext = require('./contexts/articles')

window.addEventListener('DOMContentLoaded', () => {
  var router = new Arda.Router(Arda.DefaultLayout, document.querySelector('#app'))
  // router.pushContext(WorksContext, {})
  router.pushContext(ArticlesContext, {})
});
