import React from "react";
import { WingBlank } from "antd-mobile";
import { Layout } from "../layout";
import { AccountHead } from './head'
import { AccountCard, AccountNew } from './card'
import { Route, Redirect, Switch } from "react-router-dom";
import { CreateAccount } from './create_account'
import { AccountDetail } from './detail'
import Context from '../../store'
import "./index.css";

const AccountIndex = () => {
  const { accountList } = Context.useStore()
  window.store = accountList

  return Context.useConsumer(() => (
    <Layout>
      <AccountHead />
      <WingBlank>
        <p className="account-cards-title">我的账户({accountList.accounts.length})</p>
        {accountList.accounts.map(account => <AccountCard account={account} key={account.id}/>)}
        <AccountNew />
      </WingBlank>
    </Layout>
  ));
};

export const Account = ({ match }) => {
  return <Switch>
    <Context.Provider>
    <Route path={`${match.url}/new`} component={CreateAccount} />
    <Route path={`${match.url}/detail/:id`} component={AccountDetail} />
    <Route exact path={`${match.url}`} component={AccountIndex} />
    <Redirect to={`${match.url}`} />
    </Context.Provider>
  </Switch>
}