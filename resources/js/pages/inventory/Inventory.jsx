import React, { PureComponent } from "react";
import { NavLink, Redirect, Route, Switch } from "react-router-dom";

import { StoreDependentView } from "@/components";
import InventoryItems from "./items/Items";
import InventoryUnits from "./units/Units";
import InventoryAdjustments from "./adjustments/Adjustments";

export default class Inventory extends PureComponent {
  render() {
    return (
      <StoreDependentView>
        {this.props.location.pathname.split("/").length === 3 && (
          <div className="bg-white border-bottom">
            <div className="container py-3">
              <h1>Inventory</h1>
            </div>
            <div className="container">
              <nav className="nav nav-tabs" style={{ marginBottom: -1 }}>
                <NavLink to="/inventory/items" className="nav-item nav-link">
                  All Items
                </NavLink>
                <NavLink to="/inventory/units" className="nav-item nav-link">
                  Units of Measurement
                </NavLink>
                <NavLink
                  to="/inventory/adjustments"
                  className="nav-item nav-link">
                  Stock Adjustments
                </NavLink>
              </nav>
            </div>
          </div>
        )}

        <Switch>
          <Route path="/inventory/items" component={InventoryItems} />
          <Route path="/inventory/units" component={InventoryUnits} />
          <Route
            path="/inventory/adjustments"
            component={InventoryAdjustments}
          />

          <Redirect to="/inventory/items" />
        </Switch>
      </StoreDependentView>
    );
  }
}
