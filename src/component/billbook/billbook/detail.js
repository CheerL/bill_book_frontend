import React from 'react'
import { Icon } from 'antd'
import { WingBlank } from 'antd-mobile'
import { Redirect } from 'react-router-dom'

import Context from '../../../store'
import { useRouter, useLink } from '../../../router'
import { Bar, colorSpan } from '../../../common'
import { Layout } from '../../layout'

import BillbookSwitch from './switch'
import { DayBillCardList } from './card'

const AddBillButton = () => {
  const handleClick = useLink('/billbook/bill/new')
  return (
    <div className='billbook-add-button' onClick={e => {
      e.preventDefault()
      handleClick()
    }}>
      <Icon type='plus' className='billbook-add-button-icon' />
    </div>
  )
}

const emptyBillbook = {
  id: 'default',
  name: '无账本',
  remark: '点此下拉新建'
}

const BillbookDetail = ({ match }) => {
  const store = Context.useStore()
  const { billbook_store } = store

  let id = match.params.id
  if (id !== undefined) {
    if (id !== emptyBillbook.id && billbook_store.getBillbook(id) === undefined) {
      return <Redirect to='/billbook/detail/default' push />
    }
  } else {
    if (billbook_store.defaultBillbook === undefined) {
      return <Redirect to='/billbook/detail/default' push />
    } else {
      return <Redirect to={`/billbook/detail/${billbook_store.defaultBillbook.id}`} push />
    }
  }

  return Context.useConsumer(() => <BillbookDetailView billbook={
    billbook_store.billbooks.length > 0 ?
      id !== emptyBillbook.id ?
        billbook_store.getBillbook(id) :
        billbook_store.defaultBillbook :
      emptyBillbook
  } />)
}

const BillbookDetailView = ({ billbook }) => {
  const store = Context.useStore()
  const { billbook_store, current } = store
  const router = useRouter()

  const rightContent = billbook.id === 'default' ?
    null :
    [{
      value: 'change', content: '修改账本',
      onSelect: () => {
        router.history.push(`/billbook/change/${billbook.id}`)
      }
    }].concat(billbook.default ?
      [] :
      [{
        value: 'default', content: '设为默认',
        onSelect: () => {
          if (!billbook.default) {
            billbook_store.defaultBillbook.default = false
            billbook.default = true
          }
        }
      }, {
        value: 'delete', content: colorSpan('删除账本', 'red'),
        onSelect: () => {
          if (!billbook.default) {
            billbook_store.removeBillbook(billbook)
            router.history.push(`/billbook/detail/${billbook_store.defaultBillbook.id}`)
          }
        }
      }])
  current.billbook = billbook

  return Context.useConsumer(() => (
    <Layout>
      <Bar title={<BillbookSwitch />} left={false} rightContent={rightContent} />
      <WingBlank>
        {Object.keys(store.billsGroupbyDay).map(Number).sort((a, b) => b - a).map(
          day => <DayBillCardList bills={store.billsGroupbyDay[String(day)]} day={day} key={day} />
        )}
      </WingBlank>
      {billbook.id !== 'empty' ? <AddBillButton /> : <></>}
    </Layout>
  ))
}

export default BillbookDetail