import React, { PureComponent } from 'react'
import { Redirect, Route, Switch } from "react-router-dom";

import Home from './Home';

export default class Coworkers extends PureComponent {
  render() {
    return (
      <Switch>
        <Route exact path="/coworkers" component={Home} />

        <Redirect to="/coworkers" />
      </Switch>
    )
  }
}
