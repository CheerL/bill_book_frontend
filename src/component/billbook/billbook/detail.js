import React, { useEffect } from 'react'
import { PlusOutlined } from '@ant-design/icons'
import { WingBlank } from 'antd-mobile'
import { Redirect } from 'react-router-dom'

import Context from '../../../store'
import { useRouter, useLink } from '../../../router'
import { Bar, colorSpan } from '../../../common'
import { useBillbookAction, useCatAction, useRelationAction } from '../../../action'
import { Layout } from '../../layout'

import BillbookSwitch from './switch'
import { BillList } from './listview'

const AddBillButton = () => {
  const handleClick = useLink('/billbook/bill/new')
  return (
    <div className='billbook-add-button' onClick={e => {
      e.preventDefault()
      handleClick()
    }}>
      <PlusOutlined  className='billbook-add-button-icon'/>
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
      return <Redirect to='/billbook/detail/default' />
    }
  } else {
    if (billbook_store.defaultBillbook === undefined) {
      return <Redirect to='/billbook/detail/default' />
    } else {
      return <Redirect to={`/billbook/detail/${billbook_store.defaultBillbook.id}`} />
    }
  }

  return Context.useConsumer(() => (
    <Layout>
      <BillbookDetailView billbook={
        billbook_store.defaultBillbook ?
          id !== emptyBillbook.id ?
            billbook_store.getBillbook(id) :
            billbook_store.defaultBillbook :
          emptyBillbook
      } />
    </Layout>)
  )
}

const BillbookDetailView = ({ billbook }) => {
  const { current } = Context.useStore()
  const { changeDefault, remove } = useBillbookAction()
  const { getCats } = useCatAction()
  const { getRelation } = useRelationAction()
  const router = useRouter()
  

  const rightContent = billbook.id === 'default' ?
    null :
    [{
      value: 'info', content: '账本资料',
      onSelect: () => router.history.push(`/billbook/info/${billbook.id}`)
    }, {
      value: 'change', content: '修改账本',
      onSelect: () => router.history.push(`/billbook/change/${billbook.id}`)
    }].concat(billbook.default ?
      [] :
      [{
        value: 'default', content: '设为默认',
        onSelect: () => changeDefault(billbook.id)
      }, {
        value: 'delete', content: colorSpan('删除账本', 'red'),
        onSelect: () => remove(billbook.id)
      }])

  useEffect(() => {
    if (current.billbook !== billbook) {
      current.billbook = billbook
    }
  }, [billbook])

  useEffect(() => {
    const id = billbook.id
    if (id && id !== 'default') {
      getCats(id)
      getRelation(undefined, id)
    }
    // eslint-disable-next-line
  }, [billbook])

  return (
    <>
      <Bar title={<BillbookSwitch />} left={false} rightContent={rightContent} />
      <WingBlank>
        <BillList/>
      </WingBlank>
      {billbook.id !== 'default' ? <AddBillButton /> : <></>}
    </>
  )
}

export default BillbookDetail