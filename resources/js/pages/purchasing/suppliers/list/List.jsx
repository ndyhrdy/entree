import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { fetchSuppliers } from "@/actions";
import { LoadingIndicator } from "@/components";
import { ColumnHeader } from "@/components/DataTable";
import Empty from "./Empty";
import Item from "./Item";

class PurchasingSuppliersList extends Component {
  componentDidMount() {
    this.props.fetchSuppliers();
  }

  render() {
    const { suppliers, fetching, fetchingError } = this.props;

    return (
      <div className="container py-4">
        <div className="card">
          <div className="card-header" />
          <table className="table">
            <thead>
              <tr>
                <ColumnHeader>Supplier</ColumnHeader>
                <ColumnHeader style={{ width: 200 }}>
                  Last Purchase
                </ColumnHeader>
                <ColumnHeader style={{ width: 200 }}>Created</ColumnHeader>
              </tr>
            </thead>
            <tbody>
              {suppliers.length === 0 && (
                <tr>
                  <td colSpan={3}>
                    {fetching ? (
                      <LoadingIndicator
                        size={80}
                        label="Hang on, we're getting your shopping malls.."
                      />
                    ) : (
                      <Empty />
                    )}
                  </td>
                </tr>
              )}
              {suppliers.map((supplier, index) => (
                <Item key={"supplier-list-item-" + index} {...supplier} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  suppliers: state.suppliers.data,
  fetching: state.suppliers.fetching,
  error: state.suppliers.fetchingError
});

const mapDispatchToProps = {
  fetchSuppliers
};

PurchasingSuppliersList.propTypes = {
  fetchSuppliers: PropTypes.func.isRequired,
  suppliers: PropTypes.array.isRequired,
  fetching: PropTypes.bool.isRequired,
  error: PropTypes.any
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PurchasingSuppliersList);
