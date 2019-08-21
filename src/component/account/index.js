import React from "react";
import { WingBlank } from "antd-mobile";
import { Layout } from "../layout";
import { AccountCard, AccountNew } from './card'
import { NewAccount } from './new_account'
import { NewTransfer } from './new_transfer'
import { ChangeAccount } from './change_account'
import { ChangeTransfer } from './change_transfer'
import { AccountDetail } from './account_detail'
import { TransferDetail } from './transfer_detail'
import Context from '../../store'
import { Title, AccountHead } from '../../common'
import { SwitchRoute } from '../../router'
import "./index.css";

const AccountIndex = () => {
  const { account_store } = Context.useStore()

  return Context.useConsumer(() => (
    <Layout>
      <AccountHead text='总资产' amount={account_store.total_amount} />
      <WingBlank>
        <Title title={`我的账户(${account_store.accounts.length})`} />
        {account_store.accounts.map(account => <AccountCard account={account} key={account.id} space />)}
        <AccountNew />
      </WingBlank>
    </Layout>
  ));
};

export const Account = SwitchRoute([
  { path: '/account/new', component: NewAccount },
  { path: '/account/detail/:id', component: AccountDetail },
  { path: '/account/change/:id', component: ChangeAccount },
  { path: '/account/transfer/new', component: NewTransfer },
  { path: '/account/transfer/detail/:id', component: TransferDetail },
  { path: '/account/transfer/change/:id', component: ChangeTransfer },
  { exact: true, path: '/account', component: AccountIndex },
  { path: '/account' }
])