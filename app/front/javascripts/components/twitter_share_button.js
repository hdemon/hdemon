var Arda = require('arda');

class TwitterShareButton extends Arda.Component {
  render() {
    return <a href="https://twitter.com/share" className="twitter-share-button">Tweet</a>
  }

  componentDidMount() {
    // Remove recent script node because the script has no effect for the button rendered after the script.
    var scriptNode = document.getElementById('twitter-wjs')
    if (scriptNode) {
      scriptNode.parentNode.removeChild(scriptNode)
    }

    // initialize twitter share button (copied from official)
    !function(d,s,id){
      var js,
          fjs=d.getElementsByTagName(s)[0],
          p=/^http:/.test(d.location)?'http':'https';
      if(!d.getElementById(id)){
        js=d.createElement(s);
        js.id=id;
        js.src=p+'://platform.twitter.com/widgets.js';
        fjs.parentNode.insertBefore(js,fjs);
      }
    }(document, 'script', 'twitter-wjs');
  }
}

module.exports = TwitterShareButton
