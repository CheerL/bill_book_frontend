import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Router } from "./common/router";
import Context from './store'


import { User } from "./component/user";
import { Account } from './component/account'
import { Bill } from './component/bill'
import { Mine } from './component/mine'

const App = () => {
  const { user_store } = Context.useStore()
  return Context.useConsumer(() => (
    <Router>
        {user_store.login ?
          <Switch>
            <Route path="/account" component={Account} />
            <Route path="/bill" component={Bill} />
            <Route path="/mine" component={Mine} />
            <Redirect to='/bill' />
          </Switch> :
          <Switch>
            <Route path="/user" component={User} />
            <Redirect to='/user/login' />
          </Switch>
        }
    </Router>
  ));
};

export default App;
