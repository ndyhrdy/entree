import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { fetchAuthenticatedUser, fetchStores } from "../actions";

import { Navbar } from ".";
import { Home, Stores, Coworkers } from "../pages";

export class Main extends PureComponent {
  componentDidMount() {
    this.props.fetchAuthenticatedUser();
    this.props.fetchStores();
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/stores" component={Stores} />
            <Route path="/coworkers" component={Coworkers} />

            <Redirect to="/" />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {
  fetchAuthenticatedUser,
  fetchStores
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
