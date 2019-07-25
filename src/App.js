import React from "react";
import { Route } from "react-router-dom";
import { Router } from "./common/router";

import { Main } from "./component/main";
import { User } from "./component/user";

const App = () => {
  return (
    <Router>
      <Route exact path="/" component={Main} />
      <Route path="/user" component={User} />
    </Router>
  );
};

export default App;
