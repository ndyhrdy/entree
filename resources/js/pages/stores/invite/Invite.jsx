import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { fetchStores } from "../../../actions";

export class StoresInvite extends Component {
  constructor(props) {
    super(props);
    if (props.stores.length === 0) {
      props.fetchStores();
    }
  }

  render() {
    const store = this.props.stores.filter(
      store => store.slug === this.props.match.params.slug
    )[0];
    if (!store || this.props.loading) {
      return <div className="container py-5">Loading..</div>;
    }

    const { name, slug } = store;
    return (
      <div className="container py-5">
        <ol className="breadcrumb mb-5">
          <li className="breadcrumb-item">
            <Link to="/stores" replace>
              Stores
            </Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={"/stores/" + slug} replace>
              {name}
            </Link>
          </li>
          <li className="breadcrumb-item active">Invite</li>
        </ol>
        <div className="mb-4">
          <h1>Invite Your Coworkers</h1>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  stores: state.stores.data,
  loading: state.stores.fetching || state.user.fetching
});

const mapDispatchToProps = { fetchStores };

StoresInvite.propTypes = {
  fetchStores: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StoresInvite);
