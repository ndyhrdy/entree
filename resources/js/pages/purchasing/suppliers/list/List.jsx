import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Add as AddIcon } from "styled-icons/material";

import { fetchSuppliers, searchSuppliers } from "@/actions";
import { LoadingIndicator } from "@/components";
import { ColumnHeader } from "@/components/DataTable";
import { fuzzySearch } from "@/helpers/misc";
import Empty from "./Empty";
import Item from "./Item";

class PurchasingSuppliersList extends Component {
  componentDidMount() {
    this.props.fetchSuppliers();
  }

  render() {
    const {
      suppliers,
      fetching,
      fetchingError,
      searchSuppliers,
      term
    } = this.props;
    const data =
      term.length > 0
        ? fuzzySearch({ list: suppliers, keys: ["name", "address"], term })
        : [...suppliers];

    return (
      <div className="container py-4">
        <div className="card">
          <div className="card-header d-flex justify-content-between align-items-center">
            <div className="form-inline">
              <input
                value={term}
                type="text"
                className={
                  "form-control" + (term.length > 0 ? " border-primary" : "")
                }
                placeholder="Search suppliers.."
                onChange={e => searchSuppliers(e.target.value)}
              />
            </div>
            <div>
              <Link to="/purchasing/suppliers/new" className="btn btn-primary">
                <AddIcon size={24} /> Add a Supplier
              </Link>
            </div>
          </div>
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
              {data.map((supplier, index) => (
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
  error: state.suppliers.fetchingError,
  term: state.suppliers.searchTerm
});

const mapDispatchToProps = {
  fetchSuppliers,
  searchSuppliers
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
