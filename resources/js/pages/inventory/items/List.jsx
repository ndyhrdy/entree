import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Add as AddIcon, ExpandMore } from "styled-icons/material";
import moment from "moment";
import Swal from "sweetalert2";
import SwalReact from "sweetalert2-react-content";

import { LoadingIndicator } from "@/components";
import { ColumnHeader } from "@/components/DataTable";
import { fetchItems, searchItems } from "@/actions";
import InventoryItemsListItem from "./ListItem";
import { fuzzySearch, getFlowFromQueryString } from "@/helpers/misc";
import { default as sortData, types as sortTypes } from "./sort";

const alert = SwalReact(Swal);

export class InventoryItemsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sort: sortTypes[0]
    };
  }

  componentDidMount() {
    const {
      items: { lastLoadTimestamp },
      fetchItems,
      location: { search }
    } = this.props;
    if (
      !lastLoadTimestamp ||
      moment(lastLoadTimestamp).isBefore(moment().subtract(5, "minutes"))
    ) {
      fetchItems();
    }

    const flow = getFlowFromQueryString(search);
    if (flow === "create-success") {
      alert.fire({
        type: "success",
        title: "Hi-five!",
        text: "You've added a spanking new item!",
        timer: 3000,
        showConfirmButton: false
      });
    }
  }

  render() {
    const { items, searchItems } = this.props;
    const { sort } = this.state;
    const data =
      items.term.length > 0
        ? fuzzySearch({
            list: items.data,
            term: items.term,
            keys: ["name", "sku"]
          })
        : [...items.data];

    return (
      <div className="container py-4">
        <div className="card">
          <div className="card-header">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <input
                  type="text"
                  value={items.term}
                  onChange={e => searchItems(e.target.value)}
                  className="form-control"
                  placeholder="Search items.."
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
                <Link
                  to="/inventory/items/new"
                  className="btn btn-primary ml-2">
                  <AddIcon size={24} /> Add Item
                </Link>
              </div>
            </div>
          </div>
          <table
            className={
              "table" +
              ((items.fetching || items.error) && items.data.length === 0
                ? ""
                : " table-hover")
            }>
            <thead>
              <tr>
                <ColumnHeader>Item</ColumnHeader>
                <ColumnHeader className="text-right" style={{ width: 150 }}>
                  Quantity
                </ColumnHeader>
                <ColumnHeader className="text-right" style={{ width: 150 }}>
                  Last Transaction
                </ColumnHeader>
                <ColumnHeader style={{ width: 250 }}>Created</ColumnHeader>
              </tr>
            </thead>
            <tbody>
              {items.fetching && items.data.length === 0 && (
                <tr>
                  <td colSpan={4}>
                    <LoadingIndicator
                      size={80}
                      label="Hang on, we're getting your inventory.."
                    />
                  </td>
                </tr>
              )}
              {sortData(data, sort).map((item, index) => (
                <InventoryItemsListItem key={"items-item-" + index} {...item} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  items: state.items
});

const mapDispatchToProps = {
  fetchItems,
  searchItems
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InventoryItemsList);
