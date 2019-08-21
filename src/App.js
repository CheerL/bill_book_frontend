import React from "react";
import { Router, SwitchRoute } from "./router";
import Context from './store'

import { User } from "./component/user";
import { Account } from './component/account'
import { Billbook } from './component/billbook'
import { Mine } from './component/mine'

const App = () => {
  const { user } = Context.useStore()
  return Context.useConsumer(() => (
    <Router>
      {user.login ?
        SwitchRoute([
          { path: "/account", component: Account },
          { path: "/billbook", component: Billbook },
          { path: "/mine", component: Mine },
          { path: '/billbook' }
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
