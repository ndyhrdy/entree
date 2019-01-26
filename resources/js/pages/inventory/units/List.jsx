import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Add as AddIcon } from "styled-icons/material";

import { fetchUnits } from "@/actions";
import InventoryUnitsListItem from "./ListItem";

export class InventoryUnitsList extends Component {
  componentDidMount() {
    this.props.fetchUnits();
  }

  render() {
    const { data, fetching, error } = this.props.units;

    return (
      <div className="container py-4">
        <div className="card">
          <div className="card-header">
            <div className="d-flex justify-content-between align-items-center">
              <div />
              <div>
                <Link to="/inventory/units/new" className="btn btn-primary">
                  <AddIcon size={24} /> Add Unit
                </Link>
              </div>
            </div>
          </div>
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Unit</th>
                <th style={{ width: 250 }}>Created</th>
              </tr>
            </thead>
            <tbody>
              {fetching && data.length === 0 && (
                <tr>
                  <td colSpan={2} className="text-center">
                    Loading units..
                  </td>
                </tr>
              )}
              {data.map((unit, index) => (
                <InventoryUnitsListItem key={"units-item-" + index} {...unit} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  units: state.units
});

const mapDispatchToProps = {
  fetchUnits
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InventoryUnitsList);
