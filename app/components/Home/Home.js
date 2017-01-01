import React, { Component } from 'react'
import { Link } from 'react-router'
import { Grid, Jumbotron, Row, Button } from 'react-bootstrap'
import { EmbedButton } from '../../containers'
const script = `http://localhost:8080/embedWidget.js`

require('./style.scss')

class Home extends Component {
  render () {

    const widgetUrl = `http://localhost:8080/widget`
    const embedScript = `<div class="embed-widget" data-url="${widgetUrl}"></div><script type="text/javascript" src="${script}"></script>`

    return (
      <Grid className="home-page">
        <Jumbotron className="jumbo">
          <Row className="text-center">
            <h1>Widget Factory</h1>
            <p className="lead">Your one-stop widget warehouse</p>
          </Row>
          <Row className="text-center">
            <Link to="/widget">
              <Button className="btn btn-success btn-widget" type="submit">
                Explore The Widget
              </Button>
            </Link>
            <EmbedButton embedScript={embedScript} iframeUrl={widgetUrl} />
          </Row>
        </Jumbotron>
      </Grid>
    )
  }
}

export default Home
