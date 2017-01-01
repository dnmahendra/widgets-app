import React from 'react'
import {Router, Route, IndexRoute, browserHistory} from 'react-router'
import { Main, Home } from '../components'
import  { Widget } from '../containers'

const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={Main} >
      <IndexRoute component={Home} />
      <Route path="widget" component={Widget} />
    </Route>
  </Router>
)

export default routes
