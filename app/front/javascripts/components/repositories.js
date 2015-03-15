var Arda = require('arda');
var RepositoryItem = require('./repository_item');

class Repositories extends Arda.Component {
  render() {
    return (
      <div className="repositories-container">
        {this.props.repositories.map((repository) => {
          return <RepositoryItem url={repository.html_url} name={repository.name} description={repository.description} />;
        })}
      </div>
    )
  }
}

module.exports = Repositories
