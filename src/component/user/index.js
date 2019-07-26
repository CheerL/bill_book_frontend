import React from "react";
import { Login } from "./login";
import { Forget } from "./forget";
import { Register } from "./register";
import { Route, Redirect, Switch } from "react-router-dom";

export const User = ({ match }) => (
  <Switch>
    <Route path={`${match.url}/login`} component={Login} />
    <Route path={`${match.url}/forget`} component={Forget} />
    <Route path={`${match.url}/register`} component={Register} />
    <Redirect to={`${match.url}/login`} />
  </Switch>
);
