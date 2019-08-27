import React, {useEffect} from 'react'

import { SwitchRoute } from '../../router'
import { BillbookDetail, NewBillbook, ChangeBillbook } from './billbook'
import { BillDetail, NewBill, ChangeBill } from './bill'
import { useBillbookAction, useBillAction } from '../../action'

import './index.css'

export const Billbook = () => {
  const { getBillbooks } = useBillbookAction()
  const { getBills } = useBillAction()
  useEffect(() => {
    getBillbooks()
    getBills()
    // eslint-disable-next-line
  }, [])

  return <SwitchRoute router_map={[
    // { path: '/billbook', component: BillbookDetail, exact: true },
    { path: '/billbook/detail/:id', component: BillbookDetail },
    { path: '/billbook/change/:id', component: ChangeBillbook },
    { path: '/billbook/new', component: NewBillbook },
    { path: '/billbook/bill/detail/:id', component: BillDetail },
    { path: '/billbook/bill/change/:id', component: ChangeBill },
    { path: '/billbook/bill/new', component: NewBill },
    { path: '/billbook/detail/default' }
  ]} />
}