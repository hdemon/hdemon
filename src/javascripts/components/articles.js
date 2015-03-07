var Arda = require('arda');
var ArticleItem = require('./article_item');

class Articles extends Arda.Component {
  render() {
    console.log(this);
    return (
      <div>
        {this.props.articles.map((article) => {
          return <ArticleItem title={article.title} publishDate={article.publish_date} />;
        })}
      </div>
    )
  }
}

module.exports = Articles
