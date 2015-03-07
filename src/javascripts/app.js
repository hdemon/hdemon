window.React = require('react');
window.Promise = require('ypromise');
var Arda = require('arda');
var RepositoriesContext = require('./contexts/repositories')

window.addEventListener('DOMContentLoaded', () => {
  var router = new Arda.Router(Arda.DefaultLayout, document.querySelector('#app'))
  router.pushContext(RepositoriesContext, {})
  // router.pushContext(ArticlesContext, {})
});
