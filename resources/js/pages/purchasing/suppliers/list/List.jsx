import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Add as AddIcon, ExpandMore } from "styled-icons/material";
import Swal from "sweetalert2";
import SwalReact from "sweetalert2-react-content";

import { ColumnHeader } from "@/components/DataTable";
import { fetchSuppliers, searchSuppliers } from "@/actions";
import { fuzzySearch, getFlowFromQueryString } from "@/helpers/misc";
import { LoadingIndicator } from "@/components";
import Empty from "./Empty";
import Item from "./Item";
import sortData, { types as sortTypes } from "./sort";

const alert = SwalReact(Swal);

class PurchasingSuppliersList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sort: sortTypes[0]
    };
  }

  componentDidMount() {
    this.props.fetchSuppliers();
    const flow = getFlowFromQueryString(this.props.location.search);
    if (flow) {
      if (flow.includes("success")) {
        alert.fire({
          type: "success",
          title: "Hi-five!",
          text:
            flow === "create-success"
              ? "You've added a new supplier!"
              : "Changes to supplier saved successfully!",
          timer: 3000,
          showConfirmButton: false
        });
      }
      this.props.history.replace("/purchasing/suppliers");
    }
  }

  render() {
    const {
      suppliers,
      fetching,
      fetchingError,
      searchSuppliers,
      term
    } = this.props;
    const { sort } = this.state;
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
            <div className="d-flex align-items-center">
              <div>Sort by</div>
              <div className="dropdown ml-2">
                <button
                  type="button"
                  className="btn btn-outline-secondary dropdown-toggle"
                  data-toggle="dropdown">
                  {sort.label} <ExpandMore size="16" />
                </button>
                <ul className="dropdown-menu dropdown-menu-right">
                  {sortTypes.map(sortType => (
                    <button
                      type="button"
                      className="dropdown-item"
                      onClick={() => this.setState({ sort: sortType })}
                      key={sortType.key}>
                      {sortType.label}
                    </button>
                  ))}
                </ul>
              </div>
              <div className="ml-2">
                <Link
                  to="/purchasing/suppliers/new"
                  className="btn btn-primary">
                  <AddIcon size={24} /> Add a Supplier
                </Link>
              </div>
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
              {sortData(data, sort).map((supplier, index) => (
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
  suppliers: [], //state.suppliers.data,
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
