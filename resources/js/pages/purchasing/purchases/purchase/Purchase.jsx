import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import moment from "moment";
import { Link } from "react-router-dom";

import List from "./List";
import { selectPurchase } from "@/actions";
import { LoadingIndicator } from "@/components";

class PurchasingPurchasesPurchase extends Component {
  componentDidMount() {
    this.props.selectPurchase(
      this.props.purchases.filter(
        purchase => purchase.batchNo === this.props.match.params.batchNo
      )[0]
    );
  }

  render() {
    const {
      purchases,
      history,
      match: {
        params: { batchNo }
      }
    } = this.props;
    const matchedPurchases = [
      ...purchases.filter(purchase => purchase.batchNo === batchNo)
    ];
    if (matchedPurchases.length === 0) {
      return history.replace("/purchasing/purchases");
    }
    const purchase = { ...matchedPurchases[0] };

    return (
      <div className="container py-5">
        <ol className="breadcrumb mb-4">
          <li className="breadcrumb-item">
            <Link to="/purchasing/purchases" replace>
              All Purchases
            </Link>
          </li>
          <li className="breadcrumb-item active">{purchase.batchNo}</li>
        </ol>
        <div className="mb-4">
          <h3>{purchase.batchNo}</h3>
          <div>
            {moment(purchase.createdAt).format("D MMM YYYY")} by{" "}
            {purchase.createdBy.data.name}
          </div>
        </div>

        {purchase.fetching && <LoadingIndicator label="Getting items.." />}
        {!!purchase.items && <List items={purchase.items.data || []} />}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  purchases: state.purchases.data
});

const mapDispatchToProps = {
  selectPurchase
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PurchasingPurchasesPurchase);
