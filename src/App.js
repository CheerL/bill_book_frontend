import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import { Main } from './component/main'
import { Login } from './component/login'

const App = () => (
  <Router>
    <Route exact path='/' component={Main} />
    <Route path='/login' component={Login} />
  </Router>
)

export default App;
