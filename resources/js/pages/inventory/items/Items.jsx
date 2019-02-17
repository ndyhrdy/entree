import React, { PureComponent } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import InventoryItemsList from "./List";
import InventoryItemsItem from "./item/Item";

export default class InventoryItems extends PureComponent {
  render() {
    return (
      <Switch>
        <Route exact path="/inventory/items" component={InventoryItemsList} />
        <Route path="/inventory/items/:slug" component={InventoryItemsItem} />

        <Redirect to="/inventory/items" />
      </Switch>
    );
  }
}
