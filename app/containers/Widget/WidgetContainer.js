import React, { Component, PropTypes } from 'react'
import { Grid } from 'react-bootstrap'
import ipadLogo from '../../assets/images/ipad-mini.jpg'
import { WidgetContent } from '../../components'

class WidgetContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      contentId: props.contentId,
    }
  }
  getPrevious = (contentId) => {
    let index = parseInt(contentId) - 1
    if (index <= 0) {
      index = this.props.content.length - 1
    }

    return this.props.content[index]
  }
  getNext = (contentId) => {
    let index = parseInt(contentId) + 1
    if (index > this.props.content.length - 1) {
      index = 0
    }

    return this.props.content[index]
  }
  handleContentChange = (contentId) => {
    this.setState({ contentId: contentId })
  }
  render () {
    const { content } = this.props
    const { contentId } = this.state

    let prevContent = this.getPrevious(contentId)
    let nextContent = this.getNext(contentId)
    let currContent = content[contentId]

    return (
      <div>
        <WidgetContent
          currContent={currContent}
          image={ipadLogo}
          prevContent={prevContent}
          nextContent={nextContent}
          handleContentChange={this.handleContentChange}
        />
      </div>
    )
  }
}

WidgetContainer.propTypes = {
  content: PropTypes.array,
  contentId: PropTypes.string,
}

export default WidgetContainer
