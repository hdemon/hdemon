var Arda = require('arda')

class HatebuButton extends Arda.Component {
  render() {
    return (
      <div className="hatebu-button-container">
        <a href="http://b.hatena.ne.jp/entry/hdemon.herokuapp.com" class="hatena-bookmark-button" data-hatena-bookmark-title="hdemon" data-hatena-bookmark-layout="simple-balloon" title="このエントリーをはてなブックマークに追加">
          <img src="https://b.st-hatena.com/images/entry-button/button-only@2x.png" alt="このエントリーをはてなブックマークに追加" width="20" height="20" style="border: none;" />
        </a>
      </div>
    );
  }

  componentDidMount() {
    var cntainerNode = document.querySelector('.hatebu-button-container')
    cntainerNode.appendChild(this.createScriptNode())
  }

  createScriptNode(id) {
    var script = document.createElement('script');
    script.src = "https://b.st-hatena.com/js/bookmark_button.js"
    script.setAttribute("async", "async")
    return script
  }
}

module.exports = Slides
