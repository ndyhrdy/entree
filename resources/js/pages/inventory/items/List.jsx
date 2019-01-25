import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Add as AddIcon } from "styled-icons/material";

import { fetchItems, searchItems } from "@/actions";
import InventoryItemsListItem from "./ListItem";
import { fuzzySearch } from "@/helpers";

export class InventoryItemsList extends Component {
  componentDidMount() {
    this.props.fetchItems();
  }

  render() {
    const { items, searchItems } = this.props;
    const data =
      items.term.length > 0
        ? fuzzySearch({
            list: items.data,
            term: items.term,
            keys: ["name", "sku"]
          })
        : [...items.data];

    return (
      <div className="container py-5">
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
              <div>
                <Link to="/inventory/items/new" className="btn btn-primary">
                  <AddIcon size={24} /> Add Item
                </Link>
              </div>
            </div>
          </div>
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Item</th>
                <th className="text-right" style={{ width: 150 }}>Quantity</th>
                <th className="text-right" style={{ width: 150 }}>Last Transaction</th>
                <th style={{ width: 250 }}>Created</th>
              </tr>
            </thead>
            <tbody>
              {items.fetching && items.data.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center">
                    Loading inventory..
                  </td>
                </tr>
              )}
              {data.map((item, index) => (
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
