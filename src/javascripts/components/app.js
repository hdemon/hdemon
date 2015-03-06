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
  propTypes: {
    showArticle: React.PropTypes.func.isRequired
  },

  showArticle: function() {
    this.props.showArticle(this.props.name);
  },

  render: function() {
    return (
      <div>
        <span onClick={this.showArticle}>{this.props.title}</span>
        <span>{this.props.publishDate}</span>
      </div>
    );
  }
});

var Article = React.createClass({
  render: function() {
    return (
      <div>
        {this.props.content}
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
      return <ArticleItem name={article.name} title={article.title} publishDate={article.publish_date} showArticle={this.showArticle}/>;
    });
  },

  article: function() {
    return <Article name={this.state.article.name} content={this.state.article.content}/>;
  },

  showArticle: function(name) {
    axios.get('https://hdemon-backend.herokuapp.com/api/articles/' + name).then((response) => {
      var article = response.data.data;
      this.setState({ article: article });
      this.setState({ context: 'article' });
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
      case 'article':
        contents = this.article(this.state.article);
        break;
      default:
        contents = this.repositories();
        break;
    }

    return (
      <div>
        <nav>
          <div onClick={this.onClickWorksButton}>works</div>
          <div onClick={this.onClickArticlesButton}>articles</div>
        </nav>
        {contents}
      </div>
    )
  }
});

module.exports = App;
