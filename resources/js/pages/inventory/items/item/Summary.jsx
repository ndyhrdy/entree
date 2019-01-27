import React, { Fragment, PureComponent } from "react";
import QuantityGraph from "./QuantityGraph";
import RecentTransactions from "./RecentTransactions";

export default class Summary extends PureComponent {
  render() {
    return (
      <Fragment>
        <div className="mb-3 bg-white rounded pt-4 pb-1 px-3">
          <QuantityGraph {...this.props} />
        </div>
        <div className="mb-3 d-flex align-items-stretch">
          <div className="bg-white rounded py-4 mr-2" style={{ flex: 1 }}>
            <RecentTransactions {...this.props} />
          </div>
          <div className="bg-white rounded py-4 ml-2" style={{ flex: 1 }} />
        </div>
      </Fragment>
    );
  }
}
