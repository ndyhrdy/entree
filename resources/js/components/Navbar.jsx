import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

export class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-expand-md navbar-light navbar-laravel">
        <div className="container">
          <a className="navbar-brand" href="/">
            Entree
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="{{ __('Toggle navigation') }}">
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto" />

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
                  User Name <span className="caret" />
                </a>

                <div
                  className="dropdown-menu dropdown-menu-right"
                  aria-labelledby="navbarDropdown">
                  <a className="dropdown-item" href="#" onClick={() => {}}>
                    Logout
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

Navbar.propTypes = {
  stores: PropTypes.shape({
    fetching: PropTypes.bool.isRequired,
    error: PropTypes.any.isRequired,
    stores: PropTypes.array.isRequired,
  }).isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar);
