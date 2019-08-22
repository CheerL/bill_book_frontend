import React from 'react'
import Context from '../../store'
import { useRouter } from '../../router'
import { Bar, colorSpan, DetailHead, unSetText } from '../../common'
import { List } from 'antd-mobile'


export const TransferDetail = ({ match }) => {
  const router = useRouter()
  const id = match.params.id
  const { bill_store, account_store, current } = Context.useStore()
  const bill = bill_store.getBill(id)
  current.bill = bill

  const payer = account_store.getAccount(bill.payer).name
  const consumer = account_store.getAccount(bill.consumer).name
  const creater = bill.creater
  const time = bill.time ? bill.time_str : unSetText
  const remark = bill.remark ? bill.remark : unSetText
  const rightContent = [
    {
      value: 'change', content: '修改转账', onSelect: () => {
        router.history.push(`/account/transfer/change/${id}`)
      }
    },
    {
      value: 'delete', content: colorSpan('删除转账', 'red'), onSelect: () => {
        bill_store.removeBill(bill)
        router.history.goBack()
      }
    }
  ]
  return (
    <>
      <Bar title='转账' rightContent={rightContent} />
      <DetailHead text='转账' icon='transaction' amount={bill.amount} />
      <List>
        <List.Item extra={time}>时间</List.Item>
        <List.Item extra={payer}>转出账户</List.Item>
        <List.Item extra={consumer}>转入账户</List.Item>
        <List.Item extra={creater}>创建者</List.Item>
        <List.Item extra={remark}>备注</List.Item>
      </List>
    </>
  )
}