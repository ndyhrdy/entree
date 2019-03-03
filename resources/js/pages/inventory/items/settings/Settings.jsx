import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { fetchItems, selectItem, fillItemSelection } from "@/actions";
import Form from "./Form";

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
      <div className="container py-4">
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
            <Form {...item} onSaved={newItem => this.onItemSaved(newItem)} />
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
