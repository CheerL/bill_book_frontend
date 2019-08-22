import React from "react";
import { WingBlank } from "antd-mobile";

import Context from '../../../store'
import { Title, AccountHead } from '../../../common'

import { Layout } from "../../layout";
import { AccountCard, AccountNew } from '../card'

const AccountList = () => {
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
}

export default AccountList