import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

const RouterContext = React.createContext()

export const Router = ({ children }) => (
  <BrowserRouter>
    <Route>
      {(props) => (
        <RouterContext.Provider value={props}>
          { children }
        </RouterContext.Provider>
      )}
    </Route>
  </BrowserRouter>
)

export const useRouter = () => {
  return React.useContext(RouterContext)
}
