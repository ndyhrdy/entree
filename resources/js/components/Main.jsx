import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { fetchAuthenticatedUser, fetchStores } from "../actions";

import { Navbar, Prompt } from ".";
import { Home, Stores, Coworkers, Inventory, Purchasing } from "../pages";

export class Main extends PureComponent {
  componentDidMount() {
    this.props.fetchAuthenticatedUser(true);
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
            <Route path="/inventory" component={Inventory} />
            <Route path="/purchasing" component={Purchasing} />

            <Redirect to="/" />
          </Switch>

          {this.props.prompt.shown && <Prompt />}
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => ({
  prompt: state.prompt
});

const mapDispatchToProps = {
  fetchAuthenticatedUser,
  fetchStores
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
