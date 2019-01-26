import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { fetchItems, selectItem } from "@/actions";
import Description from "./Description";
import QuantityGraph from "./QuantityGraph";
import RecentTransactions from "./RecentTransactions";

export class InventoryItemsSummary extends Component {
  constructor(props) {
    super(props);
  }

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
              <li className="breadcrumb-item active">{item.name}</li>
            </ol>
            <div className="mb-4">
              <h3>{item.name}</h3>
              <div>
                <em>{item.description}</em>
              </div>
            </div>
            <div className="row">
              <div className="col-md-3">
                <div className="mb-3 bg-white rounded pt-4 pb-1 px-3">
                  <Description {...item} />
                </div>
                <div className="bg-white rounded py-4 mb-4">
                  <div className="mx-3 mb-3 text-muted small">Actions</div>
                  <Link
                    className="d-block px-3 py-2 border-top"
                    to={"/inventory/adjustment/" + item.slug}>
                    Adjust Stock
                  </Link>
                  <Link
                    className="d-block px-3 py-2 border-top"
                    to={"/inventory/purchase/" + item.slug}>
                    Purchase
                  </Link>
                  <Link
                    className="d-block px-3 py-2 border-top"
                    to={"/inventory/production/" + item.slug}>
                    Produce
                  </Link>
                  <Link
                    className="d-block px-3 py-2 border-top"
                    to={"/inventory/items/" + item.slug + "/edit"}>
                    Edit
                  </Link>
                </div>
              </div>
              <div className="col-md-9">
                <div className="mb-3 bg-white rounded pt-4 pb-1 px-3">
                  <QuantityGraph {...item} />
                </div>
                <div className="mb-3 d-flex align-items-stretch">
                  <div className="bg-white rounded py-4 mr-2" style={{ flex: 1 }}>
                    <RecentTransactions {...item} />
                  </div>
                  <div className="bg-white rounded py-4 ml-2" style={{ flex: 1 }} />
                </div>
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

const mapDispatchToProps = {
  fetchItems,
  selectItem
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InventoryItemsSummary);
