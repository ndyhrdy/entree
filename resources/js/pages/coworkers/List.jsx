import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { fetchCoworkers, searchCoworkers } from "@/actions";
import { fuzzySearch } from "@/helpers/misc";
import ListItem from "./ListItem";

export class CoworkersList extends Component {
  componentDidMount() {
    this.props.fetchCoworkers();
  }

  render() {
    const { coworkers } = this.props;
    const data =
      coworkers.term.length > 0
        ? fuzzySearch({
            list: coworkers.data,
            term: coworkers.term,
            keys: ["name", "email"]
          })
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
              <th style={{ width: 250 }}>Joined</th>
            </tr>
          </thead>
          <tbody>
            {coworkers.fetching && coworkers.data.length === 0 && (
              <tr>
                <td colSpan={2} className="text-center">
                  Loading your coworkers..
                </td>
              </tr>
            )}
            {data.map((coworker, index) => (
              <ListItem
                key={"coworker-item-" + index}
                {...coworker}
                isSelf={coworker.userId === this.props.user.id}
                isOwner={
                  coworker.userId === this.props.activeStore.owner.data.id
                }
              />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

CoworkersList.propTypes = {
  fetchCoworkers: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  coworkers: state.coworkers,
  user: state.user.data,
  activeStore: state.activeStore.data
});

const mapDispatchToProps = { fetchCoworkers, searchCoworkers };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CoworkersList);
