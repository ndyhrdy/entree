import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { parse } from "querystring";

import { fetchCoworkers } from "../../actions";
import { Alert } from "../../components";
import List from "./List";

export class CoworkersHome extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchCoworkers();
  }

  render() {
    const {
      user,
      location: { search }
    } = this.props;
    const query = parse(search);

    if (!user.data || user.fetching) {
      return <div className="container py-5">Loading..</div>;
    }

    const { data, fetching, error } = this.props.coworkers;
    
    return (
      <div className="container py-5">
        {query._alert === "create-store-success" && (
          <Alert type="info">
            Nice! You made a store on Entree. Invite your coworkers by adding
            their emails, and they will be notified to join{" "}
            <strong>{user.data.activeStore.data.name}</strong>.
          </Alert>
        )}

        <div className="mb-4">
          <h1>Your Coworkers</h1>

          <div className="card">
          <div className="card-header">
            <div className="d-flex justify-content-between align-items-center">
              
            </div>
          </div>

          <List
            data={data}
            fetching={fetching}
            error={error}
          />
        </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  coworkers: state.coworkers,
});

const mapDispatchToProps = { fetchCoworkers };

CoworkersHome.propTypes = {
  fetchCoworkers: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CoworkersHome);
