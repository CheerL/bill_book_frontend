import React from "react";
import { Router, SwitchRoute } from "./router";
import Context from './store'

import { User } from "./component/user";
import { Account } from './component/account'
import { Bill } from './component/bill'
import { Mine } from './component/mine'

const App = () => {
  const { user } = Context.useStore()
  return Context.useConsumer(() => (
    <Router>
      {user.login ?
        SwitchRoute([
          { path: "/account", component: Account },
          { path: "/bill", component: Bill },
          { path: "/mine", component: Mine },
          { path: '/bill' }
        ])() :
        SwitchRoute([
          { path: "/user", component: User },
          { path: '/user/login' }
        ])()
      }
    </Router>
  ));
};

export default App;
