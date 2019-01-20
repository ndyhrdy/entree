import React, { PureComponent } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import InventoryItemsList from "./List";

export default class InventoryItems extends PureComponent {
  render() {
    return (
      <Switch>
        <Route exact path="/inventory/items" component={InventoryItemsList} />

        <Redirect to="/inventory/items" />
      </Switch>
    );
  }
}
