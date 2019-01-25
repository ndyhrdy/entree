import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { Apps as AppsIcon, ExpandMore } from "styled-icons/material";

import { switchActiveStore } from "../../actions";
import Stores from "./Stores";
import Logout from "./Logout";

export class Navbar extends Component {
  render() {
    const { activeStore, stores, user } = this.props;

    return (
      <nav className="navbar navbar-expand-md bg-dark navbar-dark navbar-laravel">
        <div className="container">
          <div className="navbar-brand" to="/">
            <Link to="/"><AppsIcon size={20} className="mr-2 mb-1 text-white" /></Link>
            {activeStore.data ? (
              <span>
                {activeStore.data.name}{" "}
                <span className="small text-muted">on Entree</span>
              </span>
            ) : (
              "Entree"
            )}
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto" />

            {user.fetching || !user.data ? (
              <div className="navbar-text">Loading..</div>
            ) : (
              <ul className="navbar-nav ml-auto">
                <li className="nav-item dropdown">
                  <a
                    id="navbarDropdown"
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                    v-pre="true">
                    {user.data.name} <ExpandMore size={18} />
                  </a>

                  <div
                    className="dropdown-menu dropdown-menu-right"
                    aria-labelledby="navbarDropdown">
                    <Stores
                      stores={stores}
                      activeStore={activeStore.data}
                      onSwitch={store => this.props.switchActiveStore(store)}
                    />

                    <div className="dropdown-divider" />
                    <Logout />
                  </div>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  stores: state.stores,
  user: state.user,
  activeStore: state.activeStore
});

const mapDispatchToProps = { switchActiveStore };

Navbar.propTypes = {
  stores: PropTypes.shape({
    error: PropTypes.any,
    fetching: PropTypes.bool.isRequired,
    data: PropTypes.array.isRequired
  }).isRequired,
  user: PropTypes.shape({
    error: PropTypes.any,
    fetching: PropTypes.bool.isRequired,
    data: PropTypes.object
  }).isRequired
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Navbar)
);
