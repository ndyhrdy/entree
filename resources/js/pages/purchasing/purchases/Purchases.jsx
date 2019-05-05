import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import List from "./list/List";
import Create from "./create/Create";
import Purchase from "./purchase/Purchase";

export default props => {
  const {
    match: { path }
  } = props;

  return (
    <Switch>
      <Route exact path={path} component={List} />
      <Route exact path={path + "/new"} component={Create} />
      <Route exact path={path + "/:batchNo"} component={Purchase} />

      <Redirect to={path} />
    </Switch>
  );
};
