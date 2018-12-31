import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { searchCoworkers } from "../../actions";
import { fuzzySearch } from "../../helpers";
import ListItem from "./ListItem";

export class CoworkersList extends Component {
  render() {
    const { coworkers } = this.props;
    const data =
      coworkers.term.length > 0
        ? fuzzySearch({ list: coworkers.data, term: coworkers.term, keys: ['name', 'email'] })
        : coworkers.data;

    return (
      <div className="card">
        <div className="card-header">
          <div className="d-flex justify-content-between align-items-center">
            <div className="form-inline">
              <input
                type="text"
                onChange={e => this.props.searchCoworkers(e.target.value)}
                className="form-control"
                placeholder="Search coworkers.."
                value={coworkers.term}
              />
            </div>
          </div>
        </div>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>User</th>
              <th style={{ width: 300 }}>Joined</th>
            </tr>
          </thead>
          <tbody>
            {data.map((coworker, index) => (
              <ListItem
                key={"coworker-item-" + index}
                {...coworker}
                isSelf={coworker.id === this.props.user.id}
              />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  coworkers: state.coworkers,
  user: state.user.data
});

const mapDispatchToProps = { searchCoworkers };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CoworkersList);
