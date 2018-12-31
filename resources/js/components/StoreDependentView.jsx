import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

export class StoreDependentView extends Component {
  render() {
    const { user, activeStore, children, loadingView } = this.props;

    if (!user.data || user.fetching) {
      return loadingView || <div className="container py-5">Loading..</div>;
    }
    if (!activeStore.data) {
      return <Redirect to="/" />;
    }

    return <Fragment>{children}</Fragment>;
  }
}

const mapStateToProps = state => ({
  user: state.user,
  activeStore: state.activeStore
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StoreDependentView);
