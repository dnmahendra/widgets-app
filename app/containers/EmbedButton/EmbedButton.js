import React, { Component, PropTypes } from 'react'
import { Button, Modal, FormControl, InputGroup, Glyphicon } from 'react-bootstrap'
import CopyToClipboard from 'react-copy-to-clipboard'
import { VelocityTransitionGroup } from 'velocity-react'

require('./style.scss')

class EmbedButton extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showModal: false,
      showTooltip: false,
      buttonClicked: false,
    }
  }
  openModal = () => {
    this.setState({showModal: true})
  }
  closeModal = () => {
    this.setState({showModal: false})
  }
  showTooltip = () => {
    this.setState({showTooltip: true})
  }
  closeTooltip = () => {
    this.setState({
      showTooltip: false,
      buttonClicked: false,
    })
  }
  changeTooltipMessage = () => {
    this.setState({buttonClicked: true})
  }

  render () {
    const { embedScript, iframeUrl, className } = this.props
    const { showModal, buttonClicked, showTooltip } = this.state

    const tooltipText = !buttonClicked ? 'Click to copy' : 'Copied to clipboard!'
    let copyTooltip
    if (showTooltip) {
      copyTooltip = (
        <div className="tooltip-content">
          <div className="tooltip-content-inner">
            {tooltipText}
          </div>
        </div>
      )
    }

    return (
      <div className="btn-embed">
        <Button onClick={this.openModal} className="btn btn-warning">Get The Widget</Button>
        <Modal className="widget-modal embed-modal" dialogClassName={className} show={showModal} onHide={this.closeModal}>
          <Modal.Header closeButton onHide={this.closeModal}>
            <Modal.Title>Embed our widget on your website</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Copy this code onto your website to embed our widget:</p>
            <InputGroup className="modal-copy">
              <FormControl type="text" className="modal-input" value={embedScript} readOnly />
              <InputGroup.Button>
                <VelocityTransitionGroup enter={{animation: 'slideDown', duration: 100}} leave={{animation: 'slideUp', duration: 100}}>
                  {copyTooltip}
                </VelocityTransitionGroup>
                <CopyToClipboard text={embedScript}>
                  <Button bsStyle="primary" className="btn btn-success" onClick={this.changeTooltipMessage} onMouseEnter={this.showTooltip} onMouseLeave={this.closeTooltip}>
                    <Glyphicon glyph="copy" />
                  </Button>
                </CopyToClipboard>
              </InputGroup.Button>
            </InputGroup>
          </Modal.Body>
          <div className="iframe-wrapper">
            <iframe id="w-iframe" src={iframeUrl} width="100%" frameBorder="0" height="350" />
          </div>
          <Modal.Footer>
            <Button bsSize="large" onClick={this.closeModal}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

EmbedButton.propTypes = {
  embedScript: PropTypes.string.isRequired,
  iframeUrl: PropTypes.string.isRequired,
  className: PropTypes.string,
}

export default EmbedButton
