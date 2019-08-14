import React from "react";
import { useLocalStore } from "mobx-react-lite";


const storeContextCreater = (storeCreater, initStore) => {
  const Context = React.createContext();

  const storeContext = {
    Provider: ({ children }) => {
      const store = useLocalStore(storeCreater, initStore);
      return <Context.Provider value={store}>{children}</Context.Provider>;
    },

    useStore: () => {
      const store = React.useContext(Context);
      if (!store) {
        throw new Error("You have forgot to use StoreProvider");
      }
      return store;
    }
  };
  return storeContext;
};

export default storeContextCreater;