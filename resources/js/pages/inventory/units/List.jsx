import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Add as AddIcon } from "styled-icons/material";
import { parse } from "querystring";
import moment from "moment";

import { fetchUnits, showPrompt, hidePrompt } from "@/actions";
import { Alert } from "@/components";
import { ColumnHeader } from "@/components/DataTable";
import InventoryUnitsListItem from "./ListItem";
import ConfirmDelete from "./ConfirmDelete";

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

  handleDelete(unit) {
    return this.props.showPrompt(
      <ConfirmDelete onDismiss={() => this.props.hidePrompt()} unit={unit} />
    );
  }

  render() {
    const { data, fetching, error } = this.props.units;
    const {
      location: { search }
    } = this.props;
    const query = parse(search.substr(1));

    return (
      <div className="container py-4">
        {query._flow === "edit-success" && (
          <Alert type="success" className="mb-4">
            Changes saved!
          </Alert>
        )}
        {query._flow === "create-success" && (
          <Alert type="success" className="mb-4">
            New unit created!
          </Alert>
        )}

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
                <InventoryUnitsListItem
                  key={"units-item-" + index}
                  {...unit}
                  onDelete={() => this.handleDelete(unit)}
                />
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
  fetchUnits,
  showPrompt,
  hidePrompt
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InventoryUnitsList);
