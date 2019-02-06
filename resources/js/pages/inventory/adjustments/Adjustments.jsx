import React, { PureComponent } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import InventoryAdjustmentsList from "./List";
// import InventoryAdjustmentsCreate from "./Create";

export default class InventoryAdjustments extends PureComponent {
  render() {
    return (
      <Switch>
        <Route exact path="/inventory/adjustments" component={InventoryAdjustmentsList} />
        {/* <Route exact path="/inventory/adjustments/new" component={InventoryAdjustmentsCreate} /> */}

        <Redirect to="/inventory/adjustments" />
      </Switch>
    );
  }
}
