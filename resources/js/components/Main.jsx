import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { fetchAuthenticatedUser } from "../actions";

import { Navbar } from ".";
import { Home } from "../pages";

export class Main extends PureComponent {
  componentDidMount() {
    this.props.fetchAuthenticatedUser();
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Navbar />
          <Switch>
            <Route path="/" component={Home} />

            <Redirect to="/" />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {
  fetchAuthenticatedUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
