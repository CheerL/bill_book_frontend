import React, { useEffect, useState } from "react";
import { SwitchRoute } from "./router";
import Context from './store'
import { useUserAction } from './action'

import { User } from "./component/user";
import { Account } from './component/account'
import { Billbook } from './component/billbook'
import { Mine } from './component/mine'

const App = () => {
  const store = Context.useStore()
  const [isRender, setIsRender] = useState(false)
  const { login_jwt } = useUserAction()
  window.store = store

  useEffect(() => {
    login_jwt(() => setIsRender(true))
    // eslint-disable-next-line
  }, [])

  return Context.useConsumer(() => isRender ? (
    store.user.login ?
      <SwitchRoute router_map={[
        { path: "/account", component: Account },
        { path: "/billbook", component: Billbook },
        { path: "/mine", component: Mine },
        { path: '/billbook' }
      ]} /> :
      <SwitchRoute router_map={[
        { path: "/user", component: User },
        { path: '/user/login' }
      ]} />

  ) : <></>);
};

export default App;
