import React from 'react'

import { Card, date, Title } from '../../../common'
import { useLink } from '../../../router'
import Context from '../../../store'

const BillCard = ({ bill, space = false }) => {
  const handleClick = useLink(`/billbook/bill/detail/${bill.id}`)

  return Context.useConsumer(() => (
    <Card
      handleClick={handleClick}
      text={bill.cat_0}
      remark={bill.remark}
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