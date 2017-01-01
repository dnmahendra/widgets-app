import React, { Component, PropTypes } from 'react'
import { Glyphicon, Image } from 'react-bootstrap'

require('./style.scss')

class WidgetContent extends Component {
  constructor () {
    super()
    this.state = {
      showContent: true,
    }
  }
  handleClickPrev = (e) => {
    e.preventDefault()
    this.props.handleContentChange(this.props.prevContent.index)
  }
  handleClickNext = (e) => {
    e.preventDefault()
    this.props.handleContentChange(this.props.nextContent.index)
  }
  handleClickHeader = (e) => {
    e.preventDefault()
    this.setState({
      showContent: !this.state.showContent,
    })
  }
  render () {
    const { image, currContent, prevContent, nextContent } = this.props
    let classes = ['widget-content']
    let glyph

    if(this.state.showContent) {
      glyph = 'triangle-top'
      classes.push('show-content')
    } else {
      glyph = 'triangle-bottom'
    }

    return (
      <div className="widget-container">
        <div className="widget-header" onClick={this.handleClickHeader}>
          <h1><Glyphicon glyph="file" className="icon-file" />{currContent.title}</h1>
          <Glyphicon glyph={glyph} className="icon-caret" />
        </div>
        <div className={classes.join(' ')}>
          <div className="image-content">
            <Image src={image} alt="image" responsive />
          </div>
          <div className="text-content">
            <p dangerouslySetInnerHTML={{__html: currContent.description}} />
          </div>
        </div>
        <div className="widget-footer">
          <div className="left" >
            <Glyphicon glyph="triangle-left" className="icon-left" />
            <a onClick={this.handleClickPrev}>{prevContent.title}</a>
          </div>
          <div className="right" >
            <a onClick={this.handleClickNext}>{nextContent.title}</a>
            <Glyphicon glyph="triangle-right" className="icon-right" />
          </div>
        </div>

      </div>
    )
  }
}

WidgetContent.propTypes = {
  image: PropTypes.string,
  currContent: PropTypes.object,
  prevContent: PropTypes.object,
  nextContent: PropTypes.object,
  handleContentChange: PropTypes.func.isRequired,
}

export default WidgetContent
