import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Add as AddIcon } from "styled-icons/material";
import moment from "moment";

import { fetchUnits } from "@/actions";
import { ColumnHeader } from "@/components/DataTable";
import InventoryUnitsListItem from "./ListItem";

export class InventoryUnitsList extends Component {
  componentDidMount() {
    const {
      fetchUnits,
      units: { lastLoadTimestamp }
    } = this.props;
    if (
      !lastLoadTimestamp ||
      moment(lastLoadTimestamp).isBefore(moment().subtract("1", "day"))
    ) {
      return fetchUnits();
    }
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
          <table
            className={
              "table" +
              ((fetching || error) && data.length === 0 ? "" : " table-hover")
            }>
            <thead>
              <tr>
                <ColumnHeader>Unit</ColumnHeader>
                <ColumnHeader style={{ width: 250 }}>Created</ColumnHeader>
              </tr>
            </thead>
            <tbody>
              {fetching && data.length === 0 && (
                <tr>
                  <td colSpan={2} className="text-center py-3">
                    Loading units..
                  </td>
                </tr>
              )}
              {!!error && data.length === 0 && (
                <tr>
                  <td colSpan={2} className="text-center py-3">
                    Oops, we couldnt't get the information from the server.{" "}
                    <a
                      href="#"
                      onClick={() => {
                        this.props.fetchUnits();
                        return false;
                      }}>
                      Retry
                    </a>
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
