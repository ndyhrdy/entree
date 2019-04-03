import React, { PureComponent } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import InventoryItemsList from "./list/List";
import InventoryItemsItem from "./item/Item";
import InventoryItemsCreate from "./create/Create";
import InventoryItemsSettings from "./settings/Settings";

export default class InventoryItems extends PureComponent {
  render() {
    return (
      <Switch>
        <Route exact path="/inventory/items" component={InventoryItemsList} />
        <Route
          exact
          path="/inventory/items/new"
          component={InventoryItemsCreate}
        />
        <Route
          path="/inventory/items/:slug/settings"
          component={InventoryItemsSettings}
        />
        <Route path="/inventory/items/:slug" component={InventoryItemsItem} />

        <Redirect to="/inventory/items" />
      </Switch>
    );
  }
}
