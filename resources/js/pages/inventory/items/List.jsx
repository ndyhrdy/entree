import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Add as AddIcon } from "styled-icons/material";

import { fetchItems } from "../../../actions";
import InventoryItemsListItem from "./ListItem";

export class InventoryItemsList extends Component {
  componentDidMount() {
    this.props.fetchItems();
  }

  render() {
    const { data, fetching, error } = this.props.items;

    return (
      <div className="container py-5">
        <div className="card">
          <div className="card-header">
            <div className="d-flex justify-content-between align-items-center">
              <div />
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
                <th style={{ width: 150 }}>Quantity</th>
                <th style={{ width: 250 }}>Created</th>
              </tr>
            </thead>
            <tbody>
              {fetching && data.length === 0 && (
                <tr>
                  <td colSpan={3} className="text-center">
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
  fetchItems
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InventoryItemsList);
