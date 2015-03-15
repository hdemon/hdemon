var Arda = require('arda')

class Slides extends Arda.Component {
  render() {
    return (
      <div className="slides-container">
        <div id="slide-1" className="slide">
        </div>
      </div>
    );
  }

  componentDidMount() {
    var script = document.createElement('script');
    script.src = "//speakerdeck.com/assets/embed.js"
    script.setAttribute("data-id", "72a01620d1010131678c468f47768a35")
    script.setAttribute("data-ratio", "1.33333333333333")
    script.classList.add("speakerdeck-embed")
    var slide1Node = document.getElementById("slide-1")

    slide1Node.appendChild(script)
  }
}

module.exports = Slides
