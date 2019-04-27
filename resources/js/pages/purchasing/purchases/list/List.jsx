import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Add as AddIcon } from "styled-icons/material";
import Swal from "sweetalert2";
import SwalReact from "sweetalert2-react-content";

import { fetchPurchases, searchPurchases } from "@/actions";
import { LoadingIndicator } from "@/components";
import { ColumnHeader } from "@/components/DataTable";
import Empty from "./Empty";
import Item from "./Item";
import { fuzzySearch, getFlowFromQueryString } from "@/helpers/misc";

const alert = SwalReact(Swal);

class PurchasingPurchasesList extends Component {
  componentDidMount() {
    const {
      fetchPurchases,
      location: { search }
    } = this.props;

    fetchPurchases();
    const flow = getFlowFromQueryString(search);
    if (flow === "create-success") {
      alert.fire({
        type: "success",
        title: "Hi-five!",
        text: "A new purchase has been recorded!",
        timer: 3000,
        showConfirmButton: false
      });
    }
  }

  render() {
    const {
      purchases,
      fetching,
      fetchingError,
      searchPurchases,
      searchTerm
    } = this.props;
    const data =
      searchTerm.length > 0
        ? fuzzySearch({
            list: purchases,
            term: searchTerm,
            keys: ["batchNo", "supplier.data.name"]
          })
        : [...purchases];

    return (
      <div className="container py-4">
        <div className="card">
          <div className="card-header d-flex justify-content-between align-items-center">
            <div>
              <input
                type="text"
                value={searchTerm}
                onChange={e => searchPurchases(e.target.value)}
                className="form-control"
                placeholder="Search.."
              />
            </div>
            <div>
              <Link to="/purchasing/purchases/new" className="btn btn-primary">
                <AddIcon size={24} /> Record a Purchase
              </Link>
            </div>
          </div>
          <table className="table">
            {purchases.length > 0 && (
              <thead>
                <tr>
                  <ColumnHeader>Purchased From</ColumnHeader>
                  <ColumnHeader>Batch</ColumnHeader>
                  <ColumnHeader className="text-right" style={{ width: 250 }}>
                    Total Purchase
                  </ColumnHeader>
                  <ColumnHeader style={{ width: 250 }}>Created</ColumnHeader>
                </tr>
              </thead>
            )}
            <tbody>
              {data.length === 0 && (
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
              {data.map(purchase => (
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
  fetchingError: state.purchases.fetchingError,
  searchTerm: state.purchases.term
});

const mapDispatchToProps = {
  fetchPurchases,
  searchPurchases
};

PurchasingPurchasesList.propTypes = {
  purchases: PropTypes.array.isRequired,
  fetching: PropTypes.bool.isRequired,
  fetchingError: PropTypes.any,
  fetchPurchases: PropTypes.func.isRequired,
  searchPurchases: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PurchasingPurchasesList);
