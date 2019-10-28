import React from 'react'
import { List } from 'antd-mobile'

import Context from '../../../store'
import { useRouter } from '../../../router'
import { useBillAction } from '../../../action'
import { Bar, colorSpan, DetailHead, unSetText } from '../../../common'


const BillDetail = ({ match }) => {
  const { bill_store, account_store, billbook_store, current, cat_store } = Context.useStore()
  const { remove } = useBillAction()
  const router = useRouter()
  const id = match.params.id
  const bill = bill_store.getBill(id)
  const billbook = billbook_store.getBillbook(bill.billbook)
  const account = account_store.getAccount(bill.account)

  const label = bill.cat_1 ? bill.cat_1 : unSetText
  const time = bill.time ? bill.time_str : unSetText
  const remark = bill.remark ? bill.remark : unSetText

  current.bill = bill
  current.billbook = billbook
  current.account = account

  const rightContent = [
    {
      value: 'change', content: '修改账单', onSelect: () => {
        router.push(`/billbook/bill/change/${id}`)
      }
    },
    {
      value: 'delete', content: colorSpan('删除账单', 'red'), onSelect: () => {
        remove(id)
      }
    }
  ]

  return (
    <>
      <Bar title={bill.cat_0} rightContent={rightContent} />
      {bill.cat_0 ?
        <DetailHead text={bill.cat_0} icon={cat_store.getCat(bill.cat_0, billbook.id).icon} amount={bill.amount} /> :
        null}
      <List>
        <List.Item extra={time}>时间</List.Item>
        <List.Item extra={label}>子分类</List.Item>
        <List.Item extra={bill.payer}>付款者</List.Item>
        <List.Item extra={bill.consumer}>消费者</List.Item>
        <List.Item extra={bill.creater_name}>创建者</List.Item>
        <List.Item extra={billbook.name}>所属账本</List.Item>
        <List.Item extra={account.name}>所属账户</List.Item>
        <List.Item extra={remark}>备注</List.Item>
      </List>
    </>
  )
}

export default BillDetail