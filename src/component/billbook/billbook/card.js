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
  return <GroupBillCardList bills={bills} groupTitle={date.num2str(day)} />
}

export const MonthBillCardList = ({ bills, month }) => {
  return <GroupBillCardList bills={bills} groupTitle={month} />
}