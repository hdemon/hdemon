var React = require('react'),
    App = require('./components/app');

React.render(
  React.createFactory(App)(),
  document.getElementById('app')
);
