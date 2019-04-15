import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Add as AddIcon } from "styled-icons/material";

import { fetchPurchases } from "@/actions";
import { LoadingIndicator } from "@/components";
import { ColumnHeader } from "@/components/DataTable";
import Empty from "./Empty";
import Item from "./Item";

class PurchasingPurchasesList extends Component {
  componentDidMount() {
    this.props.fetchPurchases();
  }

  render() {
    const { purchases, fetching, fetchingError } = this.props;

    return (
      <div className="container py-4">
        <div className="card">
          <div className="card-header d-flex justify-content-between align-items-center">
            <div />
            <div>
              <Link to="/purchasing/purchase/new" className="btn btn-primary">
                <AddIcon size={24} /> Record a Purchase
              </Link>
            </div>
          </div>
          <table className="table">
            {purchases.length > 0 && (
              <thead>
                <ColumnHeader>Batch</ColumnHeader>
                <ColumnHeader className="text-right" style={{ width: 250 }}>
                  Total Purchase
                </ColumnHeader>
                <ColumnHeader style={{ width: 250 }}>Created</ColumnHeader>
              </thead>
            )}
            <tbody>
              {purchases.length === 0 && (
                <tr>
                  <td colSpan={3}>
                    {fetching ? (
                      <LoadingIndicator
                        size={80}
                        label="Hang on, we're getting your purchases.."
                      />
                    ) : (
                      <Empty />
                    )}
                  </td>
                </tr>
              )}
              {purchases.map(purchase => (
                <Item key={"purchase-item-" + purchase.batchNo} {...purchase} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  purchases: state.purchases.data,
  fetching: state.purchases.fetching,
  fetchingError: state.purchases.fetchingError
});

const mapDispatchToProps = {
  fetchPurchases
};

PurchasingPurchasesList.propTypes = {
  purchases: PropTypes.array.isRequired,
  fetching: PropTypes.bool.isRequired,
  fetchingError: PropTypes.any,
  fetchPurchases: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PurchasingPurchasesList);
