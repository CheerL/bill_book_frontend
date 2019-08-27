import React, {useEffect} from 'react'

import { SwitchRoute } from '../../router'
import { BillbookDetail, NewBillbook, ChangeBillbook } from './billbook'
import { BillDetail, NewBill, ChangeBill } from './bill'
import { useBillbookAction } from '../../action'

import './index.css'

export const Billbook = () => {
  const { getAll } = useBillbookAction()
  useEffect(() => {
    getAll()
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