import React, { Component } from 'react'
import { Grid } from 'react-bootstrap'
import WidgetContainer from './WidgetContainer'
import data from '../../assets/data/content.json'

class Widget extends Component {
  render () {

    let content = data.content.map((item, index) => {
      JSON.stringify(item.description)
      item.index = index
      return item
    })

    return (
      <div>
        <WidgetContainer contentId="0" content={content} />
      </div>
    )
  }
}

export default Widget
