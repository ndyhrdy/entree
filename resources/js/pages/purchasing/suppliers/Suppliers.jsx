import React, { PureComponent } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import List from "./list/List";
import Create from "./create/Create";

export default class PurchasingSuppliers extends PureComponent {
  render() {
    const {
      match: { path }
    } = this.props;

    return (
      <Switch>
        <Route exact path={path} component={List} />
        <Route exact path={path + "/new"} component={Create} />

        <Redirect to={path} />
      </Switch>
    );
  }
}
