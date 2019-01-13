import React, { PureComponent } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import InventoryUnitsList from "./List";
import InventoryUnitsCreate from "./Create";

export default class InventoryUnits extends PureComponent {
  render() {
    return (
      <Switch>
        <Route exact path="/inventory/units" component={InventoryUnitsList} />
        <Route exact path="/inventory/units/new" component={InventoryUnitsCreate} />

        <Redirect to="/inventory/units" />
      </Switch>
    );
  }
}
