import React, { PureComponent } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import InventoryUnitsList from "./List";

export default class InventoryUnits extends PureComponent {
  render() {
    return (
      <Switch>
        <Route exact path="/inventory/units" component={InventoryUnitsList} />

        <Redirect to="/inventory/units" />
      </Switch>
    );
  }
}
