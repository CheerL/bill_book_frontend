import React from 'react'
import { Layout } from '../layout'
import { Bar } from '../../common'
import Context from '../../store'
import { BillbookSwitch } from './switch'
import { SwitchRoute } from '../../router'
import { NewBillbook } from './new_billbook'
import './index.css'

const BillbookDetail = ({match}) => {
  const {billbook_store, current} = Context.useStore()
  const id = match.params.id
  if (id !== undefined) {
    const billbook = billbook_store.getBillbook(id)
    current.billbook = billbook
  }

  return Context.useConsumer(() => (
    <Layout>
      <Bar title={<BillbookSwitch />} left={false} />
    </Layout>
  ))
}

export const Billbook = SwitchRoute([
  {path: '/billbook', component: BillbookDetail, exact: true},
  {path: '/billbook/detail/:id', component: BillbookDetail},
  {path: '/billbook/new', component: NewBillbook},
  {path: '/billbook'}
]) 