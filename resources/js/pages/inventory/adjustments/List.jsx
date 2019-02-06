import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Add as AddIcon } from "styled-icons/material";

import { fetchAdjustments } from "@/actions";
import InventoryAdjustmentsListItem from "./ListItem";

export class InventoryAdjustmentsList extends Component {
  componentDidMount() {
    this.props.fetchAdjustments();
  }

  render() {
    const { data, fetching, error } = this.props.adjustments;

    return (
      <div className="container py-4">
        <div className="card">
          <div className="card-header">
            <div className="d-flex justify-content-between align-items-center">
              <div />
              <div>
                <Link
                  to="/inventory/adjustments/new"
                  className="btn btn-primary">
                  <AddIcon size={24} /> Make Adjustment
                </Link>
              </div>
            </div>
          </div>
          <table className={"table" + (data.length > 0 ? " table-hover" : "")}>
            {data.length > 0 && (
              <thead>
                <tr>
                  <th>Batch</th>
                  <th style={{ width: 250 }}>Created</th>
                </tr>
              </thead>
            )}
            <tbody>
              {data.length === 0 && (
                <tr>
                  <td colSpan={2}>
                    {fetching ? (
                      <div className="text-center">Loading..</div>
                    ) : (
                      <div className="text-center py-5">
                        <div className="row justify-content-center mb-4">
                          <div className="col-md-4">
                            <img
                              className="w-100"
                              src={
                                window.appConfig.baseURL +
                                "/svg/undraw_QA_engineers_dg5p.svg"
                              }
                            />
                          </div>
                        </div>
                        <div className="h4">No adjustments made, yet.</div>
                        <div className="mb-4">
                          Adjustments to item stock can be made when real stock
                          quantity differs from what we have here.
                        </div>

                        <Link
                          to="/inventory/adjustments/new"
                          className="btn btn-primary">
                          Make Adjustment
                        </Link>
                      </div>
                    )}
                  </td>
                </tr>
              )}
              {data.map((adjustment, index) => (
                <InventoryAdjustmentsListItem
                  key={"adjustments-item-" + index}
                  {...adjustment}
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
  adjustments: state.adjustments
});

const mapDispatchToProps = {
  fetchAdjustments
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InventoryAdjustmentsList);
