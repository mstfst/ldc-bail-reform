import React, { Component } from "react"
import "./progress-bar.scss"

export default class ProgressBar extends Component {
  state={
    progress: 0
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
        progress: scrolled
      })
    }
  }

  render() {
    const {
      progress
    } = this.state
    return (
      <div className="progress-container">
        <div className="progress-bar" style={{width: progress + "%"}}></div>
      </div>
    )
  }
}
