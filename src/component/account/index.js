import React from "react";
import { WingBlank } from "antd-mobile";
import { Layout } from "../layout";
import { AccountHead } from './head'
import { AccountCard, AccountNew } from './card'
import { Route, Redirect, Switch } from "react-router-dom";
import { CreateAccount } from './create_account'
import { AccountDetail } from './detail'
import accountStore from './stroe'
import "./index.css";

const AccountIndex = () => {
  const store = accountStore.useStore()
  const accounts = store.accounts
  return (
    <Layout>
      <AccountHead amount={store.total_amount}/>
      <WingBlank>
        <p className="account-cards-title">我的账户({accounts.length})</p>
        {accounts.map(account => <AccountCard account={account} key={account.id}/>)}
        <AccountNew />
      </WingBlank>
    </Layout>
  );
};

export const Account = ({ match }) => {
  return <Switch>
    <accountStore.Provider>
    <Route path={`${match.url}/new`} component={CreateAccount} />
    <Route path={`${match.url}/detail/:id`} component={AccountDetail} />
    <Route path={`${match.url}`} component={AccountIndex} />
    <Redirect to={`${match.url}`} />
    </accountStore.Provider>
  </Switch>
}