var Arda = require('arda')

class Slides extends Arda.Component {
  constructor() {
    this.slideIds = [
      "72a01620d1010131678c468f47768a35"
    ]
  }
  render() {
    return (
      <div className="slides-container"></div>
    );
  }

  componentDidMount() {
    var slidesContainerNode = document.querySelector('.slides-container')
    this.slideIds.forEach((id, index) => {
      var slideNode = document.createElement('div')
      slideNode.id = `slide-${index}`
      slideNode.classList.add("slide")
      slideNode.appendChild(this.createSlideNode(id))
      slidesContainerNode.appendChild(slideNode)
    })
  }

  createSlideNode(id) {
    var script = document.createElement('script');
    script.src = "//speakerdeck.com/assets/embed.js"
    script.setAttribute("data-id", id)
    script.setAttribute("data-ratio", "1.33333333333333")
    script.classList.add("speakerdeck-embed")
    return script
  }
}

module.exports = Slides
