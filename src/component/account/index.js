import React from "react";
import { WingBlank } from "antd-mobile";
import { Layout } from "../layout";
import { AccountHead } from './head'
import { AccountCard, AccountNew } from './card'
import { Route, Redirect, Switch } from "react-router-dom";
import { CreateAccount } from './new_account'
import { AccountDetail } from './detail'
import "./index.css";

const AccountIndex = () => {
  const accounts = [
    { name: "现金", amount: 0, id: "00000000", remark: '现金'},
    { name: "支付宝", amount: 1, id: "00000001" },
    { name: "微信", amount: 2, id: "00000002" }
  ];
  const total_amount = accounts.reduce((amount, account) => amount + account.amount, 0)
  return (
    <Layout>
      <AccountHead amount={total_amount}/>
      <WingBlank>
        <p className="account-cards-title">我的账户({accounts.length})</p>
        {accounts.map(account => <AccountCard account={account} />)}
        <AccountNew />
      </WingBlank>
    </Layout>
  );
};

export const Account = ({ match }) => {
  return <Switch>
    <Route path={`${match.url}/new`} component={CreateAccount} />
    <Route path={`${match.url}/<id>`} component={AccountDetail} />
    <Route path={`${match.url}`} component={AccountIndex} />
    <Redirect to={`${match.url}`} />
  </Switch>
}