var fs = require('fs')
var express = require('express')
var compression = require('compression')
var MyArticle = require('./my_article')
var Works = require('./works')
var app = express()

app.set('port', (process.env.PORT || 5000));
app.use(compression())
app.use('/public', express.static(__dirname + '/../front'));

var myArticle = new MyArticle;
var works = new Works;

var respondApp = (request, response) => {
  fs.readFile(__dirname + '/../front/index.html', (err, data) => {
    response.type('html')
    response.send(data)
  })
}

app.get('/', respondApp)
app.get('/articles', respondApp)
app.get('/articles/:name', respondApp)
app.get('/works', respondApp)

app.get('/api/articles', function(request, response) {
  myArticle.fetchIndex().then((data) => {
    response.send(data);
  });
});

app.get('/api/articles/:name', function(request, response) {
  myArticle.fetch(request.params.name).then((data) => {
    response.send(data);
  });
});

app.get('/api/works', function(request, response) {
  works.fetchIndex().then((data) => {
    response.send(data);
  });
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
});
