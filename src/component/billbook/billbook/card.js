import React from 'react'

import { Card, date, Title } from '../../../common'
import { useLink } from '../../../router'
import Context from '../../../store'

export const BillCard = ({ bill, space = false }) => {
  const handleClick = useLink(`/billbook/bill/detail/${bill.id}`)
  const { cat_store } = Context.useStore()
  const icon = cat_store.getCat(bill.cat_0, bill.billbook)

  return Context.useConsumer(() => (
    <Card
      handleClick={handleClick}
      text={bill.cat_0}
      icon={icon ? icon.icon : null}
      remark={bill.remark ? bill.remark : bill.cat_1}
      amount={bill.amount}
      space={space}
      key={bill.id}
    />
  ))
}

const GroupBillCardList = ({ bills, groupTitle }) => {
  return (
    <>
      <Title title={groupTitle} />
      {bills.map((bill, index) => (
        <BillCard
          bill={bill} key={bill.id}
          space={index !== bills.length - 1}
        />
      ))}
    </>
  )
}

export const DayBillCardList = ({ bills, day }) => {
  const dayAmount = bills.reduce((amount, bill) => bill.amount.add(amount), 0)
  return <GroupBillCardList
    bills={bills}
    groupTitle={<>
      <span>{date.num2str(day)}</span>
      <span style={{ float: 'right', color: 'dimgray' }}>日消费:&nbsp;
      <span style={{ color: 'black', fontWeight: 'bold' }}>{dayAmount.toString()}</span>
      </span>
    </>} />
}

export const MonthBillCardList = ({ bills, month }) => {
  return <GroupBillCardList bills={bills} groupTitle={month} />
}