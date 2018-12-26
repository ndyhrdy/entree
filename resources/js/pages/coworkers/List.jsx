import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ListItem from "./ListItem";

export class CoworkersList extends Component {
  render() {
    const { data: users } = this.props;
    
    return (
      <table className="table table-hover">
        <thead>
          <tr>
            <th>User</th>
            <th style={{ width: 300 }}>Joined</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <ListItem
              key={"coworker-item-" + index}
              {...user}
              isSelf={user.id === this.props.user.id}
            />
          ))}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user.data
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CoworkersList);
