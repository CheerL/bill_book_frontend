import React from "react";
import { Card, Iconed } from '../../common'
import { useLink } from '../../router'
import Context from '../../store'

export const AccountCard = ({ account, space = false }) => {
  const handleClick = useLink(`account/detail/${account.id}`)

  return Context.useConsumer(() => (
    <Card
      handleClick={handleClick}
      text={account.default ? <Iconed icon='star' text={account.name} position='left' /> : account.name}
      remark={account.remark}
      amount={account.amount}
      space={space}
    />
  ));
};

export const AccountNew = () => {
  const handleClick = useLink('/account/new')

  return (
    <Card
      handleClick={handleClick}
      context={<Iconed text='新建账本' icon='plus' />}
      position='center'
      space
    />
  );
};

const BillCard = ({ bill, space = false }) => {
  const handleClick = useLink(`/billbook/bill/detail/${bill.id}`)
  const { billbook_store } = Context.useStore()
  const billbook = billbook_store.getBillbook(bill.billbook)

  return Context.useConsumer(() => (
    <Card
      handleClick={handleClick}
      text={bill.cat_0}
      remark={billbook.name}
      amount={bill.amount}
      space={space}
    />
  ))
}

const TransferCard = ({bill, space=false}) => {
  const handleClick = useLink(`/account/transfer/detail/${bill.id}`)
  const { account_store, current } = Context.useStore()
  bill.setAccount(current.account)
  bill.setTarget(account_store)

  return Context.useConsumer(() => (
    <Card
    handleClick={handleClick}
    text='转账'
    remark={bill.transfer_remark}
    amount={bill.transfer_amount}
    space={space}
    />
  ))
}

export const AccountDetailCard = ({bill, space=false}) => {
  return bill.billbook === 'transfer' ?
  <TransferCard bill={bill} space={space} /> :
  <BillCard bill={bill} space={space} />
}
