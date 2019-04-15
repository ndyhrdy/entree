import React from "react";
import { NavLink, Redirect, Route, Switch } from "react-router-dom";

import { StoreDependentView } from "@/components";
import Purchases from "./purchases/Purchases";
import Suppliers from "./suppliers/Suppliers";

export default props => {
  return (
    <StoreDependentView>
      {props.location.pathname.split("/").length === 3 && (
        <div className="bg-white border-bottom">
          <div className="container py-3">
            <h1>Purchasing</h1>
          </div>
          <div className="container">
            <nav className="nav nav-tabs" style={{ marginBottom: -1 }}>
              <NavLink to="/purchasing/purchases" className="nav-item nav-link">
                Purchases
              </NavLink>
              <NavLink to="/purchasing/suppliers" className="nav-item nav-link">
                Suppliers
              </NavLink>
            </nav>
          </div>
        </div>
      )}

      <Switch>
        <Route path="/purchasing/purchases" component={Purchases} />
        <Route path="/purchasing/suppliers" component={Suppliers} />

        <Redirect to="/purchasing/purchases" />
      </Switch>
    </StoreDependentView>
  );
};
