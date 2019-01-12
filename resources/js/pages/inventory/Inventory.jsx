import React, { PureComponent } from 'react'
import { NavLink, Redirect, Route, Switch } from "react-router-dom";
import InventoryUnits from './units/Units';

export default class Inventory extends PureComponent {
  render() {
    return (
      <div>
        <div className="bg-white border-bottom">
          <div className="container py-5">
            <h1>Inventory</h1>
          </div>
          <div className="container">
            <nav className="nav nav-tabs" style={{ marginBottom: -1 }}>
              <NavLink to="/inventory/units" className="nav-item nav-link">Units of Measurement</NavLink>
            </nav>
          </div>
        </div>

        <Switch>
          <Route path="/inventory/units" component={InventoryUnits} />
          
          <Redirect to="/inventory/units" />
        </Switch>
      </div>
    )
  }
}
