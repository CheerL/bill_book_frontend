import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

const prefix = '/billbook'
const RouterContext = React.createContext()

export const SwitchRoute = ({router_map}) => {
  return <Switch>
    {router_map.map((route, index) => route.component ?
      <Route key={index} path={route.path} component={route.component} exact={route.exact} /> :
      <Redirect key={index} to={route.path} />
    )}
  </Switch>
}

export const Router = ({ children }) => (
  <BrowserRouter basename={prefix}>
    <Route>
      {(props) => (
        <RouterContext.Provider value={props}>
          {children}
        </RouterContext.Provider>
      )}
    </Route>
  </BrowserRouter>
)

export const useRouter = () => {
  return React.useContext(RouterContext)
}

export const useLink = path => {
  const router = useRouter()
  const handleLink = () => {
    if (path) {
      router.history.push(path)
    } else {
      router.history.goBack()
    }
  }
  return handleLink
}