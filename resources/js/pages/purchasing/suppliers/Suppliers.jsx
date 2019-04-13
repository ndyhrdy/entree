import React, { PureComponent } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import PurchasingSuppliersList from "./list/List";

export default class PurchasingSuppliers extends PureComponent {
  render() {
    return (
      <Switch>
        <Route
          exact
          path="/purchasing/suppliers"
          component={PurchasingSuppliersList}
        />

        <Redirect to="/purchasing/suppliers" />
      </Switch>
    );
  }
}
