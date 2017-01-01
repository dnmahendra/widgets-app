import React, { Component, PropTypes } from 'react'

class Main extends Component {
  render () {
    return (
      <div className="main-container">
        {this.props.children}
      </div>
    )
  }
}

Main.propTypes = {
  children: PropTypes.node,
}

export default Main
