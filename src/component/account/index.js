import React from "react";
import { WingBlank } from "antd-mobile";
import { Layout } from "../layout";
import { AccountHead } from './head'
import { AccountCard, AccountNew } from './card'
import { Route, Redirect, Switch } from "react-router-dom";
import { NewAccount } from './new_account'
import { NewTransfer } from './new_transfer'
import { ChangeAccount } from './change_account'
import { AccountDetail } from './detail'
import { TransferDetail } from './transfer_detail'
import Context from '../../store'
import { Title } from '../../common'
import "./index.css";

const AccountIndex = () => {
  const { account_store } = Context.useStore()

  return Context.useConsumer(() => (
    <Layout>
      <AccountHead text='总资产' amount={account_store.total_amount} />
      <WingBlank>
        <Title title={`我的账户(${account_store.accounts.length})`} />
        {account_store.accounts.map(account => <AccountCard account={account} key={account.id} space/>)}
        <AccountNew />
      </WingBlank>
    </Layout>
  ));
};

export const Account = ({ match }) => {
  return <Switch>
    <Context.Provider>
    <Route path={'/account/new'} component={NewAccount} />
    <Route path={'/account/detail/:id'} component={AccountDetail} />
    <Route path={'/account/change/:id'} component={ChangeAccount} />
    <Route path={'/account/transfer/new'} component={NewTransfer} />
    <Route path={'/account/transfer/detail/:id'} component={TransferDetail} />
    <Route exact path={'/account'} component={AccountIndex} />
    {/* <Redirect to={'/account'} /> */}
    </Context.Provider>
  </Switch>
}