import React, { PureComponent } from "react";
import { Link } from "react-router-dom";

import QuantityGraph from "./QuantityGraph";
import RecentTransactions from "./RecentTransactions";

export default class Summary extends PureComponent {
  render() {
    return (
      <div className="mb-5">
        {!!this.props.isStockMonitored && this.props.currentQuantity === 0 && (
          <div className="alert alert-info">
            This item currently has zero quantity.{" "}
            <Link
              to={"/inventory/purchases/new?_default_item=" + this.props.slug}>
              Purchase
            </Link>{" "}
            or{" "}
            <Link
              to={
                "/inventory/adjustments/new?_default_item=" + this.props.slug
              }>
              adjust stock
            </Link>
            .
          </div>
        )}
        {!!this.props.isStockMonitored && (
          <div className="mb-3 bg-white rounded pt-4 pb-1 px-3">
            <QuantityGraph {...this.props} />
          </div>
        )}
        <div className="mb-3 d-flex align-items-stretch">
          <div className="bg-white rounded py-4 mr-2" style={{ flex: 1 }}>
            <RecentTransactions {...this.props} />
          </div>
          <div className="bg-white rounded py-4 ml-2" style={{ flex: 1 }} />
        </div>
      </div>
    );
  }
}
