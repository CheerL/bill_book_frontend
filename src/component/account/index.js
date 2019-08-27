import React from 'react'

import { SwitchRoute } from '../../router'
import { AccountDetail, NewAccount, ChangeAccount, AccountList } from './account'
import { TransferDetail, NewTransfer, ChangeTransfer } from './transfer'

import "./index.css";

export const Account = () => <SwitchRoute router_map={[
  { path: '/account', component: AccountList, exact: true },
  { path: '/account/detail/:id', component: AccountDetail },
  { path: '/account/change/:id', component: ChangeAccount },
  { path: '/account/new', component: NewAccount },
  { path: '/account/transfer/detail/:id', component: TransferDetail },
  { path: '/account/transfer/change/:id', component: ChangeTransfer },
  { path: '/account/transfer/new', component: NewTransfer },
  { path: '/account' }
]} />