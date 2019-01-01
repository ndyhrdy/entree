import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { parse } from "querystring";

import { Alert } from "../../components";
import { populateCoworkers } from "../../actions";
import { StoreDependentView } from "../../components";
import InviteForm from "./InviteForm";
import CoworkersList from "./List";

export class CoworkersHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasInvited: false
    };
  }

  render() {
    const {
      location: { search }
    } = this.props;
    const query = parse(search.substr(1));

    return (
      <StoreDependentView>
        <div className="container py-5">
          {query._alert === "create-store-success" && !this.state.hasInvited && (
            <Alert type="info" className="mb-4">
              Nice! You made a store on Entree. Invite your coworkers by adding
              their emails, and they will be notified to join{" "}
              <strong>{this.props.activeStore.data.name}</strong>.
            </Alert>
          )}

          <div className="mb-5">
            <h1>Your Coworkers</h1>

            <div className="row mt-4">
              <div className="col-md-6 mb-5">
                <InviteForm
                  onInviteSuccess={coworkersList => {
                    this.props.populateCoworkers(coworkersList);
                    this.setState({ hasInvited: true });
                  }}
                />
              </div>
            </div>

            <CoworkersList />

          </div>
          {query._flow === "create-store" && (
            <div className="d-flex justify-content-end align-items-center">
              {this.state.hasInvited && (
                <Link to="/" className="btn btn-link">
                  Take me Home
                </Link>
              )}
              <Link
                to="/items?_flow=create-store"
                className={
                  "btn" +
                  (this.state.hasInvited ? " btn-primary" : "btn-secondary")
                }>
                {this.state.hasInvited ? "Add Items" : "Skip"}
              </Link>
            </div>
          )}
        </div>
      </StoreDependentView>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  coworkers: state.coworkers,
  activeStore: state.activeStore
});

const mapDispatchToProps = { populateCoworkers };

CoworkersHome.propTypes = {
  populateCoworkers: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CoworkersHome);
