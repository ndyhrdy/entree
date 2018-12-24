import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

export class Navbar extends Component {
  onLogout() {}

  render() {
    const { user } = this.props;

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
                    {user.data.name} <span className="caret" />
                  </a>

                  <div
                    className="dropdown-menu dropdown-menu-right"
                    aria-labelledby="navbarDropdown">
                    <a
                      className="dropdown-item"
                      href="#"
                      onClick={() => this.onLogout()}>
                      Logout
                    </a>
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
  user: state.user
});

const mapDispatchToProps = {};

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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar);
