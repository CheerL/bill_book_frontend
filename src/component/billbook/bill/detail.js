import React from 'react'
import { List } from 'antd-mobile'

import Context from '../../../store'
import { useRouter } from '../../../router'
import { Bar, colorSpan, DetailHead, unSetText } from '../../../common'


const BillDetail = ({ match }) => {
  const router = useRouter()
  const id = match.params.id
  const { bill_store, account_store, billbook_store, current } = Context.useStore()
  const bill = bill_store.getBill(id)
  current.bill = bill
  const billbook = billbook_store.getBillbook(bill.billbook).name
  const account = account_store.getAccount(bill.account).name
  const payer = bill.payer
  const consumer = bill.consumer
  const creater = bill.creater

  const label = bill.cat_1 ? bill.cat_1 : unSetText
  const time = bill.time ? bill.time_str : unSetText
  const remark = bill.remark ? bill.remark : unSetText
  const rightContent = [
    {
      value: 'change', content: '修改账单', onSelect: () => {
        router.history.push(`/billbook/bill/change/${id}`)
      }
    },
    {
      value: 'delete', content: colorSpan('删除账单', 'red'), onSelect: () => {
        bill_store.removeBill(bill)
        router.history.goBack()
      }
    }
  ]
  return (
    <>
      <Bar title={bill.cat_0} rightContent={rightContent} />
      <DetailHead text={bill.cat_0} icon='transaction' amount={bill.amount} />
      <List>
        <List.Item extra={time}>时间</List.Item>
        <List.Item extra={label}>子分类</List.Item>
        <List.Item extra={payer}>付款者</List.Item>
        <List.Item extra={consumer}>消费者</List.Item>
        <List.Item extra={creater}>创建者</List.Item>
        <List.Item extra={billbook}>所属账本</List.Item>
        <List.Item extra={account}>所属账户</List.Item>
        <List.Item extra={remark}>备注</List.Item>
      </List>
    </>
  )
}

export default BillDetail