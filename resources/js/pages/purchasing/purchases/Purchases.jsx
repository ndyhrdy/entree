import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import List from "./list/List";

export default props => {
  const {
    match: { path }
  } = props;

  return (
    <Switch>
      <Route exact path={path} component={List} />

      <Redirect to={path} />
    </Switch>
  );
};
