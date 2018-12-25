import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { fetchStores } from "../../actions";

export class Coworkers extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container py-5">
        <div className="mb-4">
          <h1>Your Coworkers</h1>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.stores.fetching || state.user.fetching
});

const mapDispatchToProps = { fetchStores };

Coworkers.propTypes = {
  fetchStores: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Coworkers);
