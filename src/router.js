import React from 'react'
import { BrowserRouter, Route, Switch, Redirect as DomRedirect } from 'react-router-dom'


const prefix = '/billbook'
const RouterContext = React.createContext()

export const Redirect = ({key, to}) => <DomRedirect key={key} to={prefix + to} />

export const SwitchRoute = ({router_map}) => {
  return <Switch>
    {router_map.map((route, index) => route.component ?
      <Route key={index} path={prefix + route.path} component={route.component} exact={route.exact} /> :
      <Redirect key={index} to={route.path} />
    )}
  </Switch>
}

export const Router = ({ children }) => (
  <BrowserRouter>
    <Route>
      {(router) => {
        router.push = path => router.history.push(prefix + path)
        return <RouterContext.Provider value={router}>
          {children}
        </RouterContext.Provider>
      }}
    </Route>
  </BrowserRouter>
)

export const useRouter = () => {
  const router = React.useContext(RouterContext)
  return router
}

export const useLink = path => {
  const router = useRouter()
  const handleLink = () => {
    if (path) {
      router.push(path)
    } else {
      router.history.goBack()
    }
  }
  return handleLink
}