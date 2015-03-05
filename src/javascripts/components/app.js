var React = require('react'),
    axios = require('axios');

var DisplayItem = React.createClass({
  render: function() {
    return (
      <div>
        <a href={this.props.url}>{this.props.name}</a>;
        <span>{this.props.description}</span>
      </div>
    );
  }
});

var App = React.createClass({
  getInitialState: function() {
    return {repositories: []};
  },

  componentDidMount: function() {
    axios.get('https://hdemon-backend.herokuapp.com/api/repositories').then((response) => {
      this.setState({ repositories: response.data.data });
    })
  },

  render: function() {
    var repositories = this.state.repositories.map((repository) => {
      return <DisplayItem url={repository.html_url} name={repository.name} description={repository.description} />;
    });

    return (
      <div>
        {repositories}
      </div>
    )
  }
});

module.exports = App;
