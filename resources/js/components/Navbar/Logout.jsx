import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { clearUser } from "../../actions";

export class NavbarLogout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posting: false
    };
  }

  onLogout() {
    return this.setState({ posting: true }, () =>
      axios
        .post(window.appConfig.baseURL + "/logout")
        .then(() => {
          this.props.clearUser();
          window.location.href =
            window.appConfig.baseURL + "/login?_flow=logged-out";
          return;
        })
        .catch(() => this.setState({ posting: false }))
    );
  }

  render() {
    return (
      <a
        className={"dropdown-item" + (this.state.posting ? " text-muted" : "")}
        href="#"
        onClick={e => {
          e.preventDefault();
          return this.state.posting ? false : this.onLogout();
        }}>
        Logout
      </a>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = { clearUser };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavbarLogout);
