import React, { Component } from "react"
import "./progress-bar.scss"

export default class ProgressBar extends Component {
  constructor(props) {
    super(props)
  }

  state = {
    progress: 0,
  }

  componentDidMount() {
    window.onscroll = () => {
      var winScroll =
        document.body.scrollTop || document.documentElement.scrollTop
      var height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight
      var scrolled = (winScroll / height) * 100
      this.setState({
        progress: scrolled,
      })
    }
  }

  handleScrollJump = () => {
    console.log("JUMP TO ")
  }

  render() {
    const { progress } = this.state // in percentage whole numbers
    const { sections } = this.props
    const bar_height = 30 //rem

    var totalSections = 0

    sections.forEach(section => {
      totalSections += section.stepCount
    })

    var section_percentage_accumulate = 0

    sections.forEach(section => {
      const percentage = section.stepCount / totalSections
      section_percentage_accumulate += percentage
      section.section_percentage = section_percentage_accumulate
    })

    return (
      <div className="progress-bar">
        <div
          className="progress-dot"
          style={{ top: `${(progress / 100) * bar_height}rem` }}
        ></div>
        <div className="progress-step" id="starter-progress-step"></div>
        <div className="sections">
          {sections.map((section, idx) => {
            return (
              <a
                key={`progress-${idx}`}
                href={`#narrative-${section.title}`}
                className="progress-step section-progress-step"
                style={{
                  top: `${section.section_percentage * bar_height + 1.1}rem`,
                }}
                // onClick={this.handleScrollJump}
              ></a>
            )
          })}
        </div>
        <div className="progress-step" id="end-progress-step"></div>
      </div>
    )
  }
}
