import React from "react";
import { useLocalStore, useObserver } from "mobx-react-lite";
import accountList from './account'

const ContextCreater = stores => {
  const Context = React.createContext();
  const Provider = ({ children }) => {
    const value = useLocalStore(() => stores);
    return <Context.Provider value={value}>{children}</Context.Provider>;
  };

  const useConsumer = fn => useObserver(fn)
  const useStore = () => {
    if (!Context) {
      throw new Error("No Context defined");
    }

    const store = React.useContext(Context);
    if (!store) {
      throw new Error("No Provider defined");
    }

    return store;
  };

  return {
    Provider,
    useConsumer,
    useStore
  };
};

const Context = ContextCreater({
  accountList
})

export default Context;
