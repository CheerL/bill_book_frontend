import React from 'react';
import { render } from 'react-dom';
import Context from './store'
import { Router } from './router'
import * as serviceWorker from './serviceWorker';
import 'normalize.css'

import App from './App';

const Root = () => (
  <Context.Provider>
    <Router>
      <App />
    </Router>
  </Context.Provider>
)

render(
  <Root />,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
