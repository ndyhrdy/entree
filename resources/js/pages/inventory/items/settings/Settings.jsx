import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { NavLink, Link, Redirect, Route, Switch } from "react-router-dom";
import Swal from "sweetalert2";
import SwalReact from "sweetalert2-react-content";

import { fetchItems, selectItem, fillItemSelection } from "@/actions";
import { getFromQueryString } from "@/helpers/misc";
import General from "./general/General";
import Stock from "./stock/Stock";
import Images from "./images/Images";

const alert = SwalReact(Swal);

export class InventoryItemsSettings extends Component {
  resolveItem() {
    return (
      this.props.items.filter(
        item => item.slug === this.props.match.params.slug
      )[0] || null
    );
  }

  handleInitialAlert() {
    const {
      location: { pathname, search }
    } = this.props;
    const alertType = getFromQueryString(search, "alert");
    let alertProps = null;
    switch (alertType) {
      case "sku-change-success":
        alertProps = {
          title: "Hi-five!",
          text: "This item's SKU has been changed!"
        };
        break;
      case "name-change-success":
        alertProps = {
          title: "Hi-five!",
          text: "This item's name has been changed!"
        };
        break;
    }
    if (alertProps) {
      alert.fire({
        type: "success",
        timer: 3000,
        showConfirmButton: false,
        ...alertProps
      });
      return this.props.history.push(pathname);
    }
    return;
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
  }

  componentDidMount() {
    this.handleInitialAlert();
    if (!this.resolveItem()) {
      return this.props.fetchItems().then(() => this.selectItem());
    }
    return this.selectItem();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.location.search !== prevProps.location.search) {
      this.handleInitialAlert();
    }
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
                  <NavLink
                    exact
                    className="list-group-item list-group-item-action"
                    to={"/inventory/items/" + item.slug + "/settings/images"}>
                    Images
                  </NavLink>
                </div>
              </div>
              <div className="col-lg-9">
                <Switch>
                  <Route
                    exact
                    path={"/inventory/items/" + item.slug + "/settings"}
                    render={route => (
                      <General
                        {...route}
                        item={{ ...item }}
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
                  <Route
                    exact
                    path={"/inventory/items/" + item.slug + "/settings/images"}
                    render={() => <Images {...item} />}
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
