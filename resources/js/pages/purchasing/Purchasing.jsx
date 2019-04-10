import React from "react";
import { NavLink, Redirect, Route, Switch } from "react-router-dom";

import { StoreDependentView } from "@/components";
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
              <NavLink to="/purchasing/suppliers" className="nav-item nav-link">
                Suppliers
              </NavLink>
            </nav>
          </div>
        </div>
      )}

      <Switch>
        <Route path="/purchasing/suppliers" component={Suppliers} />

        <Redirect to="/purchasing/suppliers" />
      </Switch>
    </StoreDependentView>
  );
};
