import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { NavLink, Link, Redirect, Route, Switch } from "react-router-dom";

import { fetchItems, selectItem, fillItemSelection } from "@/actions";
import Form from "./Form";
import Stock from "./Stock";

export class InventoryItemsSettings extends Component {
  resolveItem() {
    return (
      this.props.items.filter(
        item => item.slug === this.props.match.params.slug
      )[0] || null
    );
  }

  selectItem() {
    const item = this.resolveItem();
    if (item) {
      return this.props.selectItem(item);
    }
    return false;
  }

  onItemSaved(item) {
    this.props.fillItemSelection(item);
    if (item.slug !== this.props.match.params.slug) {
      window.location.href = "/inventory/items/" + item.slug + "/settings";
    }
  }

  componentDidMount() {
    if (!this.resolveItem()) {
      return this.props.fetchItems().then(() => this.selectItem());
    }
    return this.selectItem();
  }

  render() {
    const item = this.resolveItem();

    return (
      <div className="container py-5">
        {item ? (
          <Fragment>
            <ol className="breadcrumb mb-4">
              <li className="breadcrumb-item">
                <Link to="/inventory/items" replace>
                  All Items
                </Link>
              </li>
              <li className="breadcrumb-item">
                <Link to={"/inventory/items/" + item.slug} replace>
                  {item.name}
                </Link>
              </li>
              <li className="breadcrumb-item active">Settings</li>
            </ol>
            <div className="row">
              <div className="col-lg-3">
                <div className="list-group">
                  <NavLink
                    exact
                    className="list-group-item list-group-item-action"
                    to={"/inventory/items/" + item.slug + "/settings"}>
                    General Settings
                  </NavLink>
                  <NavLink
                    className="list-group-item list-group-item-action"
                    to={"/inventory/items/" + item.slug + "/settings/stock"}>
                    Stock Management
                  </NavLink>
                </div>
              </div>
              <div className="col-lg-9">
                <Switch>
                  <Route
                    exact
                    path={"/inventory/items/" + item.slug + "/settings"}
                    render={() => (
                      <Form
                        {...item}
                        onSaved={newItem => this.onItemSaved(newItem)}
                      />
                    )}
                  />
                  <Route
                    exact
                    path={"/inventory/items/" + item.slug + "/settings/stock"}
                    render={() => (
                      <Stock
                        {...item}
                        onSaved={newItem => this.onItemSaved(newItem)}
                      />
                    )}
                  />
                  <Redirect
                    to={"/inventory/items/" + item.slug + "/settings"}
                  />
                </Switch>
              </div>
            </div>
          </Fragment>
        ) : (
          <div>Loading item..</div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  items: state.items.data
});

const mapDispatchToProps = { fetchItems, fillItemSelection, selectItem };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InventoryItemsSettings);
