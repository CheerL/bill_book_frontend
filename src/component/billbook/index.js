import React from 'react'
import { Layout } from '../layout'
import { Bar, colorSpan } from '../../common'
import Context from '../../store'
import { BillbookSwitch } from './switch'
import { SwitchRoute, useRouter } from '../../router'
import { NewBillbook } from './new_billbook'
import { ChangeBillbook } from './change_billbook'
import { setCurrentBillbook } from './common'
import './index.css'

const BillbookDetail = ({ match }) => {
  const router = useRouter()
  const { billbook_store, current } = Context.useStore()
  setCurrentBillbook(match.params, true)

  if (match.url === '/billbook') {
    router.history.push(`/billbook/detail/${current.billbook.id}`)
  }

  const rightContent = [{
    value: 'change', content: '修改账本',
    onSelect: () => {
      router.history.push(`/billbook/change/${current.billbook.id}`)
    }
  }]
  const undefaultContent = [{
    value: 'default', content: '设为默认',
    onSelect: () => {
      if (!current.isDefaultBillbook) {
        billbook_store.defaultBillbook.default = false
        current.billbook.default = true
      }
    }
  }, {
    value: 'delete', content: colorSpan('删除账本', 'red'),
    onSelect: () => {
      if (!current.isDefaultBillbook) {
        billbook_store.removeBillbook(current.billbook)
        current.billbook = billbook_store.defaultBillbook
      }
    }
  }]



  return Context.useConsumer(() => (
    <Layout>
      <Bar title={<BillbookSwitch />} left={false} rightContent={
        rightContent.concat(current.isDefaultBillbook ? [] : undefaultContent)
      } />
    </Layout>
  ))
}

export const Billbook = SwitchRoute([
  { path: '/billbook', component: BillbookDetail, exact: true },
  { path: '/billbook/detail/:id', component: BillbookDetail },
  { path: '/billbook/change/:id', component: ChangeBillbook},
  { path: '/billbook/new', component: NewBillbook },
  { path: '/billbook' }
]) 