import React from 'react';
import { Route } from "react-router-dom";
import { Router } from './common/router'

import { Main } from './component/main'
import { Login } from './component/user/login'
import { Register } from './component/user/register'

const App = () => {
  return <Router>
    <Route exact path='/' component={Main} />
    <Route path='/login' component={Login} />
    <Route path='/register' component={Register} />
  </Router>
}

export default App;
