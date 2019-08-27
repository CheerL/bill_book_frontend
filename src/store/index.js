import React from "react";
import { useLocalStore, useObserver } from "mobx-react-lite";
import account_store from './account'
import bill_store from './bill'
import billbook_store from './billbook'
import current from './current'
import user from './user'
import { obj_groupby, object_filter } from '../common/object'

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
  billbook_store,
  user,
  current,

  get accountsExceptCurrent() {
    if (this.current.account === undefined) {
      return []
    }
    return object_filter(this.account_store.accounts, account => account !== this.current.account)
  },
  get billbooksExceptCurrent() {
    if (this.current.billbook === undefined) {
      return []
    }
    return object_filter(
      this.billbook_store.billbooks,
      billbook => billbook !== this.current.billbook
    )
  },
  get billsGroupbyDay() {
    const billbook = this.current.billbook
    if (billbook === undefined) {
      return {}
    }
    return obj_groupby(this.bill_store.bills, 'time', bill => bill.billbook === billbook.id)
  },
  get billsGroupbyMonth() {
    const billbook = this.current.billbook
    if (billbook === undefined) {
      return []
    }
    return obj_groupby(this.bill_store.bills, 'time_month', bill => bill.billbook === billbook.id)
  }
})

export default Context;
