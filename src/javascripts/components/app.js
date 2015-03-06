var React = require('react'),
    _ = require('lodash'),
    axios = require('axios');

var RepositoryItem = React.createClass({
  render: function() {
    return (
      <div>
        <a href={this.props.url}>{this.props.name}</a>
        <span>{this.props.description}</span>
      </div>
    );
  }
});

var ArticleItem = React.createClass({
  render: function() {
    return (
      <div>
        <span>{this.props.title}</span>
        <span>{this.props.publishDate}</span>
      </div>
    );
  }
});

var App = React.createClass({
  getInitialState: function() {
    return {repositories: [], articles: []};
  },

  componentDidMount: function() {
    axios.get('https://hdemon-backend.herokuapp.com/api/repositories').then((response) => {
      var repositories = response.data.data;
      repositories = _.sortBy(repositories, (repository) => { return repository.stargazers_count; }).reverse();
      this.setState({ repositories: repositories });
    });

    axios.get('https://hdemon-backend.herokuapp.com/api/articles').then((response) => {
      var articles = response.data.data;
      this.setState({ articles: articles });
    });

    this.setState({ context: 'articles' });
  },

  repositories: function() {
    return this.state.repositories.map((repository) => {
      return <RepositoryItem url={repository.html_url} name={repository.name} description={repository.description} />;
    });
  },

  articles: function() {
    return this.state.articles.map((article) => {
      return <ArticleItem title={article.title} publishDate={article.publish_date} />;
    });
  },

  onClickArticlesButton: function() {
    this.setState({ context: 'articles' });
  },

  onClickWorksButton: function() {
    this.setState({ context: 'works' });
  },

  render: function() {
    var contents = "";

    switch (this.state.context) {
      case 'works':
        contents = this.repositories();
        break;
      case 'articles':
        contents = this.articles();
        break;
      default:
        contents = this.repositories();
        break;
    }

    return (
      <div>
        <div onClick={this.onClickWorksButton}>works</div>
        <div onClick={this.onClickArticlesButton}>articles</div>
        {contents}
      </div>
    )
  }
});

module.exports = App;
