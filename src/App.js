import React from "react";
import { Router, SwitchRoute } from "./router";
import Context from './store'

import { User } from "./component/user";
import { Account } from './component/account'
import { Billbook } from './component/billbook'
import { Mine } from './component/mine'

const App = () => {
  const store = Context.useStore()
  window.store = store
  return Context.useConsumer(() => (
    <Router>
      {store.user.login ?
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
