import React, { PureComponent } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import Home from "./Home";
import Create from "./create/Create";
import Invite from "./invite/Invite";

export default class Stores extends PureComponent {
  render() {
    return (
      <Switch>
        <Route exact path="/stores" component={Home} />
        <Route exact path="/stores/new" component={Create} />
        <Route exact path="/stores/:slug/invite" component={Invite} />

        <Redirect to="/stores" />
      </Switch>
    );
  }
}
