import React from "react";
import { Login } from "./login";
import { Forget } from "./forget";
import { Register } from "./register";
import { Route } from "react-router-dom";
import { Flex } from 'antd-mobile'

export const User = ({ match }) => (
  <Flex justify="center" align="center" className="body-box">
    <Flex direction="column" className="user-box">
      <Route path={`${match.url}/login`} component={Login} />
      <Route path={`${match.url}/forget`} component={Forget} />
      <Route path={`${match.url}/register`} component={Register} />
    </Flex>
  </Flex>
);
