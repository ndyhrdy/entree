import React, { PureComponent } from "react";
import { connect } from "react-redux";

import { Navbar } from ".";
import { Home } from "../pages";

export class Main extends PureComponent {
  render() {
    const { stores } = this.props;

    return (
      <div>
        <Navbar stores={stores} />
        <Home />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  stores: state.stores
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
