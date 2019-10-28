import React from "react";
import { Card, Iconed, useBillLongPress, useTransferLongPress, useAccountLongPress } from '../../common'
import { useLink } from '../../router'
import Context from '../../store'

export const AccountCard = ({ account, space = false }) => {
  const handleClick = useLink(`/account/detail/${account.id}`)
  const onLongPress = useAccountLongPress(account)

  return Context.useConsumer(() => (
    <Card
      onLongPress={onLongPress}
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
      context={<Iconed text='新建账户' icon='plus' />}
      position='center'
      space
    />
  );
};

const BillCard = ({ bill, space = false }) => {
  const handleClick = useLink(`/billbook/bill/detail/${bill.id}`)
  const { billbook_store, cat_store } = Context.useStore()
  const icon = cat_store.getCat(bill.cat_0, bill.billbook)
  const billbook = billbook_store.getBillbook(bill.billbook)
  const onLongPress = useBillLongPress(bill)

  return Context.useConsumer(() => (
    <Card
      onLongPress={onLongPress}
      handleClick={handleClick}
      icon={icon ? icon.icon : null}
      text={bill.cat_0}
      remark={billbook.name}
      amount={bill.amount}
      space={space}
    />
  ))
}

const TransferCard = ({ transfer, space = false }) => {
  const handleClick = useLink(`/account/transfer/detail/${transfer.id}`)
  const { account_store, current } = Context.useStore()
  const onLongPress = useTransferLongPress(transfer)
  transfer.setAccount(current.account)
  transfer.setTarget(account_store)

  return Context.useConsumer(() => (
    <Card
      handleClick={handleClick}
      icon='transfer'
      onLongPress={onLongPress}
      text='转账'
      remark={transfer.transfer_remark}
      amount={transfer.transfer_amount}
      space={space}
    />
  ))
}

export const AccountDetailCard = ({ bill, space = false }) => {
  return bill.billbook === 'transfer' ?
    <TransferCard transfer={bill} space={space} /> :
    <BillCard bill={bill} space={space} />
}
