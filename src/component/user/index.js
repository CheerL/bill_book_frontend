import React from "react";
import { Login } from "./login";
import { Forget } from "./forget";
import { Register } from "./register";
import { Route, Redirect } from "react-router-dom";

export const User = ({ match }) => (
  <>
    <Route exact path={`${match.url}`} render={() => <Redirect to={`${match.url}/login`} />} />
    <Route path={`${match.url}/login`} component={Login} />
    <Route path={`${match.url}/forget`} component={Forget} />
    <Route path={`${match.url}/register`} component={Register} />
  </>
);
