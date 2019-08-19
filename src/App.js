import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Router } from "./common/router";
import Context from './store'

// import { Main } from "./component/main";
import { User } from "./component/user";
import { Account } from './component/account'
import { Bill } from './component/bill'
import { Mine } from './component/mine'

const App = () => {
  const login = true
  return (
    <Context.Provider>
      <Router>
        <Switch>
          <Route path="/account" component={Account} />
          <Route path="/bill" component={Bill} />
          <Route path="/mine" component={Mine} />
          <Route path="/user" component={User} />
          <Redirect to={login ? '/bill' : '/user/login'} />
        </Switch>
      </Router>
    </Context.Provider>
  );
};

export default App;
