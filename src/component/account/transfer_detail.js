import React from 'react'
import Context from '../../store'
import { Bar, useRouter, colorSpan, DetailHead } from '../../common'
import { List } from 'antd-mobile'


export const TransferDetail = ({ match }) => {
  const router = useRouter()
  const id = match.params.id
  const { bill_store, account_store } = Context.useStore()
  const bill = bill_store.getBill(id)

  const payer = colorSpan(account_store.getAccount(bill.payer).name)
  const consumer = colorSpan(account_store.getAccount(bill.consumer).name)
  const remark = bill.remark ? colorSpan(bill.remark) : '未填写'
  const rightContent = [
    {
      value: 'change', context: '修改转账', onSelect: () => {
        router.history.push(`/account/transfer/change/${id}`)
      }
    },
    {
      value: 'delete', context: colorSpan('删除转账', 'red'), onSelect: () => {
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
        <List.Item extra={payer}>转出账户</List.Item>
        <List.Item extra={consumer}>转入账户</List.Item>
        <List.Item extra={remark}>备注</List.Item>
      </List>
    </>
  )
}