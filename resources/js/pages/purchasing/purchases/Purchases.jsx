import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import List from "./list/List";
import Create from "./create/Create";

export default props => {
  const {
    match: { path }
  } = props;

  return (
    <Switch>
      <Route exact path={path} component={List} />
      <Route exact path={path + "/new"} component={Create} />

      <Redirect to={path} />
    </Switch>
  );
};
