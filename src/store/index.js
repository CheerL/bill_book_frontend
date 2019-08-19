import React from "react";
import { useLocalStore, useObserver } from "mobx-react-lite";
import account_store from './account'
import bill_store from './bill'
import current from './current'

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
  account_store,
  bill_store,
  current,

  get accountsExceptCurrent() {
    if (this.current.account === undefined) {
      return []
    }
    return this.account_store.accounts.filter(account => account !== this.current.account)
  }
})

export default Context;
