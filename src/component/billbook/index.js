import { SwitchRoute } from '../../router'
import { BillbookDetail, NewBillbook, ChangeBillbook} from './billbook'
import { BillDetail, NewBill, ChangeBill } from './bill'

import './index.css'

export const Billbook = SwitchRoute([
  { path: '/billbook', component: BillbookDetail, exact: true },
  { path: '/billbook/detail/:id', component: BillbookDetail },
  { path: '/billbook/change/:id', component: ChangeBillbook },
  { path: '/billbook/new', component: NewBillbook },
  { path: '/billbook/bill/detail/:id', component: BillDetail },
  { path: '/billbook/bill/change/:id', component: ChangeBill },
  { path: '/billbook/bill/new', component: NewBill },
  { path: '/billbook' }
]) 