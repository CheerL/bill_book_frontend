import React from 'react'
import { List } from 'antd-mobile'

import Context from '../../../store'
import { useRouter } from '../../../router'
import { useTransferAction } from '../../../action'
import { Bar, colorSpan, DetailHead, unSetText } from '../../../common'

const TransferDetail = ({ match }) => {
  const router = useRouter()
  const { bill_store, account_store, current } = Context.useStore()
  const { remove } = useTransferAction()
  const id = match.params.id
  const bill = bill_store.getBill(id)
  current.bill = bill

  const payerId = account_store.getNormalAccount(bill.payer)
  const consumerId = account_store.getNormalAccount(bill.consumer)
  const payer = account_store.getAccount(payerId)
  const consumer = account_store.getAccount(consumerId)
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
        remove(id)
      }
    }
  ]
  return (
    <>
      <Bar title='转账' rightContent={rightContent} />
      <DetailHead text='转账' icon='transfer' amount={bill.amount.abs()} />
      <List>
        <List.Item extra={time}>时间</List.Item>
        <List.Item extra={payer.name}>转出账户</List.Item>
        <List.Item extra={consumer.name}>转入账户</List.Item>
        <List.Item extra={bill.creater_name}>创建者</List.Item>
        <List.Item extra={remark}>备注</List.Item>
      </List>
    </>
  )
}

export default TransferDetail