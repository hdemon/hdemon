var React = require('react');

var DisplayItem = React.createClass({
  render: function() {
    return <div>app</div>;
  }
});

var App = React.createClass({
  render: function() {
    return <DisplayItem />;
  }
});

module.exports = App;
