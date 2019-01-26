import React, { PureComponent } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import InventoryItemsList from "./List";
import InventoryItemsSummary from "./summary/Summary";

export default class InventoryItems extends PureComponent {
  render() {
    return (
      <Switch>
        <Route exact path="/inventory/items" component={InventoryItemsList} />
        <Route exact path="/inventory/items/:slug" component={InventoryItemsSummary} />

        <Redirect to="/inventory/items" />
      </Switch>
    );
  }
}
