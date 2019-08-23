import React from 'react'
import { Icon } from 'antd'
import { WingBlank } from 'antd-mobile'

import Context from '../../../store'
import { useRouter, useLink } from '../../../router'
import { Bar, colorSpan } from '../../../common'
import { Layout } from '../../layout'

import BillbookSwitch from './switch'
import { useSetCurrentBillbook } from './common'
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

const BillbookDetail = ({ match }) => {
  const router = useRouter()
  const store = Context.useStore()
  const { billbook_store, current } = store
  useSetCurrentBillbook(match.params, true)

  if (match.params.id === undefined || match.params.id !== current.billbook.id) {
    router.history.push(`/billbook/detail/${current.billbook.id}`)
    return <></>
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
        router.history.push(`/billbook/detail/${billbook_store.defaultBillbook.id}`)
      }
    }
  }]

  return Context.useConsumer(() => (
    <Layout>
      <Bar title={<BillbookSwitch />} left={false} rightContent={
        rightContent.concat(current.isDefaultBillbook ? [] : undefaultContent)
      } />
      <WingBlank>
        {Object.keys(store.billsGroupbyDay).sort().map(
          day => <DayBillCardList bills={store.billsGroupbyDay[day]} day={day} key={day} />
        )}
      </WingBlank>
      <AddBillButton />
    </Layout>
  ))
}

export default BillbookDetail